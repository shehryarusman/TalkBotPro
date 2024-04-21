import os
import torch
import argparse
import pyaudio
import wave
from zipfile import ZipFile
import openai
from openai import OpenAI
import os
import time
# from faster_whisper import WhisperModel
from sentence_transformers import SentenceTransformer, util

# ANSI escape codes for colors
# PINK = '\033[95m'
# CYAN = '\033[96m'
# YELLOW = '\033[93m'
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize the OpenAI client with the API key
client = OpenAI()

def get_relevant_context(user_input, vault_embeddings, vault_content, model, top_k=3):
    """
    Retrieves the top-k most relevant context from the vault based on the user input.
    """
    if vault_embeddings.nelement() == 0:  # Check if the tensor has any elements
        return []

    # Encode the user input
    input_embedding = model.encode([user_input])
    # Compute cosine similarity between the input and vault embeddings
    cos_scores = util.cos_sim(input_embedding, vault_embeddings)[0]
    # Adjust top_k if it's greater than the number of available scores
    top_k = min(top_k, len(cos_scores))
    # Sort the scores and get the top-k indices
    top_indices = torch.topk(cos_scores, k=top_k)[1].tolist()
    # Get the corresponding context from the vault
    relevant_context = [vault_content[idx].strip() for idx in top_indices]
    return relevant_context

def chatgpt_streamed(user_input, system_message, conversation_history, vault_embeddings, vault_content, model):
    """
    Function to send a query to OpenAI's GPT model, stream the response, and print each full line in yellow color.
    """
    # Get relevant context from the vault
    relevant_context = get_relevant_context(user_input, vault_embeddings, vault_content, model)
    # Concatenate the relevant context with the user's input
    user_input_with_context = user_input
    if relevant_context:
        user_input_with_context = "Here is some context from memory, only use it if it's relevant to the user_input below:\n" + "\n".join(relevant_context) + "\n\nuser input:\n" + user_input
    messages = [{"role": "system", "content": system_message}] + conversation_history + [{"role": "user", "content": user_input_with_context}]
    streamed_completion = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=messages,
        stream=True,
        temperature=0
    )
    full_response = ""
    line_buffer = ""
    for chunk in streamed_completion:
        delta_content = chunk.choices[0].delta.content
        if delta_content is not None:
            line_buffer += delta_content
            if '\n' in line_buffer:
                lines = line_buffer.split('\n')
                for line in lines[:-1]:
                    print(line)
                    full_response += line + '\n'
                line_buffer = lines[-1]
    if line_buffer:
        print(line_buffer)
        full_response += line_buffer
    return full_response


def chatgpt_streamed_no_rag(user_input, system_message, conversation_history):
    """
    Function to send a query to OpenAI's GPT model, stream the response, and print each full line in yellow color.
    """
    # Get relevant context from the vault
    # relevant_context = get_relevant_context(user_input, vault_embeddings, vault_content, model)
    # Concatenate the relevant context with the user's input
    user_input_with_context = user_input
    # if relevant_context:
    #     user_input_with_context = "\nHere is some context from memory, only use it if it's relevant to the user input below:".join(relevant_context) + "\n\nuser input:\n" + user_input
    messages = [{"role": "system", "content": system_message}] + conversation_history + [{"role": "user", "content": user_input_with_context}]
    streamed_completion = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=messages,
        stream=True,
        temperature=0
    )
    full_response = ""
    line_buffer = ""
    for chunk in streamed_completion:
        delta_content = chunk.choices[0].delta.content
        if delta_content is not None:
            line_buffer += delta_content
            if '\n' in line_buffer:
                lines = line_buffer.split('\n')
                for line in lines[:-1]:
                    print(line)
                    full_response += line + '\n'
                line_buffer = lines[-1]
    if line_buffer:
        print(line_buffer)
        full_response += line_buffer
    return full_response


def get_chatbot_response(user_input, conversation_history, conversationStarted, vault_embeddings, vault_embeddings_tensor, system_message, vault_content, model):
    if not conversationStarted:
        print("System:")
        chatbot_response = chatgpt_streamed_no_rag("Respond with a variant of: How are you feeling today?", system_message, conversation_history)
        conversation_history.append({"role": "assistant", "content": chatbot_response})
        conversationStarted = True
        with open("vault.txt", "a", encoding="utf-8") as vault_file:
            vault_file.write("\nprevious conversation:\n")

    # TODO check for emergency from user_input

    print("You:", user_input)
    conversation_history.append({"role": "user", "content": user_input})
    print("System:")
    chatbot_response = chatgpt_streamed(user_input, system_message, conversation_history, vault_embeddings_tensor, vault_content, model)
    conversation_history.append({"role": "system", "content": chatbot_response})

    # if len(conversation_history) > 30:
    #     conversation_history = conversation_history[-20:]
    # save to database
    print("Recording to database")
    with open("vault.txt", "a", encoding="utf-8") as vault_file:
        vault_file.write('user input:\n'+ user_input + '\n')
        vault_file.write("chatbot output:\n"+ chatbot_response + "\n")
    print("Wrote to database")

    # Update the vault content and embeddings
    vault_content = open("vault.txt", "r", encoding="utf-8").readlines()
    vault_embeddings = model.encode(vault_content)
    vault_embeddings_tensor = torch.tensor(vault_embeddings)

    return [conversation_history, conversationStarted, vault_embeddings, vault_embeddings_tensor, system_message, vault_content, model]
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AudioPlayer = ({msg}) => {

    const audioRef = useRef(null);
    // Define a state variable to hold the audio URL
    const [audioURL, setAudioURL] = useState(null);
  
    // Define a function called textToSpeech that takes in a string called inputText as its argument.
    const textToSpeech = async (inputText) => {
        // Set the API key for ElevenLabs API. 
        // Do not use directly. Use environment variables.
        // Set the ID of the voice to be used.
        const VOICE_ID = '21m00Tcm4TlvDq8ikWAM';
    
        // Set options for the API request.
        const options = {
        method: 'POST',
        url: `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
        headers: {
            accept: 'audio/mpeg', // Set the expected response type to audio/mpeg.
            'content-type': 'application/json', // Set the content type to application/json.
            'xi-api-key': `${API_KEY}`, // Set the API key in the headers.
        },
        data: {
            text: inputText, // Pass in the inputText as the text to be converted to speech.
        },
        responseType: 'arraybuffer', // Set the responseType to arraybuffer to receive binary data as response.
        };
    
        // Send the API request using Axios and wait for the response.
        const speechDetails = await axios.request(options);
    
        // Return the binary audio data received from the API response.
        return speechDetails.data;
    };

    // Define a function to fetch the audio data and set the URL state variable
    const handleAudioFetch = async () => {
      // Call the textToSpeech function to generate the audio data for the text "Hello welcome"
      const data = await textToSpeech(msg)
      // Create a new Blob object from the audio data with MIME type 'audio/mpeg'
      const blob = new Blob([data], { type: 'audio/mpeg' });
      // Create a URL for the blob object
      const url = URL.createObjectURL(blob);
      // Set the audio URL state variable to the newly created URL
      setAudioURL(url);
      const audio = audioRef.current;
      const handlePlay = () => {
        // Add a class to every <span> element on the page
        document.querySelectorAll('.container span').forEach(span => {
            span.classList.add('pulsate');
        });
        };

        const handlePause = () => {
        // Remove the class from every <span> element on the page
        document.querySelectorAll('.container span').forEach(span => {
            span.classList.remove('pulsate');
        });
        };

        // Play audio when component mounts
        setTimeout(function(){
            audio.play();
        }, '1000');

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
    };
  
    // Use the useEffect hook to call the handleAudioFetch function once when the component mounts
    useEffect(() => {
      handleAudioFetch();
    }, []);
  
    // Render an audio element with the URL if it is not null
    return (
      <div>
        {audioURL && (
          <audio ref={audioRef} controls>
            <source src={audioURL} type="audio/mpeg" />
          </audio>
        )}
      </div>
    );
  };
  
  export default AudioPlayer;
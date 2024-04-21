import './../css/Chat.css';
import './../css/Jarvis.css';
import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { config } from '../config';
import ReactDOM from 'react-dom';
import AudioPlayer from './AudioPlayer';

function Chat() {

    const [inputValue, setInputValue] = useState('');
  const [outputDivs, setOutputDivs] = useState([]);
  const [isRecording, setIsRecording] = useState(false);

    const startRecord = (event) => {
        resetTranscript();
        setIsRecording(!isRecording);
        SpeechRecognition.startListening({continuous: true});
    };

    const stopRecord = (event) => {
        setIsRecording(!isRecording);
        SpeechRecognition.stopListening();


        const newDiv = <div className='bubble right jersey msg'> {transcript} </div>;
        setOutputDivs((prevDivs) => [newDiv, ...prevDivs]);

        //SENDING REQUEST TO BACKEND
        sendTranscript(transcript);
    };

    function speak(data, modalRoot){
      return new Promise((resolve) => {
        ReactDOM.render(<AudioPlayer msg={data.content}/>, modalRoot);
      });
    }

    function ai_response(promise) {
      const thinking = <div className='bubble left jersey msg thinking'> <span className="material-symbols-outlined">
      lens_blur
      </span><span className="material-symbols-outlined">
                    lens_blur
                    </span><span className="material-symbols-outlined">
                    lens_blur
                    </span> </div>;

    setOutputDivs((prevDivs) => [thinking, ...prevDivs]);

        promise
    .then(response => {
      if (!response.ok) {
        console.log("ERROR SENDING REQUEST!!!!")
        throw new Error('Network response was not ok');
      }
      return response.json(); // Return the response for further processing
    })
    .then(data => {
      console.log('Success:', data);
      
      const resp = <div className='bubble left jersey msg'> {data.content} </div>;
        // Create a new div element
        const modalRoot = document.createElement('div');

        // Append the div element to the body
        document.body.appendChild(modalRoot);

        // Render the Modal component inside the newly created div element
        speak(data, modalRoot);
        
        // document.querySelectorAll('.container span').forEach(function(button) {
        //   button.setAttribute("class", "pulsate");
        // });
        setTimeout(() => {
          setOutputDivs((prevDivs) => [resp, ...(prevDivs.slice(1))]);
        }, "1750");
        // Clean up function to remove the Modal component when the component unmounts
        return () => {
            ReactDOM.unmountComponentAtNode(modalRoot);
            document.body.removeChild(modalRoot);
        };
      // Process the data once it's resolved
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error
    });
}

const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the default behavior of the textarea

      // Create a new div element with the input value
      const newDiv = <div className='bubble right jersey msg'> {inputValue} </div>;
      // Update the outputDivs state by adding the new div
      setOutputDivs((prevDivs) => [newDiv, ...prevDivs]);
      sendTranscript(inputValue);
      // Clear the input value
      setInputValue('');
    }
  };

  function sendTranscript(text)
  {
    console.log(text);
    const data = 
    { 
      role: 'user',
      content: text
    }

    const promise = fetch(config.apiUrl + 'sendTranscript',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    
    ai_response(promise)
  }

  return (
    <main>
        <section data-name="avatar">
        <div className="container">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
        </section>
        <section data-name="chat">
            <div className="messages">
                {isRecording && transcript !== "" && (
                        <div className='bubble right jersey msg'> {transcript} </div>
                    )}
                {outputDivs}
            </div>
            <div className='input'>
                    <textarea id='textinp'
                        className='jersey' 
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Enter your message here or press the microphone to talk">
                    </textarea>
                    <div>
                        <button id="voiceinp" onClick={isRecording ? stopRecord : startRecord} className={isRecording && listening ? 'recording': null}> 
                                    <span className="material-symbols-outlined">
                                        mic
                                    </span>
                                </button>
                    </div>
            </div>
        </section>
    </main>
  );
}

export default Chat;

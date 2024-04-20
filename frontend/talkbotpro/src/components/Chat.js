import './../css/Chat.css';
import './../css/Jarvis.css';
import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

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
    };

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
      const thinking = <div className='bubble left jersey msg thinking'> <span className="material-symbols-outlined">
      lens_blur
      </span><span className="material-symbols-outlined">
                    lens_blur
                    </span><span className="material-symbols-outlined">
                    lens_blur
                    </span> </div>;
    const resp = <div className='bubble left jersey msg'> heyyyyyy ;) </div>;
      // Update the outputDivs state by adding the new div
      setOutputDivs((prevDivs) => [newDiv, ...prevDivs]);
      setOutputDivs((prevDivs) => [thinking, ...prevDivs]);
      setTimeout(function() {
        setOutputDivs((prevDivs) => [resp, ...(prevDivs.slice(1))]);
      }, 1000);  
      // Clear the input value
      setInputValue('');
    }
  };


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
                        onKeyDown={handleKeyDown}>
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

import './../css/Journal.css';
import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

let last = "";
function NewJournal() {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

    const [textValue, setTextValue] = useState("");

    useEffect(() => {
        if(transcript !== ""){
            setTextValue(last + transcript);
        }
      }, [transcript]);

    // Step 3: Event handler function to update state variable
    const handleTextChange = (event) => {
        setTextValue(event.target.value);
    };

    const [isRecording, setIsRecording] = useState(false);

    const startRecord = (event) => {
        last = textValue;
        resetTranscript();
        setIsRecording(!isRecording);
        SpeechRecognition.startListening({continuous: true});
    };

    const stopRecord = (event) => {
        setIsRecording(!isRecording);
        SpeechRecognition.stopListening();
    };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <main>
        <section data-name="new">
            <textarea
            id="currentEntry"
            className='jersey' 
            placeholder="Start a new journal entry..."
            value={textValue}
            onChange={handleTextChange}
            >
            </textarea>
            <div>
                <button id="voiceinp" onClick={isRecording ? stopRecord : startRecord} className={isRecording && listening ? 'recording': null}> 
                    <span className="material-symbols-outlined">
                        mic
                    </span>
                </button>
            </div>
            <button className="save jersey"> Save Entry </button>
        </section>
    </main>
  );
}

export default NewJournal;

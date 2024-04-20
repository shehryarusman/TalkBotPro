import './../css/Chat.css';
import './../css/Jarvis.css';
import { useState } from 'react';

function Chat() {
    const [inputValue, setInputValue] = useState('');
  const [outputDivs, setOutputDivs] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents the default behavior of the textarea

      // Create a new div element with the input value
      const newDiv = <div className='bubble right jersey msg'> {inputValue} </div>;
      const thinking = <div className='bubble left jersey msg thinking'> <span class="material-symbols-outlined">
      lens_blur
      </span><span class="material-symbols-outlined">
                    lens_blur
                    </span><span class="material-symbols-outlined">
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
        <div class="container">
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
                {/* <div className='bubble left jersey msg'>
                    Hi! How is your day so far?
                </div>
                <div className='bubble right jersey msg'>
                    My day fucking sucks and I hate you and I'm going to kill myself I am not reading that disclaimer
                </div>
                <div className='bubble left jersey msg thinking'>
                    <span class="material-symbols-outlined">
                    lens_blur
                    </span><span class="material-symbols-outlined">
                    lens_blur
                    </span><span class="material-symbols-outlined">
                    lens_blur
                    </span>
                </div> */}

                {outputDivs}
            </div>
            <div className='input'>
                    <textarea id='textinp'
                        className='jersey' 
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}>
                    </textarea>
                    <button id="voiceinp"> 
                        <span class="material-symbols-outlined">
                            mic
                        </span>
                    </button>
            </div>
        </section>
    </main>
  );
}

export default Chat;

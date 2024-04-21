import './../css/Journal.css';

function Journal() {

    const test = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. ";
    const change_entry = (event) => {
        const txt = event.currentTarget.getAttribute('data-entry');
        document.getElementById("currentEntry").value = txt;
        document.querySelectorAll('.active').forEach(function(button) {
            button.setAttribute("class", "");
        });
        event.currentTarget.setAttribute("class", "active");
    };

    const updateEntry = (event) => {
        const txt = event.target.value;
        document.querySelectorAll('.active').forEach(function(button) {
            button.setAttribute("data-entry", txt);
        });
    };
  return (
    <main>
        <section data-name="entries">
            <ul className="jersey">
                <a href="/newJournal" className="newJournal">
                    <span className="material-symbols-outlined"> add_circle </span>
                    <h3>  Create New Entry </h3>
                </a>
                <li className="active" data-entry={test} onClick={change_entry}> 
                    <div className="dt">
                        <span className="material-symbols-outlined"> calendar_month </span> 
                        <b> Saturday, April 20, 2024 </b>
                    </div> 
                    <h4> My Journal Entry </h4>
                </li> 

                <li data-entry="womp womp." onClick={change_entry}> 
                    <div className="dt">
                        <span className="material-symbols-outlined"> calendar_month </span> 
                        <b> Friday, April 19, 2024 </b>
                    </div> 
                    <h4> My Journal Entry </h4>
                </li> 

                <li data-entry="I want to KMS!!!" onClick={change_entry}> 
                    <div className="dt">
                        <span className="material-symbols-outlined"> calendar_month </span> 
                        <b> Thursday, April 18, 2024 </b>
                    </div> 
                    <h4> My Journal Entry </h4>
                </li>

                <li data-entry={test} onClick={change_entry}> 
                    <div className="dt">
                        <span className="material-symbols-outlined"> calendar_month </span> 
                        <b> Wednesday, April 17, 2024 </b>
                    </div> 
                    <h4> My Journal Entry </h4>
                </li>

                <li data-entry="I was assigned Constantine for a class" onClick={change_entry}> 
                    <div className="dt">
                        <span className="material-symbols-outlined"> calendar_month </span> 
                        <b> Tuesday, April 16, 2024 </b>
                    </div> 
                    <h4> My Journal Entry </h4>
                </li>               
            </ul>
        </section>
        <section data-name="current">
            <textarea
            id="currentEntry"
            className='jersey' 
            placeholder="Start a new journal entry..."
            defaultValue={test}
            onChange={updateEntry}>
            </textarea>
        </section>
    </main>
  );
}

export default Journal;

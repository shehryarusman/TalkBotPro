import './../css/Settings.css';

function Settings() {

    const setActive = (event) => {
        document.querySelectorAll('.active').forEach(function(button) {
            button.setAttribute("class", "");
        });
        event.currentTarget.setAttribute("class", "active");
    };

  return (
    <main>
        <form>
            <div class="form-group">
                <label for="econtact">Emergency Contact</label>
                <input name="econtact" type="text" defaultValue="sheryar.usman42@gmail.com"/>
            </div>
            <div class="form-group">
                <label for="period">Store My Data For</label>
                <div>
                    <span>
                        <input name="period" type="radio" checked="checked"/> All Time
                    </span>
                    <span>
                        <input name="period" type="radio"/> 7 Days
                    </span>
                    <span>
                        <input name="period" type="radio"/> 1 Day
                    </span>
                    <span>
                        <input name="period" type="radio"/> Do not store
                    </span>
                </div> 
            </div>
            <div class="form-group avatar">
                <label for="avatar">Avatar</label>
                <span className="active" onClick={setActive}>
                    <img src="avatar.png"/>
                </span>
                <span onClick={setActive}>
                    <img src="faceless.png"/>
                </span>
            </div>
        </form>
    </main>
  );
}

export default Settings;

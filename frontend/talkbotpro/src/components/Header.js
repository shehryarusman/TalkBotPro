import './../css/Header.css';

function Header() {
  return (
    <header className="jersey">
        <div className="title"> 
            <img src="./logo.png"/>
            TalkBotPro 
        </div>
        <nav>
            <ul>
                <li><a>Chat</a></li>
                <li><a>Suggestions</a></li>
                <li><a>Settings</a></li>
            </ul>
        </nav>
    </header>
  );
}

export default Header;

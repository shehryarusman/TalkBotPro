import './../css/Header.css';

function Header() {
  return (
    <header className="jersey">
        <div className="title">
            <a href="/"> 
              <img src="./logo.png"/>
              TheraPal
            </a>
        </div>
        <nav>
            <ul>
                <li><a href="/chat">Chat</a></li>
                <li><a href="/journal">Journal</a></li>
                <li><a href="/settings">Settings</a></li>
            </ul>
        </nav>
    </header>
  );
}

export default Header;

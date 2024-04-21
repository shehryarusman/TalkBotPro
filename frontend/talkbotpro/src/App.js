import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
import Journalpage from "./pages/Journalpage";
import NewJournalpage from "./pages/NewJournalpage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<Chatpage />} />
          <Route path="/journal" element={<Journalpage />} />
          <Route path="/newJournal" element={<NewJournalpage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

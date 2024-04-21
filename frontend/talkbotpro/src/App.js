import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<Chatpage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;

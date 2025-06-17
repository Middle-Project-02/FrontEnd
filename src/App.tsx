import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ChatBox from './components/chat/ChatBox';
import LoginPage from './pages/LoginPage'; // 너가 만든 컴포넌트

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<ChatBox />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

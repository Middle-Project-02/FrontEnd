import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BaseLayout from './components/layout/BaseLayout';
import { useEffect } from 'react';
import { requestPermissionAndGetToken } from './utils/notification';
import { onMessage } from 'firebase/messaging';
import { messaging } from './utils/firebase';

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js');
    }

    requestPermissionAndGetToken();

    onMessage(messaging, (payload) => {
      console.log('Foreground 알림 수신:', payload);
    });
  }, []);

  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;

import AppRouter from './AppRouter';
import ModalContainer from '@/components/common/ModalContainer';
import { Toaster } from '@/components/ui/sonner';
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
    <>
      <AppRouter />
      <ModalContainer />
      <Toaster />
    </>
  );
}

export default App;

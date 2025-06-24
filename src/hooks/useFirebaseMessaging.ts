import { useEffect } from 'react';
import { requestPermissionAndGetToken } from '@/utils/requestPermissionAndGetToken';

export const useFirebaseMessaging = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js');
    }

    requestPermissionAndGetToken();
  }, []);
};

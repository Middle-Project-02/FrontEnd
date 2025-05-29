import { messaging } from './firebase';
import { getToken } from 'firebase/messaging';

export const requestPermissionAndGetToken = async () => {
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    const registration = await navigator.serviceWorker.ready;
    await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration,
    });
  }
};

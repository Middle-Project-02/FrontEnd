importScripts('https://www.gstatic.com/firebasejs/11.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyA0PFvQGWkCuYY3d0kzGxEasRjaAIPl_D8',
  authDomain: 'together-b408c.firebaseapp.com',
  projectId: 'together-b408c',
  storageBucket: 'together-b408c.firebasestorage.app',
  messagingSenderId: '59878983245',
  appId: '1:59878983245:web:cb3e1d7ea936e255707e04',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icon.png',
  });
});

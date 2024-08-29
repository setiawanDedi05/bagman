importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

// Inisialisasi Firebase di Service Worker
firebase.initializeApp({
  apiKey: "AIzaSyA6-XJFR475jESZA6gZKWvcFh4UToS1Rig",
  authDomain: "bagman-05.firebaseapp.com",
  projectId: "bagman-05",
  storageBucket: "bagman-05.appspot.com",
  messagingSenderId: "471179130423",
  appId: "1:471179130423:web:792ba031c2e8bb289131b2",
  measurementId: "G-KTDEPV1QPV",
});

const messaging = firebase.messaging();

// Menangani foreground messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
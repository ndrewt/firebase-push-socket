importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDFfOuMG9xB7h5cdWCglsbRzVD2LaiJKRI",
    authDomain: "test-pus-30b48.firebaseapp.com",
    projectId: "test-pus-30b48",
    storageBucket: "test-pus-30b48.appspot.com",
    messagingSenderId: "892229086458",
    appId: "1:892229086458:web:0fb727a95c18789c02ed43",
    measurementId: "G-29MZHFL8X3"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
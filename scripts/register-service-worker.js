// import * as firebase from 'firebase'
// import localforage from 'localforage'

if (
  process.env.NODE_ENV === 'production' &&
  typeof window !== 'undefined' &&
  'serviceWorker' in navigator
) {
  /**
   * config options fcm
   */
  // const config = {
  //   apiKey: '',
  //   authDomain: '',
  //   databaseURL: '',
  //   projectId: '',
  //   storageBucket: '',
  //   messagingSenderId: '',
  // }
  /**
   * initialize firebase
   */
  // firebase.initializeApp(config)
  /**
   * initialize firebase messaging
   */
  // const messaging = firebase.messaging()

  /**
   * On load register service worker
   */
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(registration => {
        /**
         * Successfully registers service worker
         */
        console.log('ServiceWorker registered: ', registration)
        // messaging.useServiceWorker(registration)
      })
      // .then(() =>
      //   /**
      //    * request permission
      //    */
      //   messaging.requestPermission()
      // )
      // .then(() =>
      //   /**
      //    * request token
      //    */
      //   messaging.getToken()
      // )
      // .then(token => {
      //   /**
      //    * save token to local storage, use when user login/register
      //    */
      //   localforage.setItem('FCM_TOKEN', token)
      // })
      .catch(error => {
        /**
         * failed registration
         */
        console.error('ServiceWorker registration failed: ', error)
      })
  })

  /**
   * received message when web active(Foreground)
   */
  // messaging.onMessage(payload => {
  //   console.log('Message received. ', payload)
  // })
}

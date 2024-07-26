export const environment = {
  // global configurations
  // appVersion: require('../../package.json').version,
  production: true,
  // apiUrl: 'https://fakestoreapi.com/',
  apiUrl: 'http://162.0.230.55:9091/dba/api/', // test-namecheap (namecheap ip)

  menuUrl: '/assets/data/Menu',
  // defaultImage: '/assets/images/default-image.png',
  defaultImage: '../../../assets/images/logo.png',
  USERDATA_KEY: 'authf649fc9a5f55', // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // X_TenantID: 'test',
  X_TenantID: 'dba', //prod
  UserAgent: 'webAgent',

  firebaseConfig: {
    apiKey: 'AIzaSyBgCrRXnm_tQJojxlOm79LbhIzfpRRLmH0',
    authDomain: 'online-food-delivery-app-ng15.firebaseapp.com',
    projectId: 'online-food-delivery-app-ng15',
    storageBucket: 'online-food-delivery-app-ng15.appspot.com',
    messagingSenderId: '449051513648',
    appId: '1:449051513648:web:82c5b93c448317f2aa6ef5',
    measurementId: 'G-8FHLWQB48L',
  },
};

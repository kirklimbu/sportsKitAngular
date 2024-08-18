// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // global configurations
  // appVersion: require('../../package.json').version + '-dev',

  production: false,
  // apiUrl: 'http://162.0.230.55:9093/dba/api/', // test-namecheap (namecheap ip)
  apiUrl: 'http://dmknamunabadmintonacademy.com/dba/api/', // prod ip
  // apiUrl: 'http://103.104.29.53:9091/dba/api/', // home ip

  menuUrl: '/assets/data/Menu',
  defaultImage: '../../../assets/images/logo.png',
  USERDATA_KEY: 'authf649fc9a5f55',
  // X_TenantID: 'test',
  X_TenantID: 'dba', //pro
  UserAgent: 'webAgent',
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

// import { Injectable } from '@angular/core';
// // import Swal from 'sweetalert2';
// // import Swal from 'sweetalert2/dist/sweetalert2.js';

import { Injectable, inject } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";

@Injectable({
    providedIn: 'root',
})
export class MessageService {

    private message = inject(NzMessageService)


    createMessage(type: string, msg: string, duration?: number | 5_000): void {
        this.message.create(type, `${msg}`, { nzDuration: duration });
    }
}

//   public signUpSectionMessage = {
//     emailAlreadyPresent: 'Email is already present',
//     accountCreatedSuccess: 'Account is created successfully!!',
//     emailNotMatched: 'You are not invited!!',
//     alreadyRegistered: 'User is already registered',
//   };
//   public deleteTitleMessage = {
//     country: 'Delete country',
//   };

//   public forms = {
//     invalid: 'Invalid form',
//   };
//   public files = {
//     invalidFile: 'Invalid file',
//     emptyFile: 'No file selected',
//   };

//   public search = {
//     missing: 'Search word missing.',
//   };

//   showErrorMessage(message: string, timer?: number | 3000) {
//     Swal.fire({
//       title: 'Error !!!',
//       html: `${message}`,
//       icon: 'error',
//       showCancelButton: false,
//       showConfirmButton: false,
//       // confirmButtonText: 'Close',
//       // confirmButtonColor: '#3085d6',
//       timer: timer,
//       showClass: {
//         popup: 'animate__animated animate__fadeInDown',
//       },
//       hideClass: {
//         popup: 'animate__animated animate__fadeOutUp',
//       },
//     });
//   }
//   showSuccessMessage(message: string, time?: number | 2000) {
//     Swal.fire({
//       // title: 'माफ गर्नुहोस्!',
//       text: `${message}`,
//       icon: 'success',
//       confirmButtonText: 'Close',
//       timer: time,
//       showConfirmButton: true,

//     });
//   }
//   showInfoMessage(
//     message: string,
//     confirmBtn?: string,
//     showCancel?: boolean
//   ): Promise<any> {
//     return Swal.fire({
//       // title: 'माफ गर्नुहोस्!',
//       text: `${message}`,
//       icon: 'success',
//       confirmButtonText: confirmBtn,
//       showCancelButton: true,
//       showConfirmButton: true,

//       // timer: 2000,
//     }).then((res) => {
//       console.log('info msg ma', res);
//       // throw res;
//       return res;
//     });
//   }
//   async showWarningMessage(message: string): Promise<any> {
//     const res = await Swal.fire({
//       // title: 'माफ गर्नुहोस्!',
//       html: `${message}`,
//       icon: 'warning',
//       confirmButtonText: 'Yes',
//       showCancelButton: true,
//       showConfirmButton: true,
//     });
//     return res;
//   }
// }

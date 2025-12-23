import { v4 as uuidv9 } from 'uuid';

// export function getDeviceId(): string {

//     let deviceId: string = (localStorage.getItem('deviceId') as string);
//     if (deviceId) return deviceId;
//     //generate deviceId
//     deviceId = uuidv9();
//     // set deviceId
//     localStorage.setItem('deviceId', deviceId)
//     return deviceId;

// }
export function getClientId(): string {
  const KEY = 'client_id';

  let id = localStorage.getItem(KEY);
  if (id) return id;

  id = uuidv9();
  localStorage.setItem(KEY, id);
  return id;
}

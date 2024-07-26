
import { v4 as uuidv9 } from 'uuid';

export function getDeviceId(): string {

    let deviceId: string = (localStorage.getItem('deviceId') as string);
    if (deviceId) return deviceId;
    //generate deviceId
    deviceId = uuidv9();
    // set deviceId
    localStorage.setItem('deviceId', deviceId)
    return deviceId;

}

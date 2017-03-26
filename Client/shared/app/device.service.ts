import { Injectable } from '@angular/core';

import { ApiHttpService } from './../http/http-api.service';

export class Device {
    public id: string;
    public name: string;
}

class DeviceListResponse {
    public devices: Device[];
}

@Injectable()
export class DeviceService {

    constructor(private apiHttpService: ApiHttpService) { }

    getDevices(): Promise<Device[]> {
        return new Promise((resolve, reject) => {
            this.apiHttpService.get('/Application/Device/List')
                .subscribe(response => {
                    let result = <DeviceListResponse>response.json();
                    resolve(result.devices);
                }, error => {
                    reject(error);
                });
        });
    }

    deleteDevice(device: Device): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apiHttpService.delete('/Application/Device/' + device.id)
                .subscribe(response => {
                    resolve(response);
                }, error => {
                    reject(error);
                });
        });
    }
}

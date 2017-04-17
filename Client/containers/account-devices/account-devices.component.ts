import { Component, OnInit } from '@angular/core';

import { DeviceService, Device } from 'app-shared';

@Component({
    selector: 'app-account-devices',
    template: require('./account-devices.component.html'),
    styles: [require('./account-devices.component.css')]
})
export class AccountDevicesComponent implements OnInit {

    devices: Device[] = [];

    constructor(private deviceService: DeviceService) { }

    ngOnInit() { 
        this.deviceService.getDevices().then(devices => {
            this.devices = devices;
        });
    }

    delete(device: Device) {
        this.deviceService.deleteDevice(device).then(response => {
            this.devices.splice(this.devices.indexOf(device, 0), 1);
        });
    }
}

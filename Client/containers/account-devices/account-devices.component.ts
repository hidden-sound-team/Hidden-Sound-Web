import { Component, OnInit, ViewChild } from '@angular/core';

import { DeviceService, Device } from 'app-shared';
import { ModalComponent } from 'app-components';

@Component({
    selector: 'app-account-devices',
    template: require('./account-devices.component.html'),
    styles: [require('./account-devices.component.css')]
})
export class AccountDevicesComponent implements OnInit {

    devices: Device[] = [];
    selectedDevice: Device;
    showNotification = false;

    // Form fields
    inputName: string;

    @ViewChild(ModalComponent)
    public readonly modal: ModalComponent;

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

    startEdit(device: Device) {
        this.selectedDevice = device;
        this.inputName = device.name;
        
        this.showNotification = false;
        this.modal.show();
    }

    finishEdit(name: string) {
        this.deviceService.editDevice(this.selectedDevice.id, name)
            .then(reponse => {
                this.showNotification = true;
                this.deviceService.getDevices().then(devices => {
                    this.devices = devices;
                });
            })
            .catch(error => {
                
            });
    }
}

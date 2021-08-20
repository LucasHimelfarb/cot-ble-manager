import { BleManager } from 'react-native-ble-plx';
import _ from 'lodash';

export let manager = null;

let devices = [];

export const initializeBleManager = () => {
    manager = new BleManager();
};

export const startScanner = setScannedDevices => {
    setScannedDevices([]);

    manager.startDeviceScan(null, null, (error, device) => {
        if (error) return;

        const validateDevice = _.filter(devices, d => d.id === device.id);
        if (!validateDevice.length) devices.push(deviceFormat(device));
    });

    stopScanner(setScannedDevices);
};

const stopScanner = setScannedDevices => {
    setTimeout(() => {
        manager.stopDeviceScan();

        setScannedDevices(devices);
    }, 8000);
};

const deviceFormat = device => ({
    id: device.id,
    name: device.name
});
import { BleManager } from 'react-native-ble-plx';
import _ from 'lodash';

export let manager = new BleManager();;

let devices = [];

export const startScanner = (setScannedDevices, setLoading) => {
    setScannedDevices([]);

    manager.startDeviceScan(null, null, (error, device) => {
        console.debug('Error de PLX: ', error);
        if (error) return;

        const validateDevice = _.filter(devices, d => d.id === device.id);
        if (!validateDevice.length) devices.push(deviceFormat(device));
    });

    stopScanner(setScannedDevices, setLoading);
};

const stopScanner = (setScannedDevices, setLoading) => {
    setTimeout(() => {
        manager.stopDeviceScan();

        setScannedDevices(devices);
        setLoading(false);
    }, 8000);
};

const deviceFormat = device => ({
    id: device.id,
    name: device.name
});
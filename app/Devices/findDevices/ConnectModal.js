import React, { memo, useState } from 'react';
import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import colors from '../../shared/styles/colors';
import commons from '../../shared/styles/commons';
import { manager } from '../../shared/libraries/bleManager';
import CustomText from '../../shared/components/CustomText';
import filter from 'lodash/filter';

const ConnectModal = ({
    device,
    open,
    showModal,
    cleanSelectedDevice,
    setScannedDevices,
    scannedDevices,
    setConnectedDevices,
    connectedDevices
}) => {
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [connected, setConnected] = useState(false);

    const handleShow = () => {
        setTitle(device.name || 'Unknown device');
    };

    const handleClose = () => {
        showModal(false);
        cleanSelectedDevice(null);
        setConnected(false);
    };

    const connectToDevice = async () => {
        try {
            setLoading(true);

            await manager.connectToDevice(device.id);

            setLoading(false);
            setConnected(true);

            const _scannedDevices = filter(scannedDevices, dev => dev.name !== device.name);
            setScannedDevices(_scannedDevices);

            setConnectedDevices([...connectedDevices, device]);
        }
        catch (error) {
            console.log(error);

            setLoading(false)
        };
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={open}
            onShow={handleShow}
        >
            <View style={[styles.content, styles.center]}>
                <View style={styles.modal}>
                    <CustomText type={'principal'}>{title}</CustomText>
                    <View style={{ marginVertical: 20 }}>
                        <CustomText type={'secondary'}>{!connected ? `Do you want to connect with the ${title} device?` : `Successfully connected with ${device.name} device!`}</CustomText>
                    </View>
                    <View style={styles.row}>
                        { !connected
                        ?
                            <>
                                <TouchableOpacity style={[styles.button, styles.center, { borderColor: 'tomato' }]} onPress={handleClose} disabled={loading}>
                                    <CustomText type={'secondary'}>Cancel</CustomText>
                                </TouchableOpacity>
                                <View style={{ width: 20 }} />
                                <TouchableOpacity style={[styles.button, styles.center, { borderColor: '#90EE90' }]} onPress={connectToDevice} disabled={loading}>
                                    { !loading
                                    ?
                                        <CustomText type={'secondary'}>Confirm</CustomText>
                                    :
                                        <ActivityIndicator size={20} color={colors.primary} />
                                    }
                                </TouchableOpacity>
                            </>
                        :
                            <TouchableOpacity style={[styles.button, styles.center, { borderColor: '#90EE90' }]} onPress={handleClose}>
                                <CustomText type={'secondary'}>Accept</CustomText>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    ...commons,
    content: {
        flex: 1,
        backgroundColor: 'rgba(000,000,000,.7)',
        padding: 20,
        flexDirection: 'column',
    },
    modal: {
        width: '100%',
        backgroundColor: colors.background,
        padding: 10,
        borderRadius: 6
    },
    button: {
        height: 40,
        flex: 1,
        borderRadius: 6,
        borderWidth: 1
    },
});

export default memo(ConnectModal);

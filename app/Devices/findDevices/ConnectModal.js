import React, { memo, useState } from 'react';
import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import sharedStyles from '../../shared/styles';
import { primaryTextColor, background, secondaryTextcolor } from '../../shared/colors';
import { manager } from '../../shared/libraries/bleManager';

import CustomText from '../../shared/components/CustomText';

const ConnectModal = ({device, open, showModal, cleanSelectedDevice }) => {
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
                                        <ActivityIndicator size={20} color={primaryTextColor} />
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
    ...sharedStyles,
    content: {
        flex: 1,
        backgroundColor: 'rgba(000,000,000,.7)',
        padding: 20,
        flexDirection: 'column',
    },
    modal: {
        width: '100%',
        backgroundColor: background,
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

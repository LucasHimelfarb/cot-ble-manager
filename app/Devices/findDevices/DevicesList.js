import React, {
    memo,
    useState,
    useEffect
} from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { startScanner } from '../../shared/libraries/bleManager';
import commons from '../../shared/styles/commons';
import ScannedDeviceCard from './ListCard';
import ConnectModal from './ConnectModal';
import colors from '../../shared/styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '../../shared/components/CustomText';

const DeviceList = () => {
    const [scannedDevices, setScannedDevices] = useState([]);
    const [connectedDevices, setConnectedDevices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (selectedDevice) setOpenModal(true);
    }, [selectedDevice]);

    const handleScan = () => {
        setLoading(true);
        startScanner(setScannedDevices, setLoading);
    };

    const renderItem = ({ item }) => (<ScannedDeviceCard item={item} selectDevice={setSelectedDevice} />);

    const renderSeparator = () => (<View style={styles.listSeparator} />)

    const renderEmptyComponent = () => (
        <View style={[styles.center, styles.emptyComponent]}>
            { !loading
            ?
                <>
                    <CustomText type={'label'}>Press the button or pull the screen to search for nearby devices.</CustomText>
                    <TouchableOpacity style={styles.searchButton} onPress={handleScan}>
                        <CustomText type={'principal'}>Find Nearby Devices</CustomText>
                    </TouchableOpacity>
                </>
            :
                <>
                    <ActivityIndicator size={30} color={colors.primary} />
                    <CustomText type={'label'}>finding BLE devices</CustomText>
                </>
            }
        </View>
    );

    const renderHeaderComponent = () => (
        <>
            { scannedDevices.length
            ?
                <TouchableOpacity style={[styles.headerList, styles.center]} onPress={handleScan}>
                    <CustomText type={'principal'}>Press here for new search</CustomText>
                </TouchableOpacity>
            : null
            }
        </>
    );

    const renderFooterComponent = () => (null);

    return (
        <View style={styles.content}>
            <FlatList
                contentContainerStyle={{ flex: scannedDevices.length ? 0 : 1 }}
                data={scannedDevices}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={renderSeparator}
                ListEmptyComponent={renderEmptyComponent}
                ListHeaderComponent={renderHeaderComponent}
                ListFooterComponent={renderFooterComponent}
            />

            <View style={styles.row}>
                <View>
                    <CustomText type={'secondary'}>{`Connected devices: ${connectedDevices.length}`}</CustomText>
                </View>
                <View style={[styles.centerEnd, { flex: 1 }]}>
                    <CustomText type={'secondary'}>{`Devices found: ${scannedDevices.length}`}</CustomText>
                </View>
            </View>

            <ConnectModal
                open={openModal}
                device={selectedDevice}
                showModal={setOpenModal}
                cleanSelectedDevice={setSelectedDevice}
                setScannedDevices={setScannedDevices}
                scannedDevices={scannedDevices}
                connectedDevices={connectedDevices}
                setConnectedDevices={setConnectedDevices}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    ...commons,
    content: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        borderColor: colors.secondary,
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    },
    listSeparator: {
        height: .5,
        backgroundColor: colors.secondary,
        marginHorizontal: 10,
        marginVertical: 10
    },
    emptyComponent: {
        flex: 1,
        padding: 10
    },
    searchButton: {
        marginTop: 20,
        padding: 20,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: colors.primary
    },
    headerList: {
        padding: 20,
        borderRadius: 6,
        borderBottomWidth: 1,
        borderColor: colors.primary,
        marginBottom: 20,
        borderRadius: 6
    }
});

export default memo(DeviceList);

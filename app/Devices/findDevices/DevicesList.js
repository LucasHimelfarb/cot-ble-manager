import React, {
    memo,
    useState,
    useEffect
} from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { startScanner } from '../../shared/libraries/bleManager';
import sharedStyles from '../../shared/styles';
import ScannedDeviceCard from './ListCard';
import ConnectModal from './ConnectModal';
import { primaryTextColor, secondaryTextcolor } from '../../shared/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '../../shared/components/CustomText';
import colors from '../../shared/styles/colors';

const DeviceList = () => {
    const [scannedDevices, setScannedDevices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (selectedDevice) setOpenModal(true);
    }, [selectedDevice]);

    useEffect(() => {
        setLoading(false);
    }, [selectedDevice]);

    const handleScan = () => {
        setLoading(true);
        startScanner(setScannedDevices);
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
                    <ActivityIndicator size={30} color={primaryTextColor} />
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

    return (
        <View style={styles.content}>
            <FlatList
                contentContainerStyle={{ flex: 1 }}
                data={scannedDevices}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={renderSeparator}
                ListEmptyComponent={renderEmptyComponent}
                ListHeaderComponent={renderHeaderComponent}
            />
            <ConnectModal open={openModal} device={selectedDevice} showModal={setOpenModal} cleanSelectedDevice={setSelectedDevice} />
        </View>
    );
};

const styles = StyleSheet.create({
    ...sharedStyles,
    content: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        borderColor: secondaryTextcolor,
        flex: 1,
        flexDirection: 'column',
        marginTop: 20
    },
    listSeparator: {
        height: .5,
        backgroundColor: secondaryTextcolor,
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
        borderColor: primaryTextColor
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

import React, {
    memo,
    useState,
    useEffect
} from 'react';
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions
} from 'react-native';
import {
    TabBar,
    TabView,
    SceneMap,
} from 'react-native-tab-view';
import {
    background,
    primaryTextColor,
    secondaryTextcolor
} from '../shared/colors';
import { initializeBleManager } from '../shared/libraries/bleManager';
import sharedStyles from '../shared/styles';
import ScannedDevices from './findDevices/DevicesList';
import CustomText from '../shared/components/CustomText';

const Devices = ({ }) => {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'first', title: 'Find devices' },
        { key: 'second', title: 'My devices' },
      ]);

      useEffect(() => {
        initializeBleManager();
      }, [initializeBleManager]);

    const renderScene = SceneMap({
        first: () => (<ScannedDevices />),
        second: () => (null),
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            style={{ shadowOpacity: 0, elevation: 0 }}
            labelStyle={{ color: secondaryTextcolor }}
            contentContainerStyle={{ backgroundColor: background }}
            activeColor={primaryTextColor}
        />
    );

    return (
        <View style={styles.content}>
            <View style={[styles.header, styles.center]}>
                <CustomText type={'principal'}>List of nearby devices</CustomText>
                <CustomText type={'secondary'}>Scan nearby BLE devices and connect to them.</CustomText>
            </View>
            <TabView
                style={{ shadowOpacity: 0, elevation: 0 }}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
                renderTabBar={props => renderTabBar(props)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    ...sharedStyles,
    content: {
        flex: 1,
        padding: 10
    },
    header: {
        height: 70,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: secondaryTextcolor,
    },
    subTitle: {
        textAlign: 'left',
        fontSize: 13,
        color: secondaryTextcolor
    },
});

export default memo(Devices);

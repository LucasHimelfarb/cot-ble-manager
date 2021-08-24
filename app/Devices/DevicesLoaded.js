import React, {
    memo,
    useState,
} from 'react';
import {
    View,
    StyleSheet,
    useWindowDimensions
} from 'react-native';
import {
    TabBar,
    TabView,
    SceneMap,
} from 'react-native-tab-view';
import colors from '../shared/styles/colors';
import commons from '../shared/styles/commons';
import ScannedDevices from './findDevices/DevicesList';
import CustomText from '../shared/components/CustomText';

const FirstRoute = () => (<ScannedDevices />);

const Devices = ({ }) => {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([{ key: 'first', title: 'Find devices' }]);

    const renderScene = SceneMap({ first: FirstRoute });

    const renderTabBar = props => (
        <TabBar
            {...props}
            style={{ shadowOpacity: 0, elevation: 0 }}
            labelStyle={{ color: colors.secondary }}
            contentContainerStyle={{ backgroundColor: colors.background }}
            activeColor={colors.primary}
        />
    );

    return (
        <View style={styles.content}>
            <View style={[styles.header, styles.center]}>
                <CustomText type={'principal'}>Scan and connect devices</CustomText>
                <CustomText type={'secondary'}>Scan nearby BLE devices and connect to them.</CustomText>
            </View>
            <TabView
                lazy
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
    ...commons,
    content: {
        flex: 1,
        padding: 10
    },
    header: {
        height: 70,
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: colors.secondary,
    },
    subTitle: {
        textAlign: 'left',
        fontSize: 13,
        color: colors.secondary
    },
});

export default memo(Devices);

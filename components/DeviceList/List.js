import React, { memo } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import ListItem from './ListItem';

const DeviceList = () => {
    return (
        <View>
            <Text>Listado de dispositivos</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default memo(DeviceList);

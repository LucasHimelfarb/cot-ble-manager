import React, { memo } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

const ListItem = () => {
    return (
        <View>
            <Text>Item</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default memo(ListItem);

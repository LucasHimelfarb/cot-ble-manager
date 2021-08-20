import React, { memo } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import sharedStyles from '../shared/styles';
import { primaryTextColor } from '../shared/colors';

const NavBar = () => {
    return (
        <View style={styles.content}>
            <View style={[styles.box, styles.center]}>
                <Text style={styles.title}>Oliver Test - by: Lucas Himelfarb</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ...sharedStyles,
    content: {
        height: 40,
        flexDirection: 'row'
    },
    box: {
        flex: 1,
    },
    title: {
        color: primaryTextColor,
        letterSpacing: 1
    }
});

export default memo(NavBar);

import React, { memo } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import commons from '../shared/styles/commons';
import colors from '../shared/styles/colors';

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
    ...commons,
    content: {
        height: 40,
        flexDirection: 'row'
    },
    box: {
        flex: 1,
    },
    title: {
        color: colors.primary,
        letterSpacing: 1
    }
});

export default memo(NavBar);

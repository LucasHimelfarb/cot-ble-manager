import React, { memo } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { sharedStyles } from '../shared/styles';

const NavBar = () => {
    return (
        <View style={styles.content}>
            <View style={[styles.box, styles.center]}>
                <Text>Oliver Test</Text>
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
});

export default memo(NavBar);

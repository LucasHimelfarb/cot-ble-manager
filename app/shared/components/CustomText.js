import React, { memo } from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import colors from '../styles/colors';

const CustomText = props => {
    return (
        <Text
            allowFontScaling={false}
            style={[styles[props.type], props.style]}
            {...props}
        >
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    principal: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: 'bold'
    },
    secondary: {
        textAlign: 'left',
        fontSize: 13,
        color: colors.secondary
    },
    label: {
        fontStyle: 'italic',
        color: 'gray',
        fontSize: 18,
        textAlign: 'center'
    }
});

export default memo(CustomText);

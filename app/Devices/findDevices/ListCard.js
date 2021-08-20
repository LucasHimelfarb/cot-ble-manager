import React, { memo } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import sharedStyles from '../../shared/styles';
import sharedImages from '../../shared/images';
import { primaryTextColor } from '../../shared/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ListCard = ({ item, selectDevice }) => {
    return (
        <TouchableOpacity style={[styles.content, styles.row]} onPress={() => selectDevice(item)}>
            <View style={styles.leftBox}>
                <Text style={styles.name} allowFontScaling={false}>{item.name || 'Unknown device'}</Text>
                <Text style={styles.id}>{item.id}</Text>
            </View>
            <View style={[styles.rightBox, styles.centerEnd]}>
                <Image source={sharedImages.watch}  style={{ width: 32, height: 32 }} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    ...sharedStyles,
    content: {
        paddingHorizontal: 10,
    },
    leftBox: {
        flex: 3,
    },
    rightBox: {
        flex: 1
    },
    name: {
        fontSize: 17,
        color: primaryTextColor
    },
    id: {
        fontSize: 12,
        color: 'silver',
        fontStyle: 'italic',

    }
});

export default memo(ListCard);

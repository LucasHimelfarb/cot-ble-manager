import React, { memo } from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';
import commons from '../../shared/styles/commons';
import sharedImages from '../../shared/images';
import colors from '../../shared/styles/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomText from '../../shared/components/CustomText';

const ListCard = ({ item, selectDevice }) => {
    return (
        <TouchableOpacity style={[styles.content, styles.row]} onPress={() => selectDevice(item)}>
            <View style={styles.leftBox}>
                <CustomText type={'principal'} style={styles.name}>{item.name || 'Unknown device'}</CustomText>
                <CustomText type={'secondary'}>{item.id}</CustomText>
            </View>
            <View style={[styles.rightBox, styles.centerEnd]}>
                <Image source={sharedImages.watch}  style={{ width: 32, height: 32 }} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    ...commons,
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
        color: colors.primary
    }
});

export default memo(ListCard);

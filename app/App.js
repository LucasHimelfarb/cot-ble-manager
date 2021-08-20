import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar
} from 'react-native';
import NavBar from  './Home/NavBar';
import DevicesLoaded from './Devices';
import colors from './shared/styles/colors';

const App = () => {
    return (
        <SafeAreaView style={styles.content}>
            <StatusBar backgroundColor={colors.background} />
            <NavBar />
            <DevicesLoaded />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: colors.background
    }
});

export default App;

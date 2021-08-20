import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar
} from 'react-native';
import NavBar from  './Home/NavBar';
import DevicesLoaded from './Devices';
import { background } from './shared/colors';

const App = () => {
    return (
        <SafeAreaView style={styles.content}>
            <StatusBar backgroundColor={background} />
            <NavBar />
            <DevicesLoaded />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: background
    }
});

export default App;

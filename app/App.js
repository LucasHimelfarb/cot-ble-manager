import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import NavBar from  './Home/NavBar';
import DeviceList from './Devices';

const App = () => {
    return (
        <SafeAreaView>
            <NavBar />
            <DeviceList />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default App;

import { PermissionsAndroid } from "react-native";

// TODO handlear errores de permisos

export const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Location Permission",
                message: "App needs access to your location so you can scan device",
                buttonPositive: "Confirm",
                buttonNegative: "Cancel"
            }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
        else throw 'not-granted';
    }
    catch(error) {
        return false;
    };
};
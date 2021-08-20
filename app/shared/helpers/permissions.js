import { PermissionsAndroid } from "react-native";

// TODO handlear errores de permisos

export const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
            {
                title: "Location Permission",
                message: "App needs access to your location so you can scan device",
                buttonPositive: "Confirm",
                buttonNegative: "Cancel"
            }
        );

        console.log('Granted permission: ', granted);
    }
    catch(error) {
        console.log('Permissions error: ', error);
    };
};
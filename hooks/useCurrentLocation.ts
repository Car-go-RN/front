import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useCurrentLocation = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [permission, requestPermission] = Location.useForegroundPermissions();
    
    useEffect(()=>{
        let subscription: Location.LocationSubscription | null = null;

        const startWatching = async () => {
            if(!permission || !permission?.granted){
                const newPermission = await requestPermission();
                if(!newPermission.granted){
                    Alert.alert('위치 정보 불러오기 실패', '위치 권한이 거부되었습니다');
                    setError(true);
                    return;
                }
            }
            subscription = await Location.watchPositionAsync(
            {
                accuracy: Location.Accuracy.Balanced,
                distanceInterval: 300,    
            },
            (location) => {
                setLocation(location);
            })
        }
        startWatching();

        return () => {
            subscription?.remove();
        }
    },[permission]);

    return {location, error}

}
'use client';

import { useCallback, useEffect, useState } from 'react';
import LOCATIONDATA from "@/shared/model/grid/location-data.json"
import { useLocationXY } from '@/feature/location/store';

type LocationType = {
    latitude: number;
    longitude: number;
};

export const useGeoLocation = () => {  
    const [location, setLocation] = useState<LocationType>({
        latitude: 37.579293849225756, // 기본값
        longitude: 126.97798076343491, // 기본값
    });
    const [errorMsg, setErrorMsg] = useState<string>('');
   
    //store
    const { setLocationXY, setLabel } = useLocationXY()

   

    const showError = useCallback((error: GeolocationPositionError) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setErrorMsg('사용자가 위치 정보를 제공허는 것을 거부했습니다. ');
                break;
            case error.POSITION_UNAVAILABLE:
                setErrorMsg('위치 정보를 사용할 수 없습니다.');
                break;
            case error.TIMEOUT:
                setErrorMsg('위치 정보를 가져오는 요청이 시간 초과되었습니다.');
                break;
            default:
                setErrorMsg('알 수 없는 오류가 발생했습니다.');
                break;
        }
    }, []);

useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) return;

    geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({
                latitude,
                longitude,
            });
        },
        (err) => showError(err),
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 * 60 * 10}
    );
}, []);

useEffect(() => {
    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371;
        const toRad = (v: number) => (v * Math.PI) / 180;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    const findNearestLocation = () => {
        let nearest = LOCATIONDATA[0];
        let minDistance = Infinity;

        for (const loc of LOCATIONDATA) {
        const distance = getDistance(
            location.latitude,
            location.longitude,
            loc.latitude,
            loc.longitude
        );

        if (distance < minDistance) {
            minDistance = distance;
            nearest = loc;
        }
        }

        return nearest;
    };

    const nearest = findNearestLocation();
    const label = [nearest.city , nearest.sigungu, nearest.dong].join(" ")
    // json데이터에서 해당위치에서 필요한 격자x , 격자y 추출후 store저장
    setLocationXY(nearest.nx, nearest.ny)
    setLabel(label)
    

}, [location]);
    
   
    return {
        errorMsg,
        setErrorMsg
    }
  
};
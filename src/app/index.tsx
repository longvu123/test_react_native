import {  useEffect, useState } from 'react';
import { Text, View } from "react-native"

import { useAuth } from '@/context/auth.context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Redirect, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';



const RootPage = () => {
	
	const [appIsReady, setAppIsReady] = useState(false);
	const { user } = useAuth();
    useEffect(() => {
        async function prepare() {
            try {				
				// const { logout } = useAuth();
				// await logout();								
                await SplashScreen.preventAutoHideAsync();
                //await new Promise(resolve => setTimeout(resolve, 2000));
                            
                			
                if (true) {					
                    await router.replace("/(tabs)");
                } else {
                    await router.replace("/(auth)/welcome");										
                }
				// Đợi một chút để đảm bảo navigation đã hoàn tất
                await new Promise(resolve => setTimeout(resolve, 100));
                setAppIsReady(true);    
				// Chỉ ẩn splash screen và chuyển trang sau khi đã sẵn sàng
                await SplashScreen.hideAsync();
            } catch (e) {
                console.log(e);
				await SplashScreen.hideAsync();
            }
        }

        prepare();
    },  [ user]);

	return null;
}

export default RootPage;
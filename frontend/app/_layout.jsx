import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Cookie_400Regular } from '@expo-google-fonts/cookie';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

export default function Layout() {
    const [fontsLoaded] = useFonts({
        Cookie_400Regular,
        Lato_400Regular,
        Lato_700Bold,
    });

    const loadAuth = useAuthStore((state) => state.loadAuth);

    useEffect(() => {
        if (fontsLoaded) {
            // SplashScreen.hideAsync();
            loadAuth();
        }
    }, [fontsLoaded, loadAuth]);

    if (!fontsLoaded) {
        return null;
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="index" />
                {/* <Stack.Screen name="(auth)/AuthSelection" /> */}
                {/* <Stack.Screen name="Login" />
                <Stack.Screen name="Register" /> */}
                {/* <Stack.Screen name="(auth)" /> */}
                {/* <Stack.Screen name="home" /> */}

            </Stack>

        </SafeAreaView>
    );
}
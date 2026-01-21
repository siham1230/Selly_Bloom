import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Cookie_400Regular } from '@expo-google-fonts/cookie';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { QueryProvider } from '../providers/QueryProvider';

export default function Layout() {

    const [fontsLoaded] = useFonts({
        Cookie_400Regular,
        Lato_400Regular,
        Lato_700Bold,
    });

    const { setLoading } = useAuthStore();

    useEffect(() => {
        setLoading(true)
        if (fontsLoaded) {
            setLoading(false);
        }
    }, [fontsLoaded,]);

    if (!fontsLoaded) {
        return null;
    }


    return (
        <SafeAreaProvider>
            <GestureHandlerRootView>
                <QueryProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="index" />
                        <Stack.Screen name="(auth)" />
                        <Stack.Screen name="(tabs)" />
                        <Stack.Screen name="product/[id]" />

                    </Stack>
                </QueryProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}
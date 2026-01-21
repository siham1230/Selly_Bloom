import { Tabs } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useSafeAreaFrame, } from 'react-native-safe-area-context';


export default function TabLayout() {
    const { bottom } = useSafeAreaFrame()
    return (
        // <SafeAreaView style={{ flex: 1 }}>

        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#D9C0B3',
                tabBarInactiveTintColor: '#81827C',
                tabBarStyle: {
                    backgroundColor: '#FAFBF5',
                    borderTopColor: '#E5E6DE',
                    borderTopWidth: 1,
                    height: 80,
                    paddingBottom: bottom + 20,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontFamily: 'ato_700Bold',
                    fontSize: 12,

                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="favourite"
                options={{
                    title: 'Favorite',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="heart" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="cart" size={size} color={color} />
                    ),
                    tabBarBadge: 3,
                }}
            />
        </Tabs>
        // </SafeAreaView>

    )
}

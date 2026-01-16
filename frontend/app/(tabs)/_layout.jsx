import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';


export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#D9C0B3',
                tabBarInactiveTintColor: '#81827C',
                tabBarStyle: {
                    backgroundColor: '#FAFBF5',
                    borderTopColor: '#E5E6DE',
                    borderTopWidth: 1,
                    height: 60,
                    paddingBottom: 8,
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
                name="favorite"
                options={{
                    title: 'Favorites',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" size={size} color={color} />
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
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}

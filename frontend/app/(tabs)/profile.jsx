import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/authStore';

export default function ProfileScreen() {
    const router = useRouter();
    const { user, logout } = useAuthStore();

    if (!user) {
        return (

            <SafeAreaView style={styles.container}>
                <View style={styles.center}>
                    <Text>Loading...</Text>

                </View>
            </SafeAreaView>
        );
    };

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            logout();
                            router.replace('Login');
                        } catch (error) {
                            Alert.alert('Error', 'Failed to logout');
                        }
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                    <Text style={styles.subtitle}>Manage your account 🌸</Text>
                </View>

                <View style={styles.userCard}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person-circle" size={80} color="#D9C0B3" />
                    </View>
                    <Text style={styles.userName}>{user.name || 'N/A'}</Text>
                    <Text style={styles.userEmail}>{user.email || 'N/A'}</Text>
                    <Text style={styles.userAdress}>{user.shippingAddress || 'No shipping address set'}</Text>
                </View>



                <Pressable style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={24} color="#FAFBF5" />
                    <Text style={styles.logoutText}>Logout</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFBF5',
    },
    scrollContainer: {
        padding: 24,
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    header: {
        paddingVertical: 20,
        paddingBottom: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontFamily: 'Cookie_400Regular',
        color: '#81827C',
        marginBottom: 8,
        // textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
        opacity: 0.7,
        textAlign: 'center',
        marginBottom: 20,
    },
    userCard: {
        backgroundColor: '#FFFFFF',
        // marginHorizontal: 24,
        marginBottom: 24,
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    avatarContainer: {
        marginBottom: 16,
    },
    userName: {
        fontSize: 24,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
        opacity: 0.7,
    },
    userAdress: {
        fontSize: 14,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
        opacity: 0.7,
        marginTop: 4,
    },

    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D9C0B3',
        marginTop: 16,
        padding: 16,
        borderRadius: 12,
        gap: 12,
        // marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    logoutText: {
        fontSize: 16,
        fontFamily: 'Lato_700Bold',
        color: '#FAFBF5',
    },
    version: {
        textAlign: 'center',
        fontSize: 12,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
        opacity: 0.5,
        marginBottom: 24,
    },
});
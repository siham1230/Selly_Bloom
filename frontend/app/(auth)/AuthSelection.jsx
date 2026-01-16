import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
// import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';


const AuthSelection = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.subtitle}>
                    Sign in or create an account to continue
                </Text>

                <View style={styles.buttonContainer}>
                    <Pressable style={styles.primaryButton}
                        onPress={() => router.push('/(auth)/Register')}>
                        <Text style={styles.primaryButtonText}>Sign Up</Text>
                    </Pressable>
                    <Pressable
                        style={styles.secondaryButton}
                        onPress={() => router.push('/(auth)/Login')}>
                        <Text style={styles.secondaryButtonText}>
                            Log In
                        </Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AuthSelection;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',

    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 48,
        fontFamily: 'Cookie_400Regular',
        color: '#5c5c5bff',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 30,
        fontFamily: 'Cookie_400Regular',
        color: '#81827C',
        textAlign: 'center',
        marginBottom: 48,
        opacity: 0.8,
    },
    buttonContainer: {
        width: '100%',
    },
    primaryButton: {
        height: 56,
        backgroundColor: '#ceb1b1ff',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    primaryButtonText: {
        color: '#f8f9fa',
        fontSize: 19,
        fontFamily: 'Lato_700Bold',
    },
    secondaryButton: {
        height: 56,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#252525ff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',

    },
    secondaryButtonText: {
        color: '#ceb1b1ff',
        fontSize: 19,
        fontFamily: 'Lato_400Regular',
        fontWeight: '600',
    },


});

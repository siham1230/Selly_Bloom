import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { loginUser } from "../../services/auth";
import { Alert } from "react-native";
import { useAuthStore } from '../../store/authStore';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Please fill in all fields');
            return;
        }

        if (!email.includes('@')) {
            Alert.alert('Please enter a valid email');
            return;
        }

        setLoading(true);


        try {
            const result = await loginUser(email.toLowerCase().trim(), password);

            if (result.success) {
                const { user, token } = result.data;
                await useAuthStore.getState().setAuth(user, token);

                if (user.role === 'admin') {
                    // router.replace('/(admin)');
                } else {
                    router.replace('/home');
                }
            } else {
                Alert.alert('Error', result.message || 'Login failed');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred during login');
        } finally {
            setLoading(false);
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Enter your Details to continue</Text>
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="hello@sellybloom.com"
                            placeholderTextColor={'#81827C'}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            value={email}
                            onChangeText={setEmail}
                            editable={!loading}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor={'#81827C'}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            editable={!loading}
                            onSubmitEditing={handleLogin}

                        />
                    </View>


                    <Pressable style={[styles.primaryButton, loading && styles.disabledButton]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color='#FAFBF5' />
                        ) : (
                            <Text style={styles.primaryButtonText}>Log In</Text>


                        )}
                        {/* <Text style={styles.primaryButtonText}>Log In</Text> */}
                    </Pressable>
                    <Text style={styles.footerText}>
                        Dont have an account?{' '}
                        <Text
                            style={styles.link}
                            onPress={() => router.push('/(auth)/Register')}
                        >
                            Sign Up
                        </Text>
                    </Text>
                </View>
            </View>

        </SafeAreaView>
    );
};
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFBF5',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        fontFamily: 'Cookie_400Regular',
        color: '#81827C',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
        opacity: 0.7,
        marginBottom: 32,
        textAlign: 'center',
    },
    form: {
        width: '100%'
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
        marginBottom: 8,
    },
    input: {
        height: 56,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E5E6DE',
        paddingHorizontal: 16,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
        marginBottom: 16,
        backgroundColor: '#ffff',
    },
    primaryButton: {
        height: 56,
        backgroundColor: '#D9C0B3',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    disabledButton: {
        opacity: 0.6,
    },
    primaryButtonText: {
        color: '#FAFBF5',
        fontSize: 16,
        fontFamily: 'Lato_700Bold',
    },
    footerText: {
        marginTop: 24,
        textAlign: 'center',
        color: '#81827C',
        fontFamily: 'Lato_400Regular',
    },
    link: {
        color: '#D9C0B3',
        fontFamily: 'Lato_700Bold',
    },
})
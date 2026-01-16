import { StyleSheet, View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { registerUser } from "../../services/auth";
import { router } from 'expo-router';
import { Alert } from "react-native";
import { useAuthStore } from '../../store/authStore';

const Register = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPaasword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {

        if (!fullName || !email || !password || !confirmPassword) {
            Alert.alert('Please fill in all fields');
            // useAuthStore.getState().setLoading(false);
            return;
        }
        if (!email.includes('@')) {
            Alert.alert('Please enter a valid email');
            return;

        }
        if (password.length < 6) {
            Alert.alert('Password must be at least 6 characters');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        }
        setLoading(true);
        try {
            const result = await registerUser(fullName.trim(), email.toLowerCase().trim(), password);


            if (result.success) {
                const { user, token } = result.data;
                await useAuthStore.getState().setAuth(user, token);
                router.replace('/home');

            } else {
                Alert.alert('Error', result.message || 'Registration failed');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred during registration');
        } finally {
            setLoading(false);
        }

    };





    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Join us today</Text>


                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="John Doe"
                            placeholderTextColor={'#81827C'}
                            value={fullName}
                            onChangeText={setFullName}
                            autoCapitalize='words'
                            editable={!loading}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="hello@sellybloom.com"
                            placeholderTextColor={'#81827C'}
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            editable={!loading}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor={'#81827C'}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            editable={!loading}
                        />
                    </View>


                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='••••••••'
                            placeholderTextColor={'#81827C'}
                            value={confirmPassword}
                            onChangeText={setConfirmPaasword}
                            secureTextEntry
                            editable={!loading}
                            onSubmitEditing={handleRegister}
                        />
                    </View>

                    <Pressable style={[styles.primaryButton, loading && styles.disabledButton]}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FAFBF5" />
                        ) : (
                            <Text style={styles.primaryButtonText}>Sign Up</Text>


                        )}
                    </Pressable>

                    <Text style={styles.footerText}>
                        Already have an account?{' '}
                        <Text
                            style={styles.link}
                            onPress={() => router.push('/(auth)/Login')}
                        >
                            Log In
                        </Text>
                    </Text>

                </View>
            </View>
        </SafeAreaView>
    );
}
export default Register;

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
        alignContent: 'center',
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontFamily: 'Lato_700Bold',
        fontSize: 14,
        color: '#81827C',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        height: 56,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E5E6DE',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
        // marginBottom: 16,
        fontSize: 16,
    },
    primaryButton: {
        height: 56,
        backgroundColor: '#D9C0B3',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    disableButton: {
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
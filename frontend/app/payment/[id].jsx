import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { usePaymentStore } from '../../store/paymentStore';

export default function Payment() {
    const { id } = useLocalSearchParams();
    const totalAmount = Number(id);

    const {
        fullName,
        phone,
        city,
        address,
        notes,
        paymentMethod,
        setFullName,
        setPhone,
        setCity,
        setAddress,
        setNotes,
        setPaymentMethod,
        resetPaymentData,
    } = usePaymentStore();

    useEffect(() => {
        resetPaymentData();
    }, []);

    const router = useRouter();

    const handleSubmit = () => {
        if (!fullName || !phone || !city || !address) {
            Alert.alert('Error', 'Please fill all required fields');
            Keyboard.dismiss();
            // Alert.alert('Form Submitted');
            return;
        }
        const orderData = {
            userId: 2,
            orderNumber: `FLOW-${Math.floor(Math.random() * 1000) + 1000}`,
            status: 'confirmed',
            totalAmount,
            shippingAddress: {
                fullName,
                phone,
                address,
                city,
            },
            paymentMethod,
            paymentStatus: 'pending',
            notes,
            deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        };

        console.log('Order Data:', orderData);

        Alert.alert('Order Confiremd', `Order ${orderData.orderNumber} has been confirmed!`);
        router.push("(tabs)/home");

    };
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Pressable style={styles.headerButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#81827C" />
                </Pressable>
                <Text style={styles.header}>Payment and Shipping</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor={'#81827C'}
                    value={fullName}
                    onChangeText={setFullName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    placeholderTextColor={'#81827C'}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"

                />
                <TextInput
                    style={styles.input}
                    placeholder="City"
                    placeholderTextColor={'#81827C'}
                    value={city}
                    onChangeText={setCity}


                />
                <TextInput
                    style={styles.input}
                    placeholder="Shipping Address"
                    value={address}
                    onChangeText={setAddress}
                    placeholderTextColor={'#81827C'}



                />
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Notes (optional)</Text>
                    <TextInput
                        style={[styles.input, styles.notesInput]}
                        placeholder="Write your message here..."
                        placeholderTextColor="#81827C"
                        value={notes}
                        onChangeText={setNotes}
                        multiline
                        textAlignVertical="top"

                    // editable={!loading}

                    />
                </View>

                <Text style={styles.paymentHeader}>Payment Method</Text>
                <Pressable
                    style={[styles.paymentButton, paymentMethod === 'cash' && styles.selectedButton]}
                    onPress={() => setPaymentMethod('cash')}
                >
                    <Text style={styles.paymentButtonText}>Cash</Text>
                    {paymentMethod === 'cash' && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
                </Pressable>
                <Text style={styles.totalPrice}>Total: {totalAmount} MAD</Text>
                <Pressable style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Confirm Order</Text>
                </Pressable>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFBF5',
        padding: 16,
    },
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        fontSize: 14,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
        marginBottom: 6,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FAFBF5',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 16,
        marginLeft: 16,
    },
    header: {
        fontSize: 24,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
        marginBottom: 20,
    },
    input: {
        height: 50,
        bordoerColor: '#E5E6DE',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingLeft: 15,
        fontSize: 16,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
    },
    notesInput: {
        height: 120,
        paddingTop: 12,
    },

    paymentHeader: {
        fontSize: 18,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
        marginTop: 20,
        marginBottom: 10,
    },
    paymentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#D9C0B3',
        borderRadius: 10,
        marginBottom: 15,
        justifyContent: 'space-between',
    },
    selectedButton: {
        backgroundColor: '#4CAF50',
    },
    paymentButtonText: {
        fontSize: 16,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
    },
    totalPrice: {
        fontSize: 18,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
        marginVertical: 20,
    },
    submitButton: {
        backgroundColor: '#D9C0B3',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    submitButtonText: {
        fontSize: 18,
        fontFamily: 'Lato_700Bold',
        color: '#FAFBF5',
    },

});

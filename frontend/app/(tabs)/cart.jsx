import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '../../store/cartStore';
import { useRouter } from 'expo-router';

export default function CartScreen() {
    const router = useRouter();


    const cartItems = useCartStore((state) => state.items);
    const increaseQty = useCartStore((state) => state.increaseQty);
    const decreaseQty = useCartStore((state) => state.decreaseQty);


    const total = cartItems.reduce(
        (sum, item) => sum + Number(item.price || 0) * item.quantity,
        0
    );

    const handleProceedToCheckout = () => {
        router.push(`/payment/${total}`);

    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Shopping Cart</Text>
                <Text style={styles.subtitle}>Your selected flowers 🛒</Text>
            </View>

            {cartItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>🌸</Text>
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                    <Text style={styles.emptySubtext}>
                        Add some beautiful flowers!
                    </Text>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.list}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemPrice}>MAD {item.price}</Text>
                                </View>

                                <View style={styles.qtyContainer}>
                                    <Pressable
                                        onPress={() => decreaseQty(item.id)}
                                        style={styles.qtyButton}
                                    >
                                        <Text style={styles.qtyText}>-</Text>
                                    </Pressable>

                                    <Text style={styles.qtyValue}>{item.quantity}</Text>
                                    <Pressable
                                        onPress={() => increaseQty(item.id)}
                                        style={styles.qtyButton}
                                    >
                                        <Text style={styles.qtyText}>+</Text>
                                    </Pressable>
                                </View>
                            </View>
                        )}

                    />

                    {/* keyExtractor={(item) => item.id} */}
                    {/* contentContainerStyle={styles.list} */}


                    <View style={styles.footer}>
                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>Total:</Text>
                            <Text style={styles.totalAmount}>MAD{total.toFixed(2)}</Text>
                        </View>
                        <Pressable style={styles.checkoutButton}
                            onPress={handleProceedToCheckout}
                        >
                            <Text style={styles.checkoutButtonText}>
                                Proceed to Checkout
                            </Text>
                        </Pressable>
                    </View>
                </>
            )
            }
        </SafeAreaView >
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFBF5',
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 10,
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
        textAlign: 'center',
        marginBottom: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyIcon: {
        fontSize: 80,
        marginBottom: 16,
    },
    emptyText: {
        fontSize: 20,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
        marginBottom: 8,
    },
    emptySubtext: {
        fontSize: 14,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
        opacity: 0.6,
        textAlign: 'center',
    },
    list: {
        paddingHorizontal: 24,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E6DE',
    },
    itemName: {
        fontSize: 16,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
    },
    itemPrice: {
        fontSize: 14,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
        opacity: 0.7,
        marginTop: 4,
    },
    qtyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyButton: {
        width: 32,
        height: 32,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D9C0B3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    qtyText: {
        fontSize: 18,
        fontFamily: 'Lato_700Bold',
        color: '#D9C0B3',
    },
    qtyValue: {
        marginHorizontal: 12,
        fontSize: 16,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
    },
    footer: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E6DE',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    totalLabel: {
        fontSize: 18,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
    },
    totalAmount: {
        fontSize: 24,
        fontFamily: 'Lato_700Bold',
        color: '#D9C0B3',
    },
    checkoutButton: {
        height: 56,
        backgroundColor: '#D9C0B3',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkoutButtonText: {
        color: '#FAFBF5',
        fontSize: 16,
        fontFamily: 'Lato_700Bold',
    },
});
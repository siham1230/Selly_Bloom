import { useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useProduct } from '../../hooks/useProducts';

export default function ProductDetail() {

    const { top } = useSafeAreaInsets()
    const { id } = useLocalSearchParams();
    const router = useRouter();


    const [isFavorite, setIsFavorite] = useState(false);
    console.log('Product ID:', id);

    const { data: product, isLoading, isError, error } = useProduct(id);


    const handleAddToCart = () => {
        if (!product) return;

        Alert.alert('Success', `${product.name} added to cart!`);
    };




    const handleToggleFavorite = () => {
        if (!product) return;

        setIsFavorite((prev) => !prev);
        Alert.alert(
            !isFavorite ? 'Remove from favorites' : 'Added to favorites',
            product.name
        );
    };

    const handleGoBack = () => {
        router.back();
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#D9C0B3" />
                    <Text style={styles.loadingText}>Loading product...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (isError || !product) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Ionicons name="warning-outline" size={60} color="#FF6B6B" />
                    <Text style={styles.errorText}>Product not found</Text>
                    <Text style={styles.errorSubText}>
                        {error?.message || 'Unable to load product details'}
                    </Text>
                    <Pressable style={styles.backButton} onPress={handleGoBack}>
                        <Text style={styles.backButtonText}>Go Back</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    const imageUrl = product.image?.[0];
    const price = parseFloat(product.price);

    return (
        <View style={styles.container}>

            <Pressable style={[styles.headerButton, StyleSheet.absoluteFill, { marginTop: top }]} onPress={handleGoBack}>
                <Ionicons name="arrow-back" size={24} color="#81827C" />
            </Pressable>
            {/* </SafeAreaView> */}
            <ScrollView
                bounces={false}
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.productImage} />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Ionicons name="flower" size={80} color="#D9C0B3" />
                        <Text style={styles.placeholderText}>No Image</Text>
                    </View>
                )}

                <View style={styles.contentContainer}>
                    <Text style={styles.productName}>{product.name}</Text>

                    <View style={styles.stockContainer}>
                        <Ionicons
                            name={product.stock > 0 ? "checkmark-circle" : "close-circle"}
                            size={18}
                            color={product.stock > 0 ? "#4CAF50" : "#FF6B6B"}
                        />
                        <Text style={styles.stockText}>
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                        </Text>
                    </View>

                    <Text style={styles.productPrice}>
                        {isNaN(price) ? 'N/A' : price.toFixed(2)} MAD
                    </Text>

                    <View style={styles.divider} />

                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.productDescription}>{product.description}</Text>
                </View>
            </ScrollView>

            <View style={styles.bottomActions}>

                <Pressable
                    style={[
                        styles.addToCartButton,
                        product.stock === 0 && styles.addToCartButtonDisabled,
                    ]}
                    onPress={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    <Ionicons
                        name="cart-outline"
                        size={22}
                        color={product.stock === 0 ? "#81827C" : "#FAFBF5"}
                    />
                    <Text style={[
                        styles.addToCartButtonText,
                        product.stock === 0 && styles.addToCartButtonTextDisabled,
                    ]}>
                        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.favoriteButton}
                    onPress={handleToggleFavorite}
                >
                    <Ionicons
                        name={isFavorite ? "heart" : "heart-outline"}
                        size={26}
                        color={isFavorite ? "#FF6B6B" : "#D9C0B3"}
                    />

                </Pressable>
            </View>
        </View>
        // </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFBF5',

    },
    headerSafeArea: {
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E6DE',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },

    errorText: {
        fontSize: 14,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
        opacity: 0.6,
        textAlign: 'center',
        // marginTop: 16,
        marginBottom: 20,
        // paddingHorizontal: 20,
    },
    errorSubText: {
        fontSize: 14,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
        textAlign: 'center',
        marginTop: 16,
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#D9C0B3',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 20,
    },
    backButtonText: {
        color: '#FAFBF5',
        fontSize: 16,
        fontFamily: 'Lato_700Bold',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E6DE',
    },
    scrollView: {
        flex: 1,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FAFBF5',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,

        marginHorizontal: 20
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
    },
    productImage: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    placeholderImage: {
        width: '100%',
        height: 400,
        backgroundColor: '#E5E6DE',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        marginTop: 12,
        fontSize: 16,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
        opacity: 0.6,
    },
    contentContainer: {
        padding: 24,
        paddingBottom: 100,
    },
    productName: {
        fontSize: 28,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
        marginBottom: 12,
        lineHeight: 36,
    },
    stockContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    stockText: {
        fontSize: 15,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
        opacity: 0.8,
    },
    productPrice: {
        fontSize: 20,
        fontFamily: 'Lato_700Bold',
        color: '#D9C0B3',
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E6DE',
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
        marginBottom: 12,
    },
    productDescription: {
        fontSize: 15,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
        lineHeight: 24,
        opacity: 0.8,
    },
    bottomSafeArea: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E6DE',
    },
    bottomActions: {
        flexDirection: 'row',
        padding: 16,
        paddingHorizontal: 16,
        // borderTopWidth: 1,
        gap: 12,
    },
    favoriteButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FAFBF5',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#E5E6DE',
    },
    addToCartButton: {
        flex: 1,
        flexDirection: 'row',
        height: 56,
        backgroundColor: '#D9C0B3',
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    addToCartButtonDisabled: {
        backgroundColor: '#E5E6DE',
    },
    addToCartButtonText: {
        color: '#FAFBF5',
        fontSize: 16,
        fontFamily: 'Lato_700Bold',
    },
    addToCartButtonTextDisabled: {
        color: '#81827C',
    },
});
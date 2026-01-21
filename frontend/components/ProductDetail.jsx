// import { useState } from 'react';
// import { StyleSheet, View, Text, Image, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { router } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { useProduct } from '../hooks/useProducts';

// const ProductDetail = ({ productId }) => {
//     const { data: product, isLoading, isError } = useProduct(productId);
//     const [isFavorite, setIsFavorite] = useState(false);

//     const handleAddToCart = () => {
//         Alert.alert('Success', `${product.name} added to cart!`);
//         console.log('Add to cart:', product.name);
//     };

//     const handleToggleFavorite = () => {
//         setIsFavorite(!isFavorite);
//         Alert.alert(
//             isFavorite ? 'Removed from favorites' : 'Added to favorites',
//             product.name
//         );
//     };

//     const handleGoBack = () => {
//         router.back();
//     };

//     if (isLoading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#D9C0B3" />
//                 <Text style={styles.loadingText}>Loading product...</Text>
//             </View>
//         );
//     }

//     if (isError || !product) {
//         return (
//             <View style={styles.errorContainer}>
//                 <Ionicons name="warning-outline" size={60} color="#FF6B6B" />
//                 <Text style={styles.errorText}>Product not found</Text>
//                 <Pressable style={styles.backButton} onPress={handleGoBack}>
//                     <Text style={styles.backButtonText}>Go Back</Text>
//                 </Pressable>
//             </View>
//         );
//     }

//     const imageUrl = product.image && product.image[0];
//     const price = parseFloat(product.price);

//     return (
//         <SafeAreaView style={styles.container}>
//             {/* Header with Back Button and Add to Cart */}
//             <View style={styles.header}>
//                 <Pressable style={styles.headerButton} onPress={handleGoBack}>
//                     <Ionicons name="arrow-back" size={24} color="#81827C" />
//                 </Pressable>
//                 <Text style={styles.headerTitle}>Product Details</Text>
//                 <Pressable style={styles.headerButton} onPress={handleAddToCart}>
//                     <Ionicons name="cart-outline" size={24} color="#81827C" />
//                 </Pressable>
//             </View>

//             <ScrollView showsVerticalScrollIndicator={false}>
//                 {/* Product Image */}
//                 {imageUrl ? (
//                     <Image source={{ uri: imageUrl }} style={styles.productImage} />
//                 ) : (
//                     <View style={styles.placeholderImage}>
//                         <Ionicons name="flower" size={80} color="#D9C0B3" />
//                         <Text style={styles.placeholderText}>No Image</Text>
//                     </View>
//                 )}

//                 {/* Product Info */}
//                 <View style={styles.contentContainer}>
//                     {/* Product Name */}
//                     <Text style={styles.productName}>{product.name}</Text>

//                     {/* Stock Status */}
//                     <View style={styles.stockContainer}>
//                         <Ionicons
//                             name={product.stock > 0 ? "checkmark-circle" : "close-circle"}
//                             size={20}
//                             color={product.stock > 0 ? "#4CAF50" : "#FF6B6B"}
//                         />
//                         <Text style={styles.stockText}>
//                             {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
//                         </Text>
//                     </View>

//                     {/* Price */}
//                     <Text style={styles.productPrice}>
//                         {isNaN(price) ? 'N/A' : price.toFixed(2)} MAD
//                     </Text>

//                     {/* Divider */}
//                     <View style={styles.divider} />

//                     {/* Description */}
//                     <Text style={styles.sectionTitle}>Description</Text>
//                     <Text style={styles.productDescription}>{product.description}</Text>
//                 </View>
//             </ScrollView>

//             {/* Bottom Actions */}
//             <View style={styles.bottomActions}>
//                 {/* Favorite Button */}
//                 <Pressable
//                     style={styles.favoriteButton}
//                     onPress={handleToggleFavorite}
//                 >
//                     <Ionicons
//                         name={isFavorite ? "heart" : "heart-outline"}
//                         size={28}
//                         color={isFavorite ? "#FF6B6B" : "#D9C0B3"}
//                     />
//                 </Pressable>

//                 {/* Add to Cart Button */}
//                 <Pressable
//                     style={[
//                         styles.addToCartButton,
//                         product.stock === 0 && styles.addToCartButtonDisabled
//                     ]}
//                     onPress={handleAddToCart}
//                     disabled={product.stock === 0}
//                 >
//                     <Ionicons
//                         name="cart-outline"
//                         size={24}
//                         color={product.stock === 0 ? "#81827C" : "#FAFBF5"}
//                     />
//                     <Text style={[
//                         styles.addToCartButtonText,
//                         product.stock === 0 && styles.addToCartButtonTextDisabled
//                     ]}>
//                         {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
//                     </Text>
//                 </Pressable>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default ProductDetail;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FAFBF5',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     loadingText: {
//         marginTop: 12,
//         fontSize: 16,
//         fontFamily: 'Lato_400Regular',
//         color: '#81827C',
//     },
//     errorContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingHorizontal: 40,
//     },
//     errorText: {
//         fontSize: 20,
//         fontFamily: 'Lato_700Bold',
//         color: '#81827C',
//         marginTop: 16,
//         marginBottom: 20,
//     },
//     backButton: {
//         backgroundColor: '#D9C0B3',
//         paddingHorizontal: 32,
//         paddingVertical: 12,
//         borderRadius: 20,
//     },
//     backButtonText: {
//         color: '#FAFBF5',
//         fontSize: 16,
//         fontFamily: 'Lato_700Bold',
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         backgroundColor: '#FFFFFF',
//         borderBottomWidth: 1,
//         borderBottomColor: '#E5E6DE',
//     },
//     headerButton: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         backgroundColor: '#FAFBF5',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontFamily: 'Lato_700Bold',
//         color: '#81827C',
//     },
//     productImage: {
//         width: '100%',
//         height: 400,
//         resizeMode: 'cover',
//     },
//     placeholderImage: {
//         width: '100%',
//         height: 400,
//         backgroundColor: '#E5E6DE',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     placeholderText: {
//         marginTop: 12,
//         fontSize: 16,
//         fontFamily: 'Lato_400Regular',
//         color: '#81827C',
//         opacity: 0.6,
//     },
//     contentContainer: {
//         padding: 24,
//     },
//     productName: {
//         fontSize: 28,
//         fontFamily: 'Lato_700Bold',
//         color: '#81827C',
//         marginBottom: 12,
//         lineHeight: 36,
//     },
//     stockContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 16,
//         gap: 8,
//     },
//     stockText: {
//         fontSize: 15,
//         fontFamily: 'Lato_400Regular',
//         color: '#81827C',
//         opacity: 0.8,
//     },
//     productPrice: {
//         fontSize: 32,
//         fontFamily: 'Lato_700Bold',
//         color: '#D9C0B3',
//         marginBottom: 20,
//     },
//     divider: {
//         height: 1,
//         backgroundColor: '#E5E6DE',
//         marginVertical: 20,
//     },
//     sectionTitle: {
//         fontSize: 20,
//         fontFamily: 'Lato_700Bold',
//         color: '#81827C',
//         marginBottom: 12,
//     },
//     productDescription: {
//         fontSize: 15,
//         fontFamily: 'Lato_400Regular',
//         color: '#81827C',
//         lineHeight: 24,
//         opacity: 0.8,
//     },
//     bottomActions: {
//         flexDirection: 'row',
//         padding: 16,
//         backgroundColor: '#FFFFFF',
//         borderTopWidth: 1,
//         borderTopColor: '#E5E6DE',
//         gap: 12,
//     },
//     favoriteButton: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         backgroundColor: '#FAFBF5',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderWidth: 2,
//         borderColor: '#E5E6DE',
//     },
//     addToCartButton: {
//         flex: 1,
//         flexDirection: 'row',
//         height: 60,
//         backgroundColor: '#D9C0B3',
//         borderRadius: 30,
//         alignItems: 'center',
//         justifyContent: 'center',
//         gap: 12,
//     },
//     addToCartButtonDisabled: {
//         backgroundColor: '#E5E6DE',
//     },
//     addToCartButtonText: {
//         color: '#FAFBF5',
//         fontSize: 18,
//         fontFamily: 'Lato_700Bold',
//     },
//     addToCartButtonTextDisabled: {
//         color: '#81827C',
//     },
// });
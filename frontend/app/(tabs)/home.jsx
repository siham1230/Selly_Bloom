import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image, Pressable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
// import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../store/authStore";
import { useProducts } from "../../hooks/useProducts";
import { useRouter } from 'expo-router';
const HomeScreen = () => {
    const { user } = useAuthStore();

    const { data: products = [], isLoading } = useProducts();
    const router = useRouter();
    const handleProductPress = (productId) => {
        router.push(`product/${productId}`);
    };

    const renderProduct = ({ item }) => {
        const price = parseFloat(item.price);
        const imageUrl = item.image && item.image[0];


        return (
            <Pressable
                style={styles.productCard}
                onPress={() => handleProductPress(item.id)}
            >

                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.productImage} />
                ) : (
                    <View style={styles.placeholderImage}>
                        <Text>No Image</Text>
                    </View>
                )}
                <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOflines={2}>
                        {item.name}
                    </Text>
                    <Text style={styles.productPrice}>
                        {isNaN(price) ? 'N/A' : price.toFixed(2)} MAD
                    </Text>
                </View>
            </Pressable>

        );

    };
    const ListHeader = () => (
        <View style={styles.scrollingHeader}>


            <Text style={styles.subtitle}>Hello, {user?.name}!🌸</Text>

            <Text style={styles.sectionTitle}>Beautiful homes Need These</Text>
        </View>
    );
    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#D9C0B3" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.fixedHeader}>
                <Text style={styles.title}>SellyBloom</Text>


            </View>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProduct}
                numColumns={2}
                columnWrapperStyle={styles.row}
                ListHeaderComponent={ListHeader}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}

            />
        </SafeAreaView>

    );
};
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFBF5',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fixedHeader: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 16,
        backgroundColor: '#FAFBF5',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E6DE',
    },
    scrollingHeader: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 10,
    },
    listContent: {
        // paddingTop: 16,
        paddingBottom: 20,
    },

    title: {
        fontSize: 40,
        fontFamily: 'Cookie_400Regular',
        color: '#81827C',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        fontFamily: 'Lato_700Bold',
        color: '#d9C0B3',
        textAlign: 'center',
        marginBottom: 16,

    },
    // section: {
    //     flex: 1,
    //     marginTop: 20,
    // },
    sectionTitle: {
        fontSize: 24,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
        marginBottom: 16,
        textAlign: 'center',
    },
    productName: {
        fontSize: 16,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
        marginBottom: 8,
        minHeight: 40,
    },
    productPrice: {
        fontSize: 20,
        fontFamily: 'Lato_700Bold',
        color: '#D9C0B3',
    },
    productCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        // marginHorizontal: 12,
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
        flex: 1,
        marginHorizontal: 8,
        // width: '45%',
    },
    productInfo: {
        padding: 12,
        minHeight: 90,
    },
    productImage: {
        width: '100%',
        height: 180,
        resizeMode: 'cover',
        // borderTopLeftRadius: 16,
        // borderTopRightRadius: 16,
    },
    placeholderImage: {
        width: '100%',
        height: 180,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
        // borderTopEndRadius: 16,
        // borderTopRightRadius: 16,
    },


    row: {
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
});



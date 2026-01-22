import { StyleSheet, View, Text, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavoriteStore } from '../../store/favoriteStore';

const FavoriteScreen = () => {

    const favoriteItems = useFavoriteStore((state) => state.favorites);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>My Favorites</Text>
                <Text style={styles.subtitle}>Your saved Flowers ❤️</Text>
            </View>
            {favoriteItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>🌸</Text>
                    <Text style={styles.emptyText}>No favorites yet</Text>
                    <Text style={styles.emptySubtext}>
                        Start adding flowers to your favourites!
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={favoriteItems}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    contentContainerStyle={styles.list}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.itemImage}
                            />
                            <Text style={styles.itemName}>{item.name}</Text>
                        </View>
                    )}
                />
            )}


        </SafeAreaView>
    );
};

export default FavoriteScreen;

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
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Lato_400Regular',
        color: '#81827C',
        marginBottom: 20,
        textAlign: 'center',
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
        paddingHorizontal: 12,
        paddingBottom: 20,
    },
    item: {
        flex: 1 / 3,
        alignItems: 'center',
        margin: 8,
    },

    itemImage: {
        width: 110,
        height: 110,
        borderRadius: 14,
        marginBottom: 8,
    },
    itemName: {
        fontSize: 14,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
        textAlign: 'center',
    },
});

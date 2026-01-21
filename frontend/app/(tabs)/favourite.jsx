import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const FavoriteScreen = () => {

    const favoriteItems = [];

    return (
        <SafeAreaView style={StyleSheet.container}>
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
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text>{item.name}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
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
        paddingBottom: 10.
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
        MmarginBottom: 20,
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
});
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from "../../store/authStore";

const HomeScreen = () => {
    const { user } = useAuthStore();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome to SellyBloom</Text>
                <Text style={styles.subtitle}>Hello, {user?.name}!🌸</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Featured Flowers</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFBF5',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
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
        marginBottom: 32,

    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontFamily: 'Lato_700Bold',
        color: '#81827C',
        marginBottom: 16,
    },
});


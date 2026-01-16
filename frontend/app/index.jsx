import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
// import { useMemo } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { router } from 'expo-router';


const { width } = Dimensions.get("window");
const images = [

    require("../assets/images/gold.png"),
    require("../assets/images/green.png"),
    require("../assets/images/flowers.png"),
];



const OnboardingScreen = () => {

    const handleGetStarted = () => {
        router.push('/(auth)/AuthSelection');
    };
    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.swiperContainer}>
                <Swiper
                    loop={false}
                    showsPagination={true}
                    paginationStyle={{ bottom: -60 }}
                    activeDotColor="#4A4B46"
                    STYLE={{ width: "100%" }}
                >
                    {images.map((img, index) => (
                        <Image key={index} source={img} style={styles.swiperImage} />
                    ))}
                </Swiper>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>welcome to SellyBloom</Text>
                <Text style={styles.subtitle}>Where every flower tells a story</Text>
                <Text style={styles.description}>
                    Discover the freshest blooms, handcrafted arrangements, and perfect gift for every occasion.
                </Text>
            </View>

            <TouchableOpacity
                onPress={handleGetStarted}
                style={styles.button}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </SafeAreaView>

    );

};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffffff',
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    swiperContainer: {
        width: "100%",
        height: width * 0.7,
        marginBottom: 20,
    },
    swiperImage: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
    content: {
        alignItems: 'center',
        paddingTop: 20,
    },


    title: {
        fontSize: 32,
        fontFamily: 'Cookie_400Regular',
        color: '#81827C',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontFamily: 'Lato_700Bold',
        fontSize: 18,
        fontWeight: '500',
        color: '#D9C0B3',
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 0.2,
    },
    description: {
        fontFamily: 'Cookie_400Regular',
        fontSize: 30,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 40,
        marginBottom: 36,
    },

    button: {
        width: "100%",
        // backgroundColor: 'transparent',
        backgroundColor: '#4A4B46',
        paddingVertical: 14,
        // paddingHorizontal: 40,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1,
        borderRadius: 25,
    },
    buttonText: {
        color: '#FAFBF5',
        fontSize: 16,
        fontFamily: 'Lato_700Bold',
        letterSpacing: 0.5,
    }
});
import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";

export default function HomeScreen() {
    const { user } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.welcomeSection}>
                    <Text style={styles.title}>Welcome!</Text>
                    <Text style={styles.subtitle}>
                        {user?.email
                            ? `Logged in as: ${user.email}`
                            : "You are logged in"}
                    </Text>
                </View>

                <View style={styles.cardContainer}>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Recent Activity</Text>
                        <Text style={styles.cardText}>
                            Your recent app activities will appear here
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Quick Actions</Text>
                        <Text style={styles.cardText}>
                            Frequently used features will appear here
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Notifications</Text>
                        <Text style={styles.cardText}>
                            You have no new notifications
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
    },
    welcomeSection: {
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
    },
    cardContainer: {
        marginBottom: 30,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    cardText: {
        fontSize: 14,
        color: "#666",
    },
});

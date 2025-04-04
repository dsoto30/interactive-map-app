import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { useAuth } from "@/contexts/AuthContext";

export default function MapScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapContainer}>
                <Text style={styles.placeholderText}>Map View</Text>
                <Text style={styles.subtitleText}>
                    Your map implementation will go here
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    mapContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e1e1e1",
    },
    placeholderText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#555",
    },
    subtitleText: {
        fontSize: 16,
        color: "#777",
        marginTop: 8,
    },
});

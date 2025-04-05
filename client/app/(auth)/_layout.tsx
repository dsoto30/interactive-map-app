import { Stack } from "expo-router";
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function AuthLayout() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        // Delay until layout is ready (simulate data fetch or setup)
        const timeout = setTimeout(() => {
            setIsReady(true);
        }, 300); // small delay to cover layout hydration

        return () => clearTimeout(timeout);
    }, []);

    if (!isReady) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}

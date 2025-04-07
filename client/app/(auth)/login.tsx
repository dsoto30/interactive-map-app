// app/(auth)/login.tsx
import React from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Link, useRouter, Stack } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    email: z.string().email("Invalid email format!"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormTypes = z.infer<typeof schema>;

export default function LoginScreen() {
    const { login, isLoading, error } = useAuth();
    const router = useRouter();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormTypes>({
        resolver: zodResolver(schema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit: SubmitHandler<FormTypes> = async (data) => {
        try {
            await login(data.email, data.password);
            router.replace("/");
        } catch (err) {
            // Error is already handled in the useAuth context
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.keyboardView}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <StatusBar style="auto" />

                        <View style={styles.logoContainer}>
                            <Text style={styles.logoText}>Map Event</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <Text style={styles.title}>Welcome!</Text>
                            <Text style={styles.subtitle}>
                                Sign in to continue
                            </Text>

                            {error && (
                                <Text style={styles.errorText}>{error}</Text>
                            )}

                            <Controller
                                control={control}
                                name="email"
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <>
                                        <TextInput
                                            style={[
                                                styles.input,
                                                errors.email
                                                    ? styles.inputError
                                                    : null,
                                            ]}
                                            placeholder="Email"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            editable={!isLoading}
                                        />
                                        {errors.email && (
                                            <Text style={styles.errorText}>
                                                {errors.email.message}
                                            </Text>
                                        )}
                                    </>
                                )}
                            />

                            <Controller
                                control={control}
                                name="password"
                                render={({
                                    field: { onChange, onBlur, value },
                                }) => (
                                    <>
                                        <TextInput
                                            style={[
                                                styles.input,
                                                errors.password
                                                    ? styles.inputError
                                                    : null,
                                            ]}
                                            placeholder="Password"
                                            secureTextEntry
                                            onChangeText={onChange}
                                            onBlur={onBlur}
                                            value={value}
                                            editable={!isLoading}
                                        />
                                        {errors.password && (
                                            <Text style={styles.errorText}>
                                                {errors.password.message}
                                            </Text>
                                        )}
                                    </>
                                )}
                            />

                            <TouchableOpacity
                                style={[
                                    styles.button,
                                    isLoading ? styles.buttonDisabled : null,
                                ]}
                                onPress={handleSubmit(onSubmit)}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <ActivityIndicator
                                        color="#fff"
                                        size="small"
                                    />
                                ) : (
                                    <Text style={styles.buttonText}>
                                        Sign In
                                    </Text>
                                )}
                            </TouchableOpacity>

                            <View style={styles.linkContainer}>
                                <Text style={styles.linkText}>
                                    Don't have an account?{" "}
                                </Text>
                                <Link href="/register" asChild>
                                    <TouchableOpacity disabled={isLoading}>
                                        <Text style={styles.link}>Sign Up</Text>
                                    </TouchableOpacity>
                                </Link>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 40,
    },
    logoText: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#007bff",
    },
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#666",
        marginBottom: 24,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 8,
        paddingHorizontal: 12,
        backgroundColor: "#f9f9f9",
    },
    inputError: {
        borderColor: "#ff3b30",
    },
    button: {
        backgroundColor: "#007bff",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 16,
    },
    buttonDisabled: {
        backgroundColor: "#8eb8ee",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    forgotPasswordContainer: {
        alignItems: "center",
        marginTop: 15,
        marginBottom: 10,
    },
    forgotPasswordText: {
        color: "#007bff",
        fontSize: 14,
    },
    linkContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    linkText: {
        color: "#666",
    },
    link: {
        color: "#007bff",
        fontWeight: "600",
    },
    errorText: {
        color: "#ff3b30",
        fontSize: 12,
        marginBottom: 10,
    },
});

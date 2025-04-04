// app/(auth)/register.tsx
import React, { useState } from "react";
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
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validationError, setValidationError] = useState("");
    const { register, isLoading, error } = useAuth();
    const router = useRouter();

    const validateInputs = () => {
        // Reset any previous validation errors
        setValidationError("");

        // Check for empty fields
        if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
            setValidationError("Please fill in all fields");
            return false;
        }

        // Email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setValidationError("Please enter a valid email address");
            return false;
        }

        // Check password length
        if (password.length < 6) {
            setValidationError("Password must be at least 6 characters");
            return false;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setValidationError("Passwords do not match");
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        if (!validateInputs()) {
            return;
        }

        // Submit registration
        await register(email, password);

        router.replace("/");
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <StatusBar style="auto" />

                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Create Account</Text>
                        <Text style={styles.headerSubtitle}>
                            Sign up to get started
                        </Text>
                    </View>

                    <View style={styles.formContainer}>
                        {/* Show validation errors or server errors */}
                        {validationError ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>
                                    {validationError}
                                </Text>
                            </View>
                        ) : error ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{error}</Text>
                            </View>
                        ) : null}

                        {/* Email field */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Your email address"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                editable={!isLoading}
                            />
                        </View>

                        {/* Password field */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Create a password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                editable={!isLoading}
                            />
                        </View>

                        {/* Confirm password field */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>
                                Confirm Password
                            </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                                editable={!isLoading}
                            />
                        </View>

                        {/* Register button */}
                        <TouchableOpacity
                            style={[
                                styles.button,
                                isLoading ? styles.buttonDisabled : null,
                            ]}
                            onPress={handleRegister}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>
                                    Create Account
                                </Text>
                            )}
                        </TouchableOpacity>

                        {/* Login link */}
                        <View style={styles.linkContainer}>
                            <Text style={styles.linkText}>
                                Already have an account?{" "}
                            </Text>
                            <Link href="/login" asChild>
                                <TouchableOpacity>
                                    <Text style={styles.link}>Sign In</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>

                    {/* Terms and privacy text */}
                    <View style={styles.termsContainer}>
                        <Text style={styles.termsText}>
                            By creating an account, you agree to our{" "}
                            <Text style={styles.termsLink}>
                                Terms of Service
                            </Text>{" "}
                            and{" "}
                            <Text style={styles.termsLink}>Privacy Policy</Text>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 24,
    },
    headerContainer: {
        marginBottom: 32,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1a1a1a",
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: "#6c757d",
    },
    formContainer: {
        backgroundColor: "#ffffff",
        borderRadius: 12,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 2,
        marginBottom: 24,
    },
    errorContainer: {
        backgroundColor: "#ffebee",
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    errorText: {
        color: "#d32f2f",
        fontSize: 14,
    },
    inputContainer: {
        marginBottom: 16,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: "500",
        marginBottom: 8,
        color: "#495057",
    },
    input: {
        height: 52,
        borderWidth: 1,
        borderColor: "#ced4da",
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    button: {
        backgroundColor: "#007bff",
        height: 52,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },
    buttonDisabled: {
        backgroundColor: "#b3d7ff",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    linkContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
    },
    linkText: {
        color: "#6c757d",
        fontSize: 15,
    },
    link: {
        color: "#007bff",
        fontWeight: "600",
        fontSize: 15,
    },
    termsContainer: {
        marginTop: 8,
        alignItems: "center",
    },
    termsText: {
        fontSize: 12,
        color: "#6c757d",
        textAlign: "center",
        lineHeight: 18,
    },
    termsLink: {
        color: "#007bff",
    },
});

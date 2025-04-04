import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { updateEmail, updateProfile } from "firebase/auth";

export default function ProfileScreen() {
    const { user, logout } = useAuth();

    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdateProfile = async () => {
        if (!user) return;

        setIsUpdating(true);

        try {
            if (displayName !== user.displayName) {
                await updateProfile(user, { displayName });
            }

            if (email !== user.email) {
                await updateEmail(user, email);
            }

            Alert.alert("Success", "Profile updated successfully");
        } catch (error: any) {
            console.error("Profile update error:", error);
            Alert.alert("Error", error.message || "Failed to update profile");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarText}>
                            {displayName
                                ? displayName.charAt(0).toUpperCase()
                                : email?.charAt(0).toUpperCase()}
                        </Text>
                    </View>
                    <Text style={styles.emailText}>{user?.email}</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.sectionTitle}>
                        Personal Information
                    </Text>

                    <Text style={styles.inputLabel}>Display Name</Text>
                    <TextInput
                        style={styles.input}
                        value={displayName}
                        onChangeText={setDisplayName}
                        placeholder="Enter your name"
                        editable={!isUpdating}
                    />

                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!isUpdating}
                    />

                    <TouchableOpacity
                        style={[
                            styles.updateButton,
                            isUpdating ? styles.buttonDisabled : null,
                        ]}
                        onPress={handleUpdateProfile}
                        disabled={isUpdating}
                    >
                        {isUpdating ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.updateButtonText}>
                                Update Profile
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.securitySection}>
                    <Text style={styles.sectionTitle}>Security</Text>

                    <TouchableOpacity style={styles.securityButton}>
                        <Text style={styles.securityButtonText}>
                            Change Password
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={logout}
                    >
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
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
    profileHeader: {
        alignItems: "center",
        marginBottom: 30,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#007bff",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    avatarText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#fff",
    },
    emailText: {
        fontSize: 16,
        color: "#666",
    },
    formContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 14,
        marginBottom: 5,
        color: "#555",
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
        backgroundColor: "#f9f9f9",
    },
    updateButton: {
        backgroundColor: "#007bff",
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },
    buttonDisabled: {
        backgroundColor: "#8eb8ee",
    },
    updateButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    securitySection: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    securityButton: {
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
        marginBottom: 15,
    },
    securityButtonText: {
        color: "#333",
        fontSize: 16,
        fontWeight: "500",
    },
    logoutButton: {
        backgroundColor: "#ff3b30",
        borderRadius: 8,
        padding: 15,
        alignItems: "center",
    },
    logoutButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});

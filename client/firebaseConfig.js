import { initializeApp } from "firebase/app";
import {
    getAuth,
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Dynamic appId based on platform
let appId = "";
if (Platform.OS === "web") {
    appId = process.env.EXPO_PUBLIC_FIREBASE_WEB_APP_ID ?? "";
} else if (Platform.OS === "android") {
    appId = process.env.EXPO_PUBLIC_FIREBASE_ANDROID_APP_ID ?? "";
} else {
    throw new Error(
        `Unsupported platform: ${Platform.OS}. Please ensure your platform is supported.`
    );
}
console.log(process.env.EXPO_PUBLIC_FIREBASE_API_KEY);
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? "",
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? "",
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
    messagingSenderId:
        process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
    appId,
};

const app = initializeApp(firebaseConfig);

let auth;
if (Platform.OS === "web") {
    auth = getAuth(app); // ✅ For web
} else {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage), // ✅ For mobile
    });
}

export { auth };

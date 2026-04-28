import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function NavBar() {
    return (
        <View className="w-full flex-row items-center justify-between px-4 pt-2 pb-1">
            {/* Left: Avatar + Greeting */}
            <View className="flex-row items-center gap-3">
                <Image
                    source={require("@/assets/images/icon.png")}
                    className="w-11 h-11 rounded-full"
                />
                <View>
                    <Text className="text-sm text-gray-400 font-medium">Good Morning,</Text>
                    <Text className="text-xl font-bold text-gray-900">Alex Chen</Text>
                </View>
            </View>

            {/* Right: Notification Bell */}
            <TouchableOpacity className="w-10 h-10 rounded-full bg-white shadow-sm items-center justify-center"
                style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 3 }}>
                <Ionicons name="notifications-outline" size={22} color="#111827" />
            </TouchableOpacity>
        </View>
    );
}

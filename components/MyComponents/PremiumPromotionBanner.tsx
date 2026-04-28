import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PremiumPromotionBanner() {
    return (
        <View
            className="mx-4 rounded-2xl overflow-hidden p-5 flex-row items-center justify-between"
            style={{ backgroundColor: '#7C3AED', minHeight: 90 }}>

            {/* Left Content */}
            <View className="flex-1">
                <View className="flex-row items-center mb-2">
                    <View className="bg-yellow-400 rounded px-2 py-0.5 mr-2">
                        <Text className="text-yellow-900 text-xs font-bold tracking-wide">PRO</Text>
                    </View>
                </View>
                <Text className="text-white text-xl font-bold leading-tight">
                    Upgrade to{"\n"}Vibrant Premium
                </Text>
            </View>

            {/* Right: Gold coin image (decorative) */}
            <View
                className="w-20 h-20 rounded-full items-center justify-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                <Text style={{ fontSize: 40 }}>🪙</Text>
            </View>
        </View>
    );
}
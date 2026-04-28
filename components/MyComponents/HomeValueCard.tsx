import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeValueCard() {
    const [hidden, setHidden] = useState(false);
    const totalBudget = 60.0;
    const usedBudget = 42.5;
    const progressPercent = (usedBudget / totalBudget) * 100;

    return (
        <View
            className="mx-4 rounded-2xl p-5 overflow-hidden"
            style={{ backgroundColor: '#16a34a' }}>

            {/* Decorative circle backgrounds */}
            <View
                style={{
                    position: 'absolute', width: 180, height: 180,
                    borderRadius: 90, backgroundColor: 'rgba(255,255,255,0.06)',
                    top: -30, right: -30,
                }}
            />
            <View
                style={{
                    position: 'absolute', width: 120, height: 120,
                    borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.05)',
                    bottom: 10, right: 60,
                }}
            />

            {/* Header Row */}
            <View className="flex-row justify-between items-center mb-3">
                <Text className="text-white text-base font-medium opacity-90">Total Balance</Text>
                <TouchableOpacity
                    onPress={() => setHidden(!hidden)}
                    className="flex-row items-center gap-1 bg-green-700 px-3 py-1 rounded-full">
                    <Ionicons name={hidden ? "eye-off-outline" : "eye-outline"} size={14} color="white" />
                    <Text className="text-white text-xs font-medium ml-1">{hidden ? "Show" : "Hide"}</Text>
                </TouchableOpacity>
            </View>

            {/* Balance Amount */}
            <Text className="text-white text-4xl font-bold tracking-tight mb-5">
                {hidden ? "••••••" : "$12,450.00"}
            </Text>

            {/* Daily Budget Card */}
            <View className="rounded-xl p-4" style={{ backgroundColor: 'rgba(0,0,0,0.18)' }}>
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-white text-sm font-semibold">Daily Budget</Text>
                    <Text className="text-white text-sm font-semibold">
                        ${usedBudget.toFixed(2)} / ${totalBudget.toFixed(2)}
                    </Text>
                </View>

                {/* Progress Bar */}
                <View className="w-full h-2 rounded-full mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    <View
                        style={{
                            height: '100%',
                            width: `${progressPercent}%`,
                            backgroundColor: '#f97316',
                            borderRadius: 8,
                        }}
                    />
                </View>

                <View className="flex-row justify-between">
                    <Text className="text-orange-300 text-xs">70% used today</Text>
                    <Text className="text-green-200 text-xs opacity-80">Resets in 6h</Text>
                </View>
            </View>
        </View>
    );
}

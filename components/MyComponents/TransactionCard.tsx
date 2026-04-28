import React from "react";
import { Text, View } from "react-native";

interface TransactionCardProps {
    icon?: string;
    iconBg?: string;
    title: string;
    date: string;
    category: string;
    amount: string;
    isPositive?: boolean;
}

export default function TransactionCard({
    icon = "🍲",
    iconBg = "#FFF3E0",
    title = "Haidilao Hot Pot",
    date = "Today, 12:45 PM",
    category = "Dining",
    amount = "-$85.50",
    isPositive = false,
}: TransactionCardProps) {
    return (
        <View className="flex-row items-center bg-white rounded-2xl p-4 mb-3"
            style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 }}>

            {/* Icon Box */}
            <View
                className="w-20 h-20 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: iconBg }}>
                <Text style={{ fontSize: 22 }}>{icon}</Text>
            </View>

            {/* Transaction Info */}
            <View className="flex-1">
                <Text className="text-gray-900 font-semibold text-base">{title}</Text>
                <Text className="text-gray-400 text-xs mt-0.5">{date} • {category}</Text>
            </View>

            {/* Amount */}
            <Text
                className="font-bold text-base"
                style={{ color: isPositive ? '#16a34a' : '#ef4444' }}>
                {isPositive ? `+${amount}` : amount}
            </Text>
        </View>
    );
}
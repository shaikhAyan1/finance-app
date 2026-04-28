import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    Dimensions,
    FlatList,
    Modal,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface Transaction {
    id: string;
    title: string;
    description: string;
    amount: number;
    category: string;
    date: string;
    type: "expense" | "income";
    icon: string;
    iconBg: string;
    iconColor: string;
}

const TRANSACTIONS: Transaction[] = [
    {
        id: "1",
        title: "Grocery Shopping",
        description: "Weekly groceries from Mart",
        amount: -120.50,
        category: "Food",
        date: "Today, 10:45 AM",
        type: "expense",
        icon: "cart-outline",
        iconBg: "#FEF3C7",
        iconColor: "#D97706",
    },
    {
        id: "2",
        title: "Salary Deposit",
        description: "Monthly professional salary",
        amount: 4500.00,
        category: "Income",
        date: "Today, 09:00 AM",
        type: "income",
        icon: "cash-plus",
        iconBg: "#DCFCE7",
        iconColor: "#059669",
    },
    {
        id: "3",
        title: "Netflix Subscription",
        description: "Standard premium plan",
        amount: -15.99,
        category: "Entertainment",
        date: "Yesterday, 08:20 PM",
        type: "expense",
        icon: "movie-open-outline",
        iconBg: "#FCE7F3",
        iconColor: "#DB2777",
    },
    {
        id: "4",
        title: "Uber Ride",
        description: "Commute to office",
        amount: -25.00,
        category: "Transport",
        date: "Yesterday, 06:15 PM",
        type: "expense",
        icon: "car-outline",
        iconBg: "#DBEAFE",
        iconColor: "#2563EB",
    },
    {
        id: "5",
        title: "Starbucks Coffee",
        description: "Morning latte",
        amount: -5.50,
        category: "Food",
        date: "Yesterday, 10:00 AM",
        type: "expense",
        icon: "coffee-outline",
        iconBg: "#FEF3C7",
        iconColor: "#D97706",
    },
    {
        id: "6",
        title: "Dividends",
        description: "Quarterly stock payout",
        amount: 85.00,
        category: "Investment",
        date: "12 Mar, 2024",
        type: "income",
        icon: "trending-up",
        iconBg: "#F0FDF4",
        iconColor: "#22C55E",
    },
];

interface RecentTransactionProps {
    visible: boolean;
    onVisible: (val: boolean) => void;
    children: React.ReactNode;
}

export default function RecentTransaction({ visible, onVisible, children }: RecentTransactionProps) {
    const renderTransaction = ({ item }: { item: Transaction }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            className="flex-row items-center justify-between py-4 border-b border-gray-50"
        >
            <View className="flex-row items-center flex-1">
                <View
                    className="w-12 h-12 rounded-2xl items-center justify-center"
                    style={{ backgroundColor: item.iconBg }}
                >
                    <MaterialCommunityIcons name={item.icon as any} size={24} color={item.iconColor} />
                </View>
                <View className="ml-4 flex-1">
                    <Text className="text-gray-900 font-semibold text-base" numberOfLines={1}>
                        {item.title}
                    </Text>
                    <Text className="text-gray-400 text-xs mt-0.5">
                        {item.date}
                    </Text>
                </View>
            </View>
            <View className="items-end">
                <Text
                    className={`font-bold text-base ${item.type === 'income' ? 'text-green-600' : 'text-gray-900'}`}
                >
                    {item.type === 'income' ? '+' : ''}${Math.abs(item.amount).toFixed(2)}
                </Text>
                <Text className="text-gray-400 text-[10px] uppercase tracking-wider mt-0.5">
                    {item.category}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <>
            {children}
            < Modal
                animationType="slide"
                transparent
                visible={visible}
                onRequestClose={() => onVisible(false)
                }
            >
                <View className="flex-1 bg-black/40 justify-end">
                    <TouchableOpacity
                        className="flex-1"
                        activeOpacity={1}
                        onPress={() => onVisible(false)}
                    />
                    <SafeAreaView
                        className="bg-white rounded-t-[40px] px-6"
                        style={{ height: SCREEN_HEIGHT * 0.85 }}
                    >
                        <View className="w-12 h-1.5 bg-gray-200 rounded-full self-center my-4" />

                        <View className="flex-row items-center justify-between mb-6">
                            <View>
                                <Text className="text-2xl font-bold text-gray-900">Recent Activity</Text>
                                <Text className="text-gray-400 text-sm">Your latest transactions</Text>
                            </View>
                            <TouchableOpacity
                                className="bg-gray-100 p-2.5 rounded-full"
                                onPress={() => onVisible(false)}
                            >
                                <MaterialCommunityIcons name="close" size={20} color="#6B7280" />
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={TRANSACTIONS}
                            keyExtractor={(item) => item.id}
                            renderItem={renderTransaction}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 40 }}
                            ListHeaderComponent={
                                <View className="flex-row items-center mb-4 gap-x-2">
                                    <View className="bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
                                        <Text className="text-blue-600 font-medium text-xs">All Activity</Text>
                                    </View>
                                    <View className="bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                                        <Text className="text-gray-500 font-medium text-xs">Expenses</Text>
                                    </View>
                                    <View className="bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                                        <Text className="text-gray-500 font-medium text-xs">Income</Text>
                                    </View>
                                </View>
                            }
                        />
                    </SafeAreaView>
                </View>
            </Modal >
        </>
    );
}

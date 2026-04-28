import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Data ─────────────────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
    { id: '1', label: 'Top Up', icon: 'add-circle-outline', isMC: false },
    { id: '2', label: 'Transfer', icon: 'swap-horizontal', isMC: true },
    { id: '3', label: 'Limits', icon: 'speedometer-outline', isMC: false },
    { id: '4', label: 'More', icon: 'ellipsis-horizontal', isMC: false },
];

const SHARED_AVATARS = ['👩', '👨', '👦'];

const TRANSACTIONS = [
    { id: '1', group: 'TODAY', icon: '🍜', iconBg: '#FFF3E0', title: 'Noodle House', sub: 'Lunch • 12:33 PM', amount: '-$12.50', isPositive: false },
    { id: '2', group: 'TODAY', icon: '🚗', iconBg: '#E3F2FD', title: 'Grab Ride', sub: 'Transport • 09:16 AM', amount: '-$8.20', isPositive: false },
    { id: '3', group: 'TODAY', icon: '🔄', iconBg: '#E8F5E9', title: 'Weekly Auto-Topup', sub: 'From BakDuoCode', amount: '+$500.00', isPositive: true },
    { id: '4', group: 'YESTERDAY', icon: '🛍️', iconBg: '#FFFDE7', title: 'Uniqlo Store', sub: 'Shopping • 5:44 PM', amount: '-$45.90', isPositive: false },
    { id: '5', group: 'YESTERDAY', icon: '📺', iconBg: '#F3E5F5', title: 'Netflix Subscription', sub: 'Entertainment • Auto pay', amount: '-$14.99', isPositive: false },
];

// ─── Credit Card ──────────────────────────────────────────────────────────────
function CreditCard() {
    return (
        <View
            className="rounded-2xl p-5 overflow-hidden"
            style={{
                backgroundColor: '#7C3AED', minHeight: 180,
                shadowColor: '#7C3AED', shadowOpacity: 0.4, shadowRadius: 16,
                shadowOffset: { width: 0, height: 8 }, elevation: 10
            }}>

            {/* Decorative circles */}
            <View style={{
                position: 'absolute', width: 200, height: 200, borderRadius: 100,
                backgroundColor: 'rgba(255,255,255,0.08)', top: -60, right: -50
            }} />
            <View style={{
                position: 'absolute', width: 130, height: 130, borderRadius: 65,
                backgroundColor: 'rgba(255,255,255,0.06)', bottom: -40, left: -30
            }} />

            {/* Top row */}
            <View className="flex-row justify-between items-center mb-3">
                <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '600', letterSpacing: 1.2 }}>
                    TOTAL BALANCE
                </Text>
                <View className="w-8 h-8 rounded-full items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                    <Ionicons name="wifi-outline" size={16} color="rgba(255,255,255,0.8)" />
                </View>
            </View>

            {/* Balance */}
            <Text className="text-white text-4xl font-extrabold tracking-tight mb-5">$850.50</Text>

            {/* Card number row */}
            <View className="flex-row items-center mb-4 gap-3">
                <View className="w-8 h-6 rounded" style={{ backgroundColor: '#F59E0B' }} />
                <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, letterSpacing: 2, fontWeight: '500' }}>
                    ••••  ••••  ••••  4829
                </Text>
            </View>

            {/* Footer */}
            <View className="flex-row justify-between items-center">
                <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, fontWeight: '500' }}>
                    Grocery Fund – Exp 12/25
                </Text>
                <Text className="text-white text-xl font-black italic tracking-widest">VISA</Text>
            </View>
        </View>
    );
}

// ─── Transaction Row ──────────────────────────────────────────────────────────
function TxRow({ tx }: { tx: typeof TRANSACTIONS[0] }) {
    return (
        <View className="flex-row items-center bg-white rounded-2xl p-3 mb-3"
            style={{ shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 }}>
            <View className="w-20 h-20 rounded-xl items-center justify-center mr-3"
                style={{ backgroundColor: tx.iconBg }}>
                <Text style={{ fontSize: 20 }}>{tx.icon}</Text>
            </View>
            <View className="flex-1">
                <Text className="text-gray-900 text-base font-semibold">{tx.title}</Text>
                <Text className="text-gray-400 text-sm mt-0.5">{tx.sub}</Text>
            </View>
            <Text className="text-base font-bold"
                style={{ color: tx.isPositive ? '#16a34a' : '#ef4444' }}>
                {tx.amount}
            </Text>
        </View>
    );
}

// ─── Wallet Screen ────────────────────────────────────────────────────────────
export default function WalletScreen() {
    const router = useRouter();
    const today = TRANSACTIONS.filter(t => t.group === 'TODAY');
    const yesterday = TRANSACTIONS.filter(t => t.group === 'YESTERDAY');

    return (
        <SafeAreaView className="flex-1 bg-gray-50">

            {/* ── Header ── */}
            <View className="flex-row items-center justify-between px-5 py-3">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="w-10 h-10 rounded-full bg-white items-center justify-center"
                    style={{ shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 4, elevation: 2 }}>
                    <Ionicons name="arrow-back" size={20} color="#111827" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900">Family Wallet</Text>
                <TouchableOpacity>
                    <Text className="text-sm font-bold" style={{ color: '#7C3AED' }}>Manage</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                {/* ── Credit Card ── */}
                <View className="px-5 mt-2">


                    <CreditCard />


                    {/* Dot pagination */}
                    {/* <View className="flex-row justify-center mt-3 gap-1.5">
                        <View className="h-2 rounded-full" style={{ width: 20, backgroundColor: '#7C3AED' }} />
                        <View className="w-2 h-2 rounded-full bg-gray-300" />
                        <View className="w-2 h-2 rounded-full bg-gray-300" />
                    </View> */}
                </View>

                {/* ── Quick Actions ── */}
                <View className="mx-5 mt-4 bg-white rounded-2xl px-4 py-4 flex-row justify-around"
                    style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 }}>
                    {QUICK_ACTIONS.map(a => (
                        <TouchableOpacity key={a.id} className="items-center gap-1.5">
                            <View className="w-12 h-12 rounded-2xl items-center justify-center"
                                style={{ backgroundColor: '#F3E8FF' }}>
                                {a.isMC
                                    ? <MaterialCommunityIcons name={a.icon as any} size={22} color="#7C3AED" />
                                    : <Ionicons name={a.icon as any} size={22} color="#7C3AED" />
                                }
                            </View>
                            <Text className="text-xs font-semibold text-gray-700">{a.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* ── Shared With ── */}
                <View className="px-5 mt-5">
                    <Text className="text-xs font-bold text-gray-400 tracking-widest mb-2.5">SHARED WITH</Text>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            {SHARED_AVATARS.map((av, i) => (
                                <View key={i}
                                    className="w-10 h-10 rounded-full bg-gray-200 items-center justify-center border-2 border-white"
                                    style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 10 - i }}>
                                    <Text style={{ fontSize: 18 }}>{av}</Text>
                                </View>
                            ))}
                            <TouchableOpacity
                                className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center border-2 border-white"
                                style={{ marginLeft: -10 }}>
                                <Ionicons name="person-add-outline" size={15} color="#6B7280" />
                            </TouchableOpacity>
                        </View>
                        <Text className="text-xs font-semibold text-gray-500">Next limit reset: Mon</Text>
                    </View>
                </View>

                {/* ── Divider ── */}
                <View className="h-px bg-gray-100 mt-5" />

                {/* ── Recent Activity ── */}
                <View className="px-5 pt-4">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-lg font-bold text-gray-900">Recent Activity</Text>
                        <TouchableOpacity>
                            <Text className="text-sm font-bold" style={{ color: '#7C3AED' }}>See All</Text>
                        </TouchableOpacity>


                    </View>

                    {/* TODAY */}
                    <Text className="text-xs font-bold text-gray-400 tracking-widest mb-2">TODAY</Text>
                    {today.map(tx => <TxRow key={tx.id} tx={tx} />)}

                    {/* YESTERDAY */}
                    <Text className="text-xs font-bold text-gray-400 tracking-widest mb-2 mt-3">YESTERDAY</Text>
                    {yesterday.map(tx => <TxRow key={tx.id} tx={tx} />)}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

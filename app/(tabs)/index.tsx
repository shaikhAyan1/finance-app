import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CommonTopup from '@/components/Models/CommonTopupAdd';
import HomeValueCard from '@/components/MyComponents/HomeValueCard';
import NavBar from '@/components/MyComponents/NavBar';
import PremiumPromotionBanner from '@/components/MyComponents/PremiumPromotionBanner';
import TransactionCard from '@/components/MyComponents/TransactionCard';
import RecentTransaction from '@/components/halfscreen/RecentTransaction';

// ─── Quick Action data ────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { id: '5', label: 'Ride', icon: 'car', bg: '#E3F2FD', color: '#2563EB', lib: 'mc' },
  { id: '6', label: 'Food', icon: 'silverware-fork-knife', bg: '#FFF3E0', color: '#F97316', lib: 'mc' },
  { id: '7', label: 'Family', icon: 'account-group', bg: '#FCE4EC', color: '#e11d48', lib: 'mc' },
  { id: '8', label: 'More', icon: 'apps', bg: '#E8F5E9', color: '#16a34a', lib: 'mc' },
];

// ─── Recent Transaction data ──────────────────────────────────────────────────
const TRANSACTIONS = [
  {
    id: '1',
    icon: '🍲',
    iconBg: '#FFF3E0',
    title: 'Haidilao Hot Pot',
    date: 'Today, 12:45 PM',
    category: 'Dining',
    amount: '-$85.50',
    isPositive: false,
  },
  {
    id: '2',
    icon: '💼',
    iconBg: '#E8F5E9',
    title: 'Freelance Payment',
    date: 'Yesterday, 4:00 PM',
    category: 'Salary',
    amount: '$450.00',
    isPositive: true,
  },
  {
    id: '3',
    icon: '🚗',
    iconBg: '#E3F2FD',
    title: 'Grab Ride',
    date: 'Yesterday, 9:30 AM',
    category: 'Transport',
    amount: '-$12.20',
    isPositive: false,
  },
  {
    id: '4',
    icon: '📺',
    iconBg: '#F3E5F5',
    title: 'Netflix Subscription',
    date: 'Oct 24',
    category: 'Entertainment',
    amount: '-$14.99',
    isPositive: false,
  },
  {
    id: '5',
    icon: '🛍️',
    iconBg: '#FFFDE7',
    title: 'Uniqlo Store',
    date: 'Oct 22',
    category: 'Shopping',
    amount: '-$65.00',
    isPositive: false,
  },
];

// ─── Quick Action Button ──────────────────────────────────────────────────────
function ActionButton({ label, icon, bg, color, onPress }: { label: string; icon: string; bg: string; color: string; onPress?: () => void }) {
  return (
    <TouchableOpacity className="items-center" style={{ width: '22%' }} onPress={onPress}>
      <View
        className="w-14 h-14 rounded-2xl items-center justify-center mb-1"
        style={{ backgroundColor: bg }}>
        <MaterialCommunityIcons name={icon as any} size={26} color={color} />
      </View>
      <Text className="text-gray-600 text-xs font-medium">{label}</Text>
    </TouchableOpacity>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
export default function HomeScreen() {

  const [isTopupVisible, setIsTopupVisible] = useState(false);
  const [transactionVisible, setTransactionVisible] = useState(false);
  const [billsVisible, setBillsVisible] = useState(false);
  const [rideVisible, setRideVisible] = useState(false);
  const [foodVisible, setFoodVisible] = useState(false);
  const [familyVisible, setFamilyVisible] = useState(false);
  const [recentTransactionVisible, setRecentTransactionVisible] = useState(false);

  function handleTopup() {
    console.log("Topup Pressed");
    setIsTopupVisible(true);
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}>

        {/* ── Top Nav ── */}
        <NavBar />

        {/* ── Balance Card ── */}
        <View className="mt-4">
          <HomeValueCard />
        </View>

        {/* ── Quick Actions ── */}
        <View className="mt-6 px-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-900 text-lg font-bold">Quick Actions</Text>
            {/* <TouchableOpacity>
              <Text className="text-green-600 text-sm font-semibold">Edit</Text>
            </TouchableOpacity> */}
          </View>



          {/* Row 1 */}
          <View className="flex-row justify-between mb-4">

            <ActionButton key={"1"} label={"Scan"} icon={"qrcode-scan"} bg={"#FFF3E0"} color={"#F97316"} />

            <CommonTopup visible={isTopupVisible} onVisible={setIsTopupVisible}>
              <ActionButton key={"2"} label={"Top Up"} icon={"card-plus"} bg={"#E8F5E9"} color={"#16a34a"} onPress={handleTopup} />
            </CommonTopup>
            <CommonTopup visible={transactionVisible} onVisible={setTransactionVisible}>
              <ActionButton key={"3"} label={"Transfer"} icon={"swap-horizontal"} bg={"#E3F2FD"} color={"#2563EB"} onPress={() => setTransactionVisible(true)} />
            </CommonTopup>

            <CommonTopup visible={billsVisible} onVisible={setBillsVisible}>
              <ActionButton key={"4"} label={"Bills"} icon={"file-document"} bg={"#F3E5F5"} color={"#9333ea"} onPress={() => setBillsVisible(true)} />
            </CommonTopup>


          </View>

          {/* Row 2 */}
          <View className="flex-row justify-between">
            <CommonTopup visible={rideVisible} onVisible={setRideVisible}>
              <ActionButton key={"2"} label={"Ride"} icon={"car"} bg={"#E3F2FD"} color={"#2563EB"} onPress={() => setRideVisible(true)} />
            </CommonTopup>
            <CommonTopup visible={foodVisible} onVisible={setFoodVisible}>
              <ActionButton key={"3"} label={"Food"} icon={"silverware-fork-knife"} bg={"#FFF3E0"} color={"#F97316"} onPress={() => setFoodVisible(true)} />
            </CommonTopup>
            <CommonTopup visible={familyVisible} onVisible={setFamilyVisible}>
              <ActionButton key={"4"} label={"Family"} icon={"account-group"} bg={"#FCE4EC"} color={"#e11d48"} onPress={() => setFamilyVisible(true)} />
            </CommonTopup>
            <ActionButton key={"4"} label={"More"} icon={"apps"} bg={"#E8F5E9"} color={"#16a34a"} />
          </View>
        </View>

        {/* ── Premium Banner ── */}
        <View className="mt-6">
          <PremiumPromotionBanner />
        </View>

        {/* ── Recent Transactions ── */}
        <View className="mt-6 px-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-gray-900 text-lg font-bold">Recent Transactions</Text>

            <RecentTransaction visible={recentTransactionVisible} onVisible={setRecentTransactionVisible}>
              <TouchableOpacity onPress={() => setRecentTransactionVisible(true)}>
                <Text className="text-green-600 text-sm font-semibold">See All</Text>
              </TouchableOpacity>
            </RecentTransaction>


          </View>

          {TRANSACTIONS.map(tx => (
            <TransactionCard
              key={tx.id}
              icon={tx.icon}
              iconBg={tx.iconBg}
              title={tx.title}
              date={tx.date}
              category={tx.category}
              amount={tx.amount}
              isPositive={tx.isPositive}
            />
          ))}
        </View>

      </ScrollView>


    </SafeAreaView>
  );
}

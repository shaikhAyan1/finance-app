import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AddModel from '@/components/MyComponents/AddModel';

// ─── Custom Tab Bar ──────────────────────────────────────────────────────────
function CustomTabBar({ state, descriptors, navigation }: any) {
  const tabs = state.routes;

  const [visible, setVisible] = useState(false);

  const renderTab = (route: any, index: number) => {
    const { options } = descriptors[route.key];
    const label = options.title ?? route.name;
    const isFocused = state.index === index;
    const color = isFocused ? '#16a34a' : '#9CA3AF';

    const iconMap: Record<string, any> = {
      index: isFocused ? 'home' : 'home-outline',
      wallet: isFocused ? 'wallet' : 'wallet-outline',
      budget: isFocused ? 'pie-chart' : 'pie-chart-outline',
      explore: isFocused ? 'person' : 'person-outline',
    };

    const onPress = () => {
      const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    return (
      <TouchableOpacity
        key={route.key}
        onPress={onPress}
        style={styles.tabItem}
        activeOpacity={0.7}>
        <Ionicons name={iconMap[route.name] ?? 'ellipse-outline'} size={24} color={color} />
        <Text style={[styles.tabLabel, { color }]}>{label}</Text>
      </TouchableOpacity>
    );
  };

  const leftTabs = tabs.slice(0, 2);   // Home, Wallet
  const rightTabs = tabs.slice(2, 4);  // Budget, Profile

  function showModel() {
    setVisible(true)
  }


  return (
    <View style={styles.container}>
      {/* Left tabs */}
      <View style={styles.side}>
        {leftTabs.map((route: any, i: number) => renderTab(route, i))}
      </View>

      {/* Center FAB */}
      <TouchableOpacity style={styles.fabWrapper} onPress={showModel} activeOpacity={0.85}>
        <View style={styles.fab} >
          <Ionicons name="add" size={30} color="white" />
        </View>
      </TouchableOpacity>


      {/* Right tabs */}
      <View style={styles.side}>
        {rightTabs.map((route: any, i: number) => renderTab(route, i + 2))}
      </View>

      <AddModel visible={visible} onVisible={setVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    height: 70,
    paddingHorizontal: 10,
    paddingBottom: 8,
    paddingTop: 4,
  },
  side: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 3,
  },
  fabWrapper: {
    width: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -28, // lifts it above the bar
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#16a34a',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#16a34a',
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
});

// ─── Layout ──────────────────────────────────────────────────────────────────
export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="wallet" options={{ title: 'Wallet' }} />

      <Tabs.Screen name="budget" options={{ title: 'Budget' }} />
      <Tabs.Screen name="explore" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

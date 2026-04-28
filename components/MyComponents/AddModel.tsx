import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface AddModelProps {
  visible: boolean;
  onVisible: (val: boolean) => void;
}

const CATEGORIES = [
  { id: "1", title: "Food", icon: "food-fork-drink", color: "#F97316", bg: "#F97316" },
  { id: "2", title: "Transport", icon: "bus", color: "#3B82F6", bg: "#EFF6FF" },
  { id: "3", title: "Shopping", icon: "shopping", color: "#A855F7", bg: "#F5F3FF" },
  { id: "4", title: "Bills", icon: "file-document-outline", color: "#10B981", bg: "#ECFDF5" },
  { id: "5", title: "Fun", icon: "movie-open", color: "#EC4899", bg: "#FDF2F8" },
];

export default function AddModel({ visible, onVisible }: AddModelProps) {
  const [amount, setAmount] = useState("0");
  const [selectedCategory, setSelectedCategory] = useState("1");

  const handlePress = (val: string) => {
    if (val === "back") {
      setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (val === ".") {
      if (!amount.includes(".")) {
        setAmount((prev) => prev + val);
      }
    } else {
      setAmount((prev) => (prev === "0" ? val : prev + val));
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => onVisible(false)}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <SafeAreaView
          className="bg-white rounded-t-[32px] pt-3"
          style={{ height: SCREEN_HEIGHT * 0.9 }}
        >
          {/* Handle */}
          <View className="w-10 h-1 bg-gray-200 rounded self-center mb-4" />

          {/* Header */}
          <View className="flex-row justify-between items-center px-6 mb-6">
            <TouchableOpacity onPress={() => onVisible(false)}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>

            <Text className="text-lg font-bold text-gray-900">
              Add Expense
            </Text>

            <TouchableOpacity
              onPress={() => {
                setAmount("0");
                setSelectedCategory("1");
              }}
            >
              <Text className="text-emerald-500 font-semibold">Reset</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Amount */}
            <View className="items-center mb-8">
              <Text className="text-sm text-gray-400 mb-2">
                Total Amount
              </Text>

              <View className="flex-row items-center">
                <Text className="text-3xl font-bold text-gray-900 mr-1 mt-2">
                  $
                </Text>

                <Text
                  className="font-bold text-gray-900"
                  style={{
                    fontSize: SCREEN_HEIGHT > 800 ? 64 : 48,
                  }}
                >
                  {amount}
                </Text>

                <View
                  className="bg-emerald-500 ml-1"
                  style={{
                    width: 3,
                    height: SCREEN_HEIGHT > 800 ? 48 : 36,
                  }}
                />
              </View>
            </View>

            {/* Category Header */}
            <View className="flex-row justify-between px-6 mb-4">
              <Text className="text-xs font-semibold text-gray-400 tracking-widest">
                CATEGORY
              </Text>

              <TouchableOpacity>
                <Text className="text-emerald-500 text-xs font-semibold">
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            {/* Categories */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: 24, paddingBottom: 24 }}
            >
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  className="items-center mr-5"
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <View
                    className="w-16 h-16 rounded-2xl justify-center items-center mb-2"
                    style={{
                      backgroundColor:
                        selectedCategory === cat.id ? cat.bg : "#F9FAFB",
                    }}
                  >
                    <MaterialCommunityIcons
                      name={cat.icon as any}
                      size={28}
                      color={
                        selectedCategory === cat.id
                          ? cat.id === "1"
                            ? "white"
                            : cat.color
                          : "#9CA3AF"
                      }
                    />
                  </View>

                  <Text
                    className={`text-xs ${
                      selectedCategory === cat.id
                        ? "text-gray-900 font-bold"
                        : "text-gray-400"
                    }`}
                  >
                    {cat.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Date + Note */}
            <View className="flex-row px-6 mb-8 gap-3">
              <TouchableOpacity className="flex-1 flex-row items-center bg-gray-50 border border-gray-200 rounded-full py-3 px-4">
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#10B981"
                  style={{ marginRight: 8 }}
                />

                <Text className="flex-1 text-sm text-gray-900 font-medium">
                  Today, Oct 24
                </Text>

                <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 flex-row items-center bg-gray-50 border border-gray-200 rounded-full py-3 px-4">
                <MaterialCommunityIcons
                  name="playlist-edit"
                  size={20}
                  color="#9CA3AF"
                  style={{ marginRight: 8 }}
                />

                <Text className="text-sm text-gray-400">Add note...</Text>
              </TouchableOpacity>
            </View>

            {/* Keypad */}
            <View className="px-6 mb-6">
              {[
                ["1", "2", "3"],
                ["4", "5", "6"],
                ["7", "8", "9"],
                [".", "0", "back"],
              ].map((row, rowIndex) => (
                <View key={rowIndex} className="flex-row justify-between mb-4">
                  {row.map((key) => (
                    <TouchableOpacity
                      key={key}
                      className="w-[30%] h-14 justify-center items-center"
                      onPress={() => handlePress(key)}
                    >
                      {key === "back" ? (
                        <MaterialCommunityIcons
                          name="backspace-outline"
                          size={24}
                          color="#6B7280"
                        />
                      ) : (
                        <Text className="text-2xl font-semibold text-gray-900">
                          {key}
                        </Text>
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>

            {/* Track Button */}
            <TouchableOpacity
              className="bg-emerald-500 mx-6 h-14 rounded-2xl flex-row justify-center items-center mb-10"
              onPress={() => onVisible(false)}
            >
              <Text className="text-white text-lg font-bold">Track It</Text>

              <Ionicons
                name="arrow-forward"
                size={20}
                color="white"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
}
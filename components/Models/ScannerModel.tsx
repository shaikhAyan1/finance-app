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

interface ScannerModelProps {
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

export default function ScannerModel({ visible, onVisible }: ScannerModelProps) {
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

                    <View className="w-10 h-1 bg-gray-200 rounded self-center mb-4" >




                    </View  >


                </SafeAreaView>
            </View>
        </Modal>
    );
}
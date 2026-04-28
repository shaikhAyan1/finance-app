import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const FEATURES = [
    { id: '1', icon: 'people-outline', label: 'Unlimited Family Profiles' },
    { id: '2', icon: 'download-outline', label: 'One-Click Exports' },
    { id: '3', icon: 'grid-outline', label: 'Custom Categories & Icons' },
];

export default function PremiumScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#0F0A1E' }}>
            {/* Close button */}
            <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
                <Ionicons name="close" size={22} color="#fff" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

                {/* Icon */}
                <View style={styles.iconWrap}>
                    <MaterialCommunityIcons name="crown" size={42} color="#F59E0B" />
                </View>

                {/* Title */}
                <Text style={styles.title}>Upgrade to{'\n'}Vibrant <Text style={styles.titlePro}>PRO</Text></Text>
                <Text style={styles.subtitle}>
                    Unlock the full power of your family finances with premium tools designed to grow with you.
                </Text>

                {/* Features */}
                <View style={styles.featureList}>
                    {FEATURES.map(f => (
                        <View key={f.id} style={styles.featureRow}>
                            <View style={styles.featureCheck}>
                                <Ionicons name="checkmark" size={14} color="#F59E0B" />
                            </View>
                            <Ionicons name={f.icon as any} size={18} color="#fff" style={{ marginRight: 10 }} />
                            <Text style={styles.featureLabel}>{f.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Pricing */}
                <View style={styles.pricingCard}>
                    <View>
                        <Text style={styles.price}>$2.99<Text style={styles.pricePer}> /month</Text></Text>
                        <Text style={styles.priceSub}>Billed monthly · Cancel anytime</Text>
                    </View>
                    <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>POPULAR</Text>
                    </View>
                </View>

                {/* CTA */}
                <TouchableOpacity style={styles.ctaBtn}>
                    <Text style={styles.ctaText}>Start 1-Day Free Trial</Text>
                    <Ionicons name="arrow-forward" size={18} color="#111827" />
                </TouchableOpacity>

                <Text style={styles.legal}>
                    Free for 1 day, then $2.99/month. Cancel anytime before trial ends.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    closeBtn: {
        position: 'absolute', top: 54, right: 20, zIndex: 10,
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.12)',
        alignItems: 'center', justifyContent: 'center',
    },
    container: { alignItems: 'center', paddingHorizontal: 28, paddingTop: 60, paddingBottom: 40 },

    iconWrap: {
        width: 80, height: 80, borderRadius: 40,
        backgroundColor: 'rgba(245,158,11,0.15)',
        alignItems: 'center', justifyContent: 'center',
        marginBottom: 24,
        borderWidth: 1.5, borderColor: 'rgba(245,158,11,0.3)',
    },

    title: {
        fontSize: 34, fontWeight: '800', color: '#fff',
        textAlign: 'center', lineHeight: 42, marginBottom: 14,
    },
    titlePro: { color: '#F59E0B' },
    subtitle: {
        fontSize: 14, color: 'rgba(255,255,255,0.55)',
        textAlign: 'center', lineHeight: 21, marginBottom: 32,
    },

    featureList: { width: '100%', gap: 14, marginBottom: 32 },
    featureRow: { flexDirection: 'row', alignItems: 'center' },
    featureCheck: {
        width: 22, height: 22, borderRadius: 11,
        backgroundColor: 'rgba(245,158,11,0.18)',
        alignItems: 'center', justifyContent: 'center', marginRight: 10,
    },
    featureLabel: { fontSize: 15, fontWeight: '600', color: '#fff' },

    pricingCard: {
        width: '100%', backgroundColor: 'rgba(255,255,255,0.07)',
        borderRadius: 16, paddingHorizontal: 20, paddingVertical: 16,
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        borderWidth: 1, borderColor: 'rgba(245,158,11,0.25)',
        marginBottom: 20,
    },
    price: { fontSize: 28, fontWeight: '800', color: '#fff' },
    pricePer: { fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.5)' },
    priceSub: { fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 3 },
    popularBadge: {
        backgroundColor: '#F59E0B', borderRadius: 20,
        paddingHorizontal: 10, paddingVertical: 4,
    },
    popularText: { fontSize: 10, fontWeight: '800', color: '#111827', letterSpacing: 0.8 },

    ctaBtn: {
        width: '100%', backgroundColor: '#F59E0B', borderRadius: 14,
        paddingVertical: 16, flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center', gap: 8,
        shadowColor: '#F59E0B', shadowOpacity: 0.4, shadowRadius: 12, elevation: 6,
    },
    ctaText: { fontSize: 16, fontWeight: '800', color: '#111827' },

    legal: {
        fontSize: 11, color: 'rgba(255,255,255,0.3)',
        textAlign: 'center', marginTop: 16, lineHeight: 16,
    },
});

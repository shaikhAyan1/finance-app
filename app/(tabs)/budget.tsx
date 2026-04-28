import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// ─── Data ─────────────────────────────────────────────────────────────────────
const MONTHLY_LIMITS = [
    {
        id: '1', label: 'Food & Dining', icon: '🍔', iconBg: '#FFF3E0',
        spent: 458, total: 660, status: '75% Used', statusColor: '#F97316',
        barColor: '#F97316', barWidth: '75%',
    },
    {
        id: '2', label: 'Transport', icon: '🚌', iconBg: '#E3F2FD',
        spent: 128, total: 480, status: 'On track', statusColor: '#3B82F6',
        barColor: '#3B82F6', barWidth: '27%',
    },
    {
        id: '3', label: 'Shopping', icon: '🛍️', iconBg: '#FEE2E2',
        spent: 199, total: 236, status: 'Approaching Limit', statusColor: '#EF4444',
        barColor: '#EF4444', barWidth: '84%',
    },
];

// ─── Circular Score Ring ──────────────────────────────────────────────────────
function ScoreRing({ score }: { score: number }) {
    const SIZE = 80;
    const STROKE = 8;
    const R = (SIZE - STROKE) / 2;
    const CIRC = 2 * Math.PI * R;
    const progress = (score / 100) * CIRC;

    return (
        <View style={styles.scoreRingWrap}>
            {/* Fake ring using nested circles */}
            <View style={[styles.ringOuter, { width: SIZE, height: SIZE, borderRadius: SIZE / 2 }]}>
                <View style={styles.ringInner}>
                    <Text style={styles.scoreText}>{score}</Text>
                    <Text style={styles.scoreSubText}>SCORE</Text>
                </View>
            </View>
            {/* Colored arc overlay — approximated with border trick */}
            <View
                style={[
                    styles.ringArc,
                    {
                        width: SIZE,
                        height: SIZE,
                        borderRadius: SIZE / 2,
                        borderWidth: STROKE,
                        borderColor: '#22c55e',
                        borderBottomColor: 'transparent',
                        borderRightColor: 'transparent',
                        transform: [{ rotate: '-45deg' }],
                    },
                ]}
            />
        </View>
    );
}

// ─── Budget Progress Card ─────────────────────────────────────────────────────
function BudgetCard({
    icon, iconBg, label, spent, total, status, statusColor, barColor, barWidth,
}: typeof MONTHLY_LIMITS[0]) {
    return (
        <View style={styles.budgetCard}>
            <View style={styles.budgetCardTop}>
                <View style={[styles.budgetIcon, { backgroundColor: iconBg }]}>
                    <Text style={{ fontSize: 18 }}>{icon}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <View style={styles.budgetLabelRow}>
                        <Text style={styles.budgetLabel}>{label}</Text>
                        <Text style={styles.budgetAmount}>
                            <Text style={{ color: '#111827', fontWeight: '700' }}>${spent}</Text>
                            <Text style={{ color: '#9CA3AF', fontWeight: '500' }}> / ${total}</Text>
                        </Text>
                    </View>
                    <Text style={[styles.budgetStatus, { color: statusColor }]}>{status}</Text>
                </View>
            </View>
            {/* Progress bar */}
            <View style={styles.barBg}>
                <View style={[styles.barFill, { width: barWidth as any, backgroundColor: barColor }]} />
            </View>
        </View>
    );
}

// ─── Dream Pot Card ───────────────────────────────────────────────────────────
function PotCard({
    emoji, emojiBg, title, saved, goal, progress, done,
}: {
    emoji: string; emojiBg: string; title: string;
    saved: string; goal: string; progress: number; done?: boolean;
}) {
    return (
        <View style={[styles.potCard, done && { borderColor: '#F59E0B', borderWidth: 2 }]}>
            {/* Background emoji / illustration */}
            <View style={[styles.potBg, { backgroundColor: emojiBg }]}>
                <Text style={{ fontSize: 38 }}>{emoji}</Text>
            </View>

            {/* Progress badge */}
            {done ? (
                <View style={styles.doneBadge}>
                    <Ionicons name="checkmark-circle" size={12} color="#fff" />
                    <Text style={styles.doneBadgeText}> DONE!</Text>
                </View>
            ) : (
                <View style={styles.progressBadge}>
                    <Text style={styles.progressBadgeText}>{progress}%</Text>
                </View>
            )}

            {/* Info */}
            <View style={styles.potInfo}>
                <Text style={styles.potTitle}>{title}</Text>
                <Text style={styles.potAmount}>${saved} <Text style={{ color: '#9CA3AF', fontWeight: '400' }}>/ {goal}</Text></Text>

                {done && (
                    <TouchableOpacity style={styles.claimBtn}>
                        <Text style={styles.claimBtnText}>CLAIM REWARD</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function BudgetScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F9FAFB' }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                {/* ── Header ── */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>Budget & Goals</Text>
                        <Text style={styles.headerSub}>October 2023</Text>
                    </View>
                    <TouchableOpacity style={styles.editBtn}>
                        <Ionicons name="pencil" size={16} color="#7C3AED" />
                    </TouchableOpacity>
                </View>

                {/* ── Financial Health Card ── */}
                <View style={styles.healthCard}>
                    <ScoreRing score={85} />
                    <View style={styles.healthInfo}>
                        <Text style={styles.healthTitle}>Financial Health</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap', marginTop: 4 }}>
                            <MaterialCommunityIcons name="trending-up" size={14} color="#16a34a" />
                            <Text style={styles.healthDesc}>
                                {' '}<Text style={{ color: '#16a34a', fontWeight: '700' }}>Excellent!</Text> You're saving{'\n'}20% more than last month.
                            </Text>
                        </View>
                        <TouchableOpacity style={{ marginTop: 8 }}>
                            <Text style={styles.insightsLink}>View insights</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* ── Monthly Limits ── */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Monthly Limits</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {MONTHLY_LIMITS.map(item => <BudgetCard key={item.id} {...item} />)}

                    {/* Create Category */}
                    <TouchableOpacity style={styles.createCategory}>
                        <Ionicons name="add-circle-outline" size={18} color="#7C3AED" />
                        <Text style={styles.createCategoryText}>Create Category Limit</Text>
                    </TouchableOpacity>
                </View>

                {/* ── Dream Pots ── */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Dream Pots</Text>
                        <View style={styles.activeDot} />
                    </View>

                    <View style={styles.potsRow}>
                        <PotCard
                            emoji="🌴"
                            emojiBg="#0f766e"
                            title="Bali Trip"
                            saved="1,398"
                            goal="$2k"
                            progress={60}
                        />
                        <PotCard
                            emoji="💻"
                            emojiBg="#1e1b4b"
                            title="MacBook Pro"
                            saved="1,500"
                            goal="$1,500"
                            progress={100}
                            done
                        />
                    </View>

                    {/* New Goal */}
                    <TouchableOpacity style={styles.newGoalBtn}>
                        <Ionicons name="add" size={28} color="#9CA3AF" />
                        <Text style={styles.newGoalText}>New Goal</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    // Header
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8,
    },
    headerTitle: { fontSize: 22, fontWeight: '800', color: '#111827' },
    headerSub: { fontSize: 12, color: '#9CA3AF', marginTop: 2, fontWeight: '500' },
    editBtn: {
        width: 36, height: 36, borderRadius: 18,
        backgroundColor: '#F3E8FF', alignItems: 'center', justifyContent: 'center',
    },

    // Health Card
    healthCard: {
        flexDirection: 'row', alignItems: 'center',
        backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 18,
        padding: 16, marginTop: 8,
        shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
    },
    scoreRingWrap: { width: 80, height: 80, position: 'relative', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
    ringOuter: {
        backgroundColor: '#F0FDF4',
        alignItems: 'center', justifyContent: 'center', position: 'absolute',
    },
    ringInner: { alignItems: 'center', justifyContent: 'center' },
    ringArc: { position: 'absolute', backgroundColor: 'transparent' },
    scoreText: { fontSize: 22, fontWeight: '800', color: '#111827', lineHeight: 26 },
    scoreSubText: { fontSize: 9, fontWeight: '700', color: '#9CA3AF', letterSpacing: 1 },
    healthInfo: { flex: 1 },
    healthTitle: { fontSize: 15, fontWeight: '700', color: '#111827' },
    healthDesc: { fontSize: 12, color: '#6B7280', lineHeight: 17, flexShrink: 1 },
    insightsLink: { fontSize: 13, fontWeight: '700', color: '#16a34a' },

    // Section
    section: { paddingHorizontal: 20, marginTop: 24 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
    sectionTitle: { fontSize: 17, fontWeight: '700', color: '#111827' },
    seeAll: { fontSize: 13, fontWeight: '700', color: '#7C3AED' },
    activeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#16a34a' },

    // Budget Card
    budgetCard: {
        backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10,
        shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
    },
    budgetCardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    budgetIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    budgetLabelRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    budgetLabel: { fontSize: 14, fontWeight: '700', color: '#111827' },
    budgetAmount: { fontSize: 13 },
    budgetStatus: { fontSize: 11, fontWeight: '600', marginTop: 2 },
    barBg: { height: 7, backgroundColor: '#F3F4F6', borderRadius: 6, overflow: 'hidden' },
    barFill: { height: '100%', borderRadius: 6 },

    // Create Category
    createCategory: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        paddingVertical: 13, borderRadius: 12,
        borderWidth: 1.5, borderColor: '#E5E7EB', borderStyle: 'dashed',
        marginTop: 4, gap: 6,
    },
    createCategoryText: { fontSize: 13, fontWeight: '700', color: '#7C3AED' },

    // Dream Pots
    potsRow: { flexDirection: 'row', gap: 12 },
    potCard: {
        flex: 1, borderRadius: 16, overflow: 'hidden',
        backgroundColor: '#1F2937', minHeight: 160,
        shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, elevation: 4,
    },
    potBg: { height: 110, alignItems: 'center', justifyContent: 'center' },
    progressBadge: {
        position: 'absolute', top: 8, right: 8,
        backgroundColor: '#22c55e', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3,
    },
    progressBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
    doneBadge: {
        position: 'absolute', top: 8, right: 8,
        backgroundColor: '#F59E0B', borderRadius: 20,
        paddingHorizontal: 8, paddingVertical: 3,
        flexDirection: 'row', alignItems: 'center',
    },
    doneBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
    potInfo: { padding: 10, backgroundColor: '#1F2937' },
    potTitle: { fontSize: 13, fontWeight: '700', color: '#fff' },
    potAmount: { fontSize: 12, fontWeight: '700', color: '#fff', marginTop: 2 },
    claimBtn: {
        marginTop: 8, backgroundColor: '#F59E0B', borderRadius: 8,
        paddingVertical: 6, alignItems: 'center',
    },
    claimBtnText: { fontSize: 11, fontWeight: '800', color: '#fff', letterSpacing: 0.5 },

    // New Goal
    newGoalBtn: {
        marginTop: 12, height: 110, borderRadius: 16,
        borderWidth: 1.5, borderColor: '#E5E7EB', borderStyle: 'dashed',
        alignItems: 'center', justifyContent: 'center', gap: 4,
    },
    newGoalText: { fontSize: 13, fontWeight: '600', color: '#9CA3AF' },
});

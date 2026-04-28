import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// ─── Section Row ──────────────────────────────────────────────────────────────
function SettingRow({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  isToggle,
  toggleValue,
  onToggle,
  isExternal,
  isLast,
  onPress,
}: {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  value?: string;
  isToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (v: boolean) => void;
  isExternal?: boolean;
  isLast?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={isToggle ? 1 : 0.7}
      style={[styles.row, !isLast && styles.rowBorder]}>
      {/* Left icon */}
      <View style={[styles.rowIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon as any} size={17} color={iconColor} />
      </View>

      {/* Label */}
      <Text style={styles.rowLabel}>{label}</Text>

      {/* Right */}
      <View style={styles.rowRight}>
        {isToggle ? (
          <Switch
            value={toggleValue}
            onValueChange={onToggle}
            trackColor={{ false: '#D1D5DB', true: '#16a34a' }}
            thumbColor="#fff"
            style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
          />
        ) : isExternal ? (
          <Ionicons name="open-outline" size={16} color="#9CA3AF" />
        ) : (
          <>
            {value && <Text style={styles.rowValue}>{value}</Text>}
            <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

// ─── Section Block ────────────────────────────────────────────────────────────
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );
}

// ─── Profile Screen ───────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* ── Profile Card ── */}
        <View style={styles.profileCard}>
          {/* Avatar */}
          <View style={styles.avatarWrap}>
            <View style={styles.avatar}>
              <Text style={{ fontSize: 42 }}>🧑</Text>
            </View>
          </View>

          <Text style={styles.profileName}>Alex Chen</Text>
          <Text style={styles.profileEmail}>alex.chen@example.com</Text>

          {/* Plan badge */}
          <View style={styles.planBadge}>
            <Ionicons name="leaf" size={12} color="#16a34a" />
            <Text style={styles.planBadgeText}> Seeding Plan</Text>
          </View>
        </View>

        {/* ── Premium Banner ── */}
        <TouchableOpacity
          style={styles.premiumBanner}
          onPress={() => router.push('/premium')}
          activeOpacity={0.85}>
          <View style={styles.premiumLeft}>
            <View style={styles.premiumIcon}>
              <Ionicons name="star" size={18} color="#F59E0B" />
            </View>
            <View>
              <Text style={styles.premiumTitle}>Upgrade to PRO</Text>
              <Text style={styles.premiumSub}>Unlock all features • 1-day free trial</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.6)" />
        </TouchableOpacity>

        {/* ── Preferences ── */}
        <Section title="PREFERENCES">
          <SettingRow
            icon="card-outline"
            iconBg="#EDE9FE"
            iconColor="#7C3AED"
            label="Currency"
            value="USD ($)"
          />
          <SettingRow
            icon="language-outline"
            iconBg="#FEF3C7"
            iconColor="#D97706"
            label="Language"
            value="English"
          />
          <SettingRow
            icon="moon-outline"
            iconBg="#1E293B"
            iconColor="#94A3B8"
            label="Dark Mode"
            isToggle
            toggleValue={darkMode}
            onToggle={setDarkMode}
            isLast
          />
        </Section>

        {/* ── Data Management ── */}
        <Section title="DATA MANAGEMENT">
          <SettingRow
            icon="cloud-upload-outline"
            iconBg="#FFEDD5"
            iconColor="#EA580C"
            label="Backup to Drive"
            value=""
          />
          {/* sub-label hack — rendered below the row via a wrapper */}
          <View style={styles.subLabelWrap}>
            <Text style={styles.subLabel}>Last backup: 2 days ago</Text>
          </View>
          <SettingRow
            icon="refresh-circle-outline"
            iconBg="#D1FAE5"
            iconColor="#059669"
            label="Restore Data"
            isLast
          />
        </Section>

        {/* ── Legal ── */}
        <Section title="LEGAL">
          <SettingRow
            icon="shield-checkmark-outline"
            iconBg="#EDE9FE"
            iconColor="#7C3AED"
            label="Privacy Policy"
            isExternal
          />
          <SettingRow
            icon="document-text-outline"
            iconBg="#F1F5F9"
            iconColor="#64748B"
            label="Terms of Service"
            isExternal
            isLast
          />
        </Section>

        {/* ── Sign Out ── */}
        <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
          <TouchableOpacity style={styles.signOutBtn}>
            <Ionicons name="log-out-outline" size={18} color="#EF4444" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>

        {/* ── Version ── */}
        <Text style={styles.version}>Emerald Harmony v1.2.0 (Build 422)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#F3F4F6',
  },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.07, shadowRadius: 4, elevation: 2,
  },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },

  // Profile Card
  profileCard: {
    backgroundColor: '#fff', marginHorizontal: 20, borderRadius: 20,
    paddingVertical: 24, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
    marginBottom: 8,
  },
  avatarWrap: { marginBottom: 10 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: '#F0FDF4', alignItems: 'center', justifyContent: 'center',
    borderWidth: 3, borderColor: '#D1FAE5',
  },
  profileName: { fontSize: 20, fontWeight: '800', color: '#111827' },
  profileEmail: { fontSize: 13, color: '#9CA3AF', marginTop: 3 },
  planBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#F0FDF4', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 4, marginTop: 10,
  },
  planBadgeText: { fontSize: 12, fontWeight: '700', color: '#16a34a' },

  // Section
  section: { paddingHorizontal: 20, marginTop: 20 },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', letterSpacing: 1.1, marginBottom: 8 },
  sectionCard: {
    backgroundColor: '#fff', borderRadius: 16,
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
    overflow: 'hidden',
  },

  // Row
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 14 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  rowIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  rowLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: '#111827' },
  rowRight: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rowValue: { fontSize: 13, color: '#9CA3AF', marginRight: 4, fontWeight: '500' },

  // Sub label (for backup info)
  subLabelWrap: { paddingHorizontal: 60, marginTop: -10, paddingBottom: 10 },
  subLabel: { fontSize: 11, color: '#9CA3AF', fontWeight: '500' },

  // Sign Out
  signOutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#fff', borderRadius: 14, paddingVertical: 14, gap: 8,
    borderWidth: 1, borderColor: '#FEE2E2',
    shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 4, elevation: 1,
  },
  signOutText: { fontSize: 15, fontWeight: '700', color: '#EF4444' },

  // Version
  version: { textAlign: 'center', fontSize: 11, color: '#D1D5DB', marginTop: 20, fontWeight: '500' },

  // Premium Banner
  premiumBanner: {
    marginHorizontal: 20, marginTop: 14, borderRadius: 16,
    backgroundColor: '#7C3AED', padding: 16,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    shadowColor: '#7C3AED', shadowOpacity: 0.45, shadowRadius: 12, elevation: 6,
  },
  premiumLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  premiumIcon: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(245,158,11,0.2)', alignItems: 'center', justifyContent: 'center',
  },
  premiumTitle: { fontSize: 14, fontWeight: '800', color: '#fff' },
  premiumSub: { fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 2 },
});

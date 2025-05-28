import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

type Props = {
  label: string;
  value: number;
};

export function StatItem({ label, value }: Props) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

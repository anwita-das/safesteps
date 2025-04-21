import { View, Text, StyleSheet } from 'react-native';

export default function ReportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Report Incident</Text>
      <Text style={styles.subtext}>Submit a safety-related report here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtext: { fontSize: 16, color: '#666' },
});

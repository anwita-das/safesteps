import { View, Text, StyleSheet } from 'react-native';

export default function SOSScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Emergency SOS</Text>
      <Text style={styles.subtext}>Trigger emergency alerts from here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtext: { fontSize: 16, color: '#666' },
});

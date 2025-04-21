import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to SafeSteps</Text>
      <Text style={styles.subheading}>Your personal safety companion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subheading: {
    fontSize: 18,
    marginTop: 10,
    color: '#666',
  },
});

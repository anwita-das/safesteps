import { View, Text, StyleSheet, Image } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.subheading}>Hi Priya 👋</Text>
      <Text style={styles.subheading}>You are currently in a SafeZone ✅</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔒 Safety Status</Text>
        <Text style={styles.cardText}>Low risk area. No incidents reported in the past hour.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📍 Smart Suggestion</Text>
        <Text style={styles.cardText}>The route to your hostel is currently clear and safe.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔔 Latest Community Report</Text>
        <Text style={styles.cardText}>Catcalling reported 400m away, 16 mins ago.</Text>
      </View>

      <View style={styles.userBox}>
        <Image
          source={require('@/assets/images/profile-placeholder.jpg')}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.userName}>Priya Sharma</Text>
          <Text style={styles.userContact}>Emergency Contact: +91 9876543210</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    gap: 16,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '600',
  },
  subheading: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: '#444',
  },
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color:'#666',
  },
  userContact: {
    fontSize: 13,
    color: '#666',
  },
});

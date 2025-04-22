import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Your Profile</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={require('@/assets/images/profile-placeholder.jpg')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Priya Sharma</Text>
        <Text style={styles.email}>priya.safety@appmail.com</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📞 Emergency Contact</Text>
        <Text style={styles.cardText}>Name: Mom</Text>
        <Text style={styles.cardText}>Phone: +91 9876543210</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>⚙️ App Settings</Text>
        <Text style={styles.cardText}>Notifications: On</Text>
        <Text style={styles.cardText}>Dark Mode: Auto</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Change Preferences</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    gap: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  email: {
    fontSize: 14,
    color: '#777',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    gap: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#444',
  },
  editButton: {
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: '#1E90FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
});

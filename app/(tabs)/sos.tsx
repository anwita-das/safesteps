import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import * as SMS from 'expo-sms';
import { collection, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Toast from 'react-native-toast-message';
import { auth } from '@/firebase/config';

export default function SOSScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to send SOS.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      console.log('Fetched Location:', loc);
      setLocation(loc);
    } catch (error) {
      console.error('Failed to fetch location:', error);
      Alert.alert('Error', 'Failed to fetch location. Retrying...');
      setTimeout(fetchLocation, 3000); // Retry after 3 seconds
    }
  };

  const fetchTrustedContacts = async () => {
    try {
      const user = auth.currentUser;

      if (!user) throw new Error('User not authenticated');

      const userDoc = await getDoc(doc(db, 'users', user.uid)); // Fetch by UID
      const userData = userDoc.data();

      if (!userData?.trustedContacts || userData.trustedContacts.length === 0) {
        throw new Error('No emergency contacts found in your profile.');
      }

      // Ensure the contacts are in the correct format
      const trustedContacts = userData.trustedContacts.map((contact: any) => {
        if (!contact.name || !contact.phone) {
          throw new Error('Invalid contact format in trustedContacts.');
        }
        return { name: contact.name, phone: contact.phone };
      });

      console.log('Trusted Contacts:', trustedContacts);
      return trustedContacts; // Array of { name, phone }
    } catch (error) {
      console.error('Failed to fetch trusted contacts:', error);
      throw error;
    }
  };

  const sendSMSToContacts = async (contacts: any[], lat: number, lon: number) => {
    const message = `🚨 SOS ALERT from SafeSteps\nI need help! My location: https://maps.google.com/?q=${lat},${lon}`;

    const isAvailable = await SMS.isAvailableAsync();
    if (!isAvailable) {
      console.error('SMS is not available on this device.');
      throw new Error('SMS is not available on this device.');
    }

    for (const contact of contacts) {
      try {
        console.log(`Sending SMS to: ${contact.phone}`);
        await SMS.sendSMSAsync([contact.phone], message); // Send SMS to each contact individually
      } catch (error) {
        console.error(`Failed to send SMS to ${contact.phone}:`, error);
      }
    }
  };

  const handleSOS = async () => {
    if (!location) {
      Alert.alert('Location not available', 'Wait until your location is fetched.');
      return;
    }

    setLoading(true);

    const { latitude, longitude } = location.coords;

    try {
      const contacts = await fetchTrustedContacts();

      // Save SOS alert to Firestore
      await addDoc(collection(db, 'sosAlerts'), {
        latitude,
        longitude,
        timestamp: serverTimestamp(),
      });

      // Send SMS to trusted contacts
      await sendSMSToContacts(contacts, latitude, longitude);

      Toast.show({
        type: 'success',
        text1: '✅ SOS sent successfully!',
        position: 'top',
        visibilityTime: 3000,
      });
    } catch (error: any) {
      console.error('Failed to send SOS:', error);

      Toast.show({
        type: 'error',
        text1: '❌ SOS failed: ' + error.message,
        position: 'top',
        visibilityTime: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Emergency SOS</Text>
      <Text style={styles.description}>
        Press the button below to send an emergency alert with your location.
      </Text>

      {location ? (
        <TouchableOpacity style={styles.sosButton} onPress={handleSOS} disabled={loading}>
          <Text style={styles.sosText}>{loading ? 'SENDING...' : 'SEND SOS'}</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="large" color="#FF3B30" />
      )}
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#666',
  },
  sosButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 50,
    elevation: 5,
  },
  sosText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

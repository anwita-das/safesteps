import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

export default function SOSScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch location on load
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required to send SOS.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  // Trigger SOS
  const handleSOS = () => {
    if (!location) {
      Alert.alert('Location not available', 'Wait until your location is fetched.');
      return;
    }

    // This is where the alert logic will go
    Alert.alert(
      '🚨 SOS Alert Sent!',
      `Latitude: ${location.coords.latitude}\nLongitude: ${location.coords.longitude}`
    );

    // 🔜 Later: send location to Firebase, notify community, etc.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Emergency SOS</Text>
      <Text style={styles.description}>Press the button below to send an emergency alert with your location.</Text>

      {location ? (
        <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
          <Text style={styles.sosText}>SEND SOS</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="large" color="#FF3B30" />
      )}
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

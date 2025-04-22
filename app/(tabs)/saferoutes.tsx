import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function SafeRoutesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Safe Route Suggestions</Text>

      <Image
        source={require('@/assets/images/map-placeholder.jpg')}
        style={styles.map}
        resizeMode="cover"
      />

      <Text style={styles.subheading}>Recommended Route:</Text>
      <Text style={styles.routeText}>📍 Hostel → Main Gate → Library</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Alternate Route</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subheading: {
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'flex-start',
  },
  routeText: {
    fontSize: 15,
    color: '#444',
    alignSelf: 'flex-start',
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    backgroundColor: '#eaeaea',
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

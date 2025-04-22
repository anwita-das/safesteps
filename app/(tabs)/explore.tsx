import { View, Text, StyleSheet, ScrollView } from 'react-native';

const mockReports = [
  {
    type: 'Stalking',
    location: 'Near Metro Station',
    timeAgo: '12 mins ago',
    description: 'A man followed me aggressively on the platform.',
  },
  {
    type: 'Harassment',
    location: 'Cafe Lane',
    timeAgo: '30 mins ago',
    description: 'Verbal abuse reported by 2 users.',
  },
  {
    type: 'Catcalling',
    location: 'Park Entrance',
    timeAgo: '1 hour ago',
    description: 'Two men whistled and shouted at a jogger.',
  },
];

export default function ExploreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Recent Community Reports</Text>

      {mockReports.map((report, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.type}>{report.type} • {report.timeAgo}</Text>
          <Text style={styles.location}>📍 {report.location}</Text>
          <Text style={styles.description}>{report.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    gap: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  type: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff4d4f',
  },
  location: {
    fontSize: 14,
    marginTop: 6,
    color: '#333',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
});

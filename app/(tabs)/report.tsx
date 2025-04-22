import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';

export default function ReportScreen() {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Report an Incident</Text>

      <Text style={styles.label}>Incident Type</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Harassment, Theft, Stalking"
        value={type}
        onChangeText={setType}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        placeholder="Describe what happened..."
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Your Name (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="You can stay anonymous"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit Report</Text>
      </TouchableOpacity>
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
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#444',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 16,
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

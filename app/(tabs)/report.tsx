import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/config';
import Toast from 'react-native-root-toast';

export default function ReportScreen() {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for button disable

  // Submit the report to Firebase
  const submitReport = async () => {
    console.log('Submitting report...');
    
    // Log current field values for debugging
    console.log('Type:', type);
    console.log('Description:', description);
    console.log('Name:', name);

    // Validate the form fields (type and description are required)
    if (!type || !description) {
      console.log('Form validation failed: Missing type or description');
      Alert.alert('Missing Fields', 'Please provide both incident type and description.');
      return;
    }

    setLoading(true); // Disable button while submitting

    try {
      // Log the attempt to submit the report
      console.log('Adding report to Firebase...');
      
      // Add the report to Firebase
      const docRef = await addDoc(collection(db, 'incidentReports'), {
        type,
        description,
        name: name || 'Anonymous', // Use 'Anonymous' if no name is provided
        timestamp: serverTimestamp(),
      });

      // Log success
      console.log('Report submitted successfully with docId:', docRef.id);

      // Show success notification
      Toast.show('✅ Report submitted successfully!', {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: '#28a745',
        textColor: 'white',
        shadow: true,
        animation: true,
      });

      // Reset the form fields after submission
      setType('');
      setDescription('');
      setName('');
    } catch (error) {
      console.error('Failed to submit report:', error);

      // Show failure notification
      Toast.show('❌ Failed to submit report. Please try again.', {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: '#dc3545',
        textColor: 'white',
        shadow: true,
        animation: true,
      });
    } finally {
      setLoading(false); // Re-enable button after submission
      console.log('Submission completed.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Report an Incident</Text>

      <Text style={styles.label}>Incident Type</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Harassment, Theft, Stalking"
        value={type}
        onChangeText={(text) => {
          console.log('Type input changed:', text); // Log input change
          setType(text);
        }}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        multiline
        placeholder="Describe what happened..."
        value={description}
        onChangeText={(text) => {
          console.log('Description input changed:', text); // Log input change
          setDescription(text);
        }}
      />

      <Text style={styles.label}>Your Name (Optional)</Text>
      <TextInput
        style={styles.input}
        placeholder="You can stay anonymous"
        value={name}
        onChangeText={(text) => {
          console.log('Name input changed:', text); // Log input change
          setName(text);
        }}
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]} // Disable the button when loading
        onPress={submitReport}
        disabled={loading} // Disable button during submission
      >
        <Text style={styles.buttonText}>{loading ? 'Submitting...' : 'Submit Report'}</Text>
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
  buttonDisabled: {
    backgroundColor: '#A9A9A9', // Grey out the button when loading
  },
});

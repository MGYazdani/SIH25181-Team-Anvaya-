import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { Camera, Mic, Upload, FileImage } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HazardReportScreen() {
  const [description, setDescription] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [transcribedText, setTranscribedText] = useState('');

  // Mock image picker functionality
  const pickImage = () => {
    Alert.alert('Image Picker', 'In a real implementation, this would open the image picker');
    setSelectedMedia('https://images.unsplash.com/photo-1675351085230-ab39b2289ff4?w=900&auto=format&fit=crop&q=60');
  };

  // Mock camera functionality
  const openCamera = () => {
    Alert.alert('Camera', 'In a real implementation, this would open the camera');
    setSelectedMedia('https://images.unsplash.com/photo-1608447718455-ed5006c46051?w=900&auto=format&fit=crop&q=60');
  };

  // Mock voice recording functionality
  const startRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setTranscribedText('I noticed a wet floor near the entrance that could cause someone to slip.');
      Alert.alert('Recording Complete', 'Voice note recorded and transcribed');
    }, 3000);
  };

  // Mock submit functionality
  const handleSubmit = () => {
    if (!description && !transcribedText && !selectedMedia) {
      Alert.alert('Error', 'Please provide at least one piece of information for the report');
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      Alert.alert('Report Submitted', 'Your hazard report has been successfully submitted!');
      setDescription('');
      setTranscribedText('');
      setSelectedMedia(null);
    }, 2000);
  };

  const t = {
    hazardReport: "Hazard Report",
    uploadMedia: "Upload Photo/Video",
    voiceNote: "Voice Note",
    description: "Description",
    submit: "Submit Report",
    recording: "Recording...",
    uploading: "Submitting Report...",
    placeholder: "Describe the hazard you observed...",
    camera: "Camera",
    gallery: "Gallery",
    transcribed: "Transcribed text from voice note:",
    location: "Location",
    severity: "Severity",
    date: "Date",
    time: "Time",
    reportedBy: "Reported by",
    actionRequired: "Action Required",
    status: "Status",
    high: "High",
    pending: "Pending"
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-blue-900 p-4 pt-10">
        <Text className="text-white text-2xl font-bold text-center">{t.hazardReport}</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1 p-4"
        contentContainerStyle={{ paddingBottom: 150 }} // 👈 leaves space for bottom button
      >
        {/* Media Upload Section */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow">
          <Text className="text-lg font-bold text-gray-800 mb-3">{t.uploadMedia}</Text>
          <View className="flex-row justify-between mb-4">
            <TouchableOpacity className="flex-1 bg-blue-100 rounded-lg p-4 items-center mr-2" onPress={openCamera}>
              <Camera size={32} color="#2563eb" />
              <Text className="mt-2 text-blue-800 font-medium">{t.camera}</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 bg-green-100 rounded-lg p-4 items-center ml-2" onPress={pickImage}>
              <FileImage size={32} color="#16a34a" />
              <Text className="mt-2 text-green-800 font-medium">{t.gallery}</Text>
            </TouchableOpacity>
          </View>

          {selectedMedia && (
            <View className="mt-3">
              <Image source={{ uri: selectedMedia }} className="w-full h-48 rounded-lg" resizeMode="cover" />
              <TouchableOpacity className="mt-2 self-end" onPress={() => setSelectedMedia(null)}>
                <Text className="text-red-500 font-medium">Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Voice Note Section */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow">
          <Text className="text-lg font-bold text-gray-800 mb-3">{t.voiceNote}</Text>
          <TouchableOpacity
            className={`flex-row items-center justify-center p-4 rounded-full ${
              isRecording ? 'bg-red-100' : 'bg-purple-100'
            }`}
            onPress={startRecording}
            disabled={isRecording}
          >
            <Mic size={24} color={isRecording ? "#dc2626" : "#9333ea"} />
            <Text className={`ml-3 font-medium ${isRecording ? 'text-red-700' : 'text-purple-700'}`}>
              {isRecording ? t.recording : t.voiceNote}
            </Text>
          </TouchableOpacity>

          {transcribedText && (
            <View className="mt-4">
              <Text className="font-medium text-gray-700 mb-1">{t.transcribed}</Text>
              <View className="bg-gray-100 p-3 rounded-lg">
                <Text className="text-gray-800">{transcribedText}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Description Section */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow">
          <Text className="text-lg font-bold text-gray-800 mb-3">{t.description}</Text>
          <TextInput
            className="h-32 border border-gray-300 rounded-lg p-3 text-gray-800"
            placeholder={t.placeholder}
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Sample Report Preview */}
        <View className="bg-white rounded-xl p-4 shadow">
          <Text className="text-lg font-bold text-gray-800 mb-3">Sample Report Preview</Text>
          <View className="border border-gray-200 rounded-lg p-3 mb-2">
            <View className="flex-row justify-between mb-2">
              <Text className="font-medium text-gray-700">{t.location}:</Text>
              <Text className="text-gray-900">Main Entrance</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="font-medium text-gray-700">{t.severity}:</Text>
              <Text className="text-red-600 font-medium">{t.high}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="font-medium text-gray-700">{t.date}:</Text>
              <Text className="text-gray-900">Oct 5, 2025</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="font-medium text-gray-700">{t.time}:</Text>
              <Text className="text-gray-900">10:30 AM</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="font-medium text-gray-700">{t.reportedBy}:</Text>
              <Text className="text-gray-900">John Smith</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text className="font-medium text-gray-700">{t.actionRequired}:</Text>
              <Text className="text-blue-600 font-medium">Place warning sign</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="font-medium text-gray-700">{t.status}:</Text>
              <Text className="text-yellow-600 font-medium">{t.pending}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Submit Button */}
      <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <TouchableOpacity
          className={`flex-row items-center justify-center p-4 rounded-xl ${
            isUploading ? 'bg-gray-300' : 'bg-red-800'
          }`}
          onPress={handleSubmit}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <ActivityIndicator color="white" />
              <Text className="ml-2 text-white font-bold text-lg">{t.uploading}</Text>
            </>
          ) : (
            <>
              <Upload size={24} color="white" />
              <Text className="ml-2 text-white font-bold text-lg">{t.submit}</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

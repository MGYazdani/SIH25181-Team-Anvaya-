import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Bell, Video, AlertTriangle, CheckCircle, XCircle, Circle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
  const navigation = useNavigation();

  const [checklistItems] = useState([
    { id: '1', title: 'Hard Hat Inspection', completed: true },
    { id: '2', title: 'Safety Harness Check', completed: false },
    { id: '3', title: 'Emergency Equipment Check', completed: false },
  ]);

  const videoThumbnail = 'https://images.unsplash.com/photo-1594736790970-7dcacef08b05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80';

  return (
    <View className="flex-1 bg-gray-50">
      {/* App Header */}
      <View className="bg-[#1A5F7A] p-4 pt-12 pb-6">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-xl font-bold">Dashboard</Text>
          <TouchableOpacity className="p-2" onPress={()=>navigation.navigate('Notification')}>
            <Bell color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={[{ key: 'dashboard' }]}
        renderItem={() => (
          <View className="p-4">
            {/* Greeting */}
            <Text className="text-2xl font-bold text-[#2C3E50] mb-6">
              Good Morning, Rajesh 👷
            </Text>

            {/* Safety Checklist Preview */}
            <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold text-[#2C3E50]">Today's Safety Checklist</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Checklist')}>
                  <Text className="text-[#159895] font-medium">View All</Text>
                </TouchableOpacity>
              </View>
              
              {checklistItems.map((item) => (
                <View key={item.id} className="flex-row items-center py-3 border-b border-gray-100 last:border-0">
                  {item.completed ? (
                    <CheckCircle color="#159895" size={20} className="mr-3" />
                  ) : (
                    <Circle color="#6C757D" size={20} className="mr-3" />
                  )}
                  <Text className={`text-base ${item.completed ? 'text-gray-500 line-through' : 'text-[#2C3E50]'}`}>
                    {item.title}
                  </Text>
                </View>
              ))}
            </View>

            {/* Video of the Day */}
            <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
              <Text className="text-lg font-bold text-[#2C3E50] mb-4">Video of the Day</Text>
              <View className="rounded-lg overflow-hidden">
                <Image
                  source={{ uri: videoThumbnail }}
                  className="w-full h-48"
                  resizeMode="cover"
                />
                <View className="absolute inset-0 flex items-center justify-center">
                  <TouchableOpacity className="bg-[#FF6B35] rounded-full p-4">
                    <Video color="white" size={24} />
                  </TouchableOpacity>
                </View>
              </View>
              <Text className="text-[#2C3E50] font-medium mt-3">Safety Procedures: Proper Equipment Usage</Text>
            </View>

            {/* Hazard Report Button */}
            <TouchableOpacity className="bg-[#FF6B35] rounded-xl p-5 flex-row items-center justify-center mb-6" onPress={()=>navigation.navigate('HazardReport')}>
              <AlertTriangle color="white" size={24} className="mr-3" />
              <Text className="text-white text-lg font-bold">Report a Hazard</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export default DashboardScreen;
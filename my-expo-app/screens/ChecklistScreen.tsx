import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CheckCircle, Circle, ShieldCheck } from 'lucide-react-native';

const ChecklistScreen = () => {
  // Mock data for checklist items based on roles
  const checklistData = [
    { id: 1, description: "Check helmet strap for wear and proper adjustment", category: "PPE" },
    { id: 2, description: "Inspect drill for damage or malfunction", category: "Equipment" },
    { id: 3, description: "Verify safety goggles are clean and undamaged", category: "PPE" },
    { id: 4, description: "Test emergency stop buttons functionality", category: "Equipment" },
    { id: 5, description: "Ensure first aid kit is fully stocked", category: "Emergency" },
    { id: 6, description: "Check fire extinguisher pressure levels", category: "Emergency" },
    { id: 7, description: "Inspect scaffolding for structural integrity", category: "Environment" },
    { id: 8, description: "Verify adequate lighting in work areas", category: "Environment" },
    { id: 9, description: "Check ventilation systems are operational", category: "Environment" },
    { id: 10, description: "Confirm hazardous material storage compliance", category: "Compliance" },
  ];

  const [checklistItems, setChecklistItems] = useState(
    checklistData.map(item => ({ ...item, completed: false }))
  );
  const [safetyScore, setSafetyScore] = useState(0);

  const toggleItemCompletion = (id: number) => {
    setChecklistItems(prevItems => {
      return prevItems.map(item => {
        if (item.id === id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      });
    });
  };

  const calculateSafetyScore = () => {
    const completedCount = checklistItems.filter(item => item.completed).length;
    return Math.round((completedCount / checklistItems.length) * 100);
  };

  const handleSubmit = () => {
    const score = calculateSafetyScore();
    setSafetyScore(score);
    Alert.alert(
      "Checklist Submitted",
      `Your safety compliance score: ${score}%\nThank you for maintaining workplace safety!`,
      [{ text: "OK" }]
    );
  };

  const SafetyScoreDisplay = () => (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <ShieldCheck color="#159895" size={24} />
          <Text className="text-lg font-bold text-gray-800 ml-2">Safety Compliance</Text>
        </View>
        <Text className="text-2xl font-bold text-[#1A5F7A]">{safetyScore}%</Text>
      </View>
      
      <View className="mt-3 bg-gray-200 rounded-full h-3">
        <View 
          className="bg-[#57C5B6] h-3 rounded-full" 
          style={{ width: `${safetyScore}%` }}
        />
      </View>
    </View>
  );

  const ChecklistItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100 flex-row items-center"
      onPress={() => toggleItemCompletion(item.id)}
    >
      {item.completed ? (
        <CheckCircle color="#159895" size={24} fill="#159895" />
      ) : (
        <Circle color="#CBD5E1" size={24} />
      )}
      
      <View className="ml-4 flex-1">
        <Text className={`text-base ${item.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
          {item.description}
        </Text>
        <Text className="text-xs text-[#1A5F7A] mt-1 font-medium">
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-[#F8F9FA]">
      {/* Header */}
      <View className="bg-[#1A5F7A] p-5">
        <Text className="text-2xl font-bold text-white">Daily Safety Checklist</Text>
        <Text className="text-[#E6F7F9] mt-1">Complete all items before starting work</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        <SafetyScoreDisplay />
        
        <Text className="text-lg font-bold text-gray-800 mb-3">Inspection Items</Text>
        
        {checklistItems.map((item) => (
          <ChecklistItem key={item.id} item={item} />
        ))}
        
        <TouchableOpacity 
          className="bg-[#159895] py-4 rounded-xl mt-4 mb-6 flex-row justify-center items-center"
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-bold">Submit Checklist</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ChecklistScreen;
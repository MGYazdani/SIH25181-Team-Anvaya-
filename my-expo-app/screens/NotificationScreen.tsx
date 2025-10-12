import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Bell, AlertTriangle, Shield, Info, Clock } from 'lucide-react-native';

// Mock data for DGMS advisories
const mockAdvisories = [
  {
    id: '1',
    title: 'Safety Equipment Check Required',
    message: 'All personnel must inspect safety equipment before starting work in Zone A.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    type: 'alert',
    read: false,
  },
  {
    id: '2',
    title: 'Weather Advisory',
    message: 'Heavy rain forecasted for tomorrow. Secure all outdoor equipment.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    type: 'info',
    read: true,
  },
  {
    id: '3',
    title: 'Emergency Drill Schedule',
    message: 'Monthly emergency drill scheduled for Friday at 2:00 PM. All personnel required.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    type: 'info',
    read: false,
  },
  {
    id: '4',
    title: 'New Safety Protocol',
    message: 'Updated PPE requirements effective immediately. Review new guidelines.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    type: 'alert',
    read: true,
  },
  {
    id: '5',
    title: 'Equipment Maintenance Notice',
    message: 'Quarterly maintenance for ventilation systems begins Monday.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    type: 'info',
    read: false,
  },
  {
    id: '6',
    title: 'Hazardous Material Handling',
    message: 'Special procedures required for handling Chemical X. Training mandatory.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    type: 'alert',
    read: true,
  },
];
/**
 * @param {{ advisory: { id: string, title: string, message: string, timestamp: string, type: string, read: boolean }, onPress: (advisory: any) => void }} props
 */

// Notification Card Component
const NotificationCard = ({ advisory, onPress }) => {
  const getIcon = () => {
    switch (advisory.type) {
      case 'alert':
        return <AlertTriangle color="#FF6B35" size={20} />;
      case 'info':
        return <Info color="#1A73E8" size={20} />;
      default:
        return <Bell color="#6C757D" size={20} />;
    }
  };

  const getBackgroundColor = () => {
    if (advisory.read) {
      return 'bg-gray-100';
    }
    return advisory.type === 'alert' ? 'bg-orange-50' : 'bg-blue-50';
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <TouchableOpacity 
      className={`p-4 mb-3 rounded-xl ${getBackgroundColor()} border border-gray-200`}
      onPress={() => onPress(advisory)}
    >
      <View className="flex-row items-start">
        <View className="mr-3 mt-0.5">
          {getIcon()}
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between items-start">
            <Text className={`font-bold ${advisory.read ? 'text-gray-600' : 'text-gray-900'}`}>
              {advisory.title}
            </Text>
            {!advisory.read && (
              <View className="w-2 h-2 bg-blue-500 rounded-full" />
            )}
          </View>
          <Text className={`mt-1 text-sm ${advisory.read ? 'text-gray-500' : 'text-gray-700'}`}>
            {advisory.message}
          </Text>
          <View className="flex-row items-center mt-2">
            <Clock color="#6C757D" size={14} />
            <Text className="text-xs text-gray-500 ml-1">
              {formatTime(advisory.timestamp)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function NotificationScreen() {
  const [advisories, setAdvisories] = useState(mockAdvisories);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      // In a real app, this would fetch new data from Firestore
      // For demo, we'll just add a new notification
      const newAdvisory = {
        id: `${advisories.length + 1}`,
        title: 'New Safety Protocol Update',
        message: 'Updated guidelines for emergency procedures have been published.',
        timestamp: new Date().toISOString(),
        type: 'alert',
        read: false,
      };
      
      setAdvisories([newAdvisory, ...advisories]);
      setRefreshing(false);
    }, 1500);
  };

  const markAsRead = (advisory) => {
    setAdvisories(advisories.map(item => 
      item.id === advisory.id ? { ...item, read: true } : item
    ));
  };

  const renderNotification = ({ item }) => (
    <NotificationCard 
      advisory={item} 
      onPress={markAsRead} 
    />
  );

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white pt-12 pb-4 px-4 shadow-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Bell color="#1A73E8" size={28} />
            <Text className="text-2xl font-bold text-gray-900 ml-3">
              Notifications
            </Text>
          </View>
          <View className="bg-blue-100 rounded-full w-8 h-8 items-center justify-center">
            <Text className="text-blue-800 font-bold">
              {advisories.filter(a => !a.read).length}
            </Text>
          </View>
        </View>
        <Text className="text-gray-600 mt-2">
          DGMS Safety Advisories & Reminders
        </Text>
      </View>

      {/* Notification List */}
      <View className="flex-1 px-4 py-4">
        {advisories.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <Shield color="#6C757D" size={48} />
            <Text className="text-gray-500 mt-4 text-center">
              No advisories at this time
            </Text>
            <Text className="text-gray-400 text-sm mt-1 text-center">
              You're all caught up!
            </Text>
          </View>
        ) : (
          <FlatList
            data={advisories}
            renderItem={renderNotification}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#1A73E8']}
                tintColor="#1A73E8"
              />
            }
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </View>
  );
}
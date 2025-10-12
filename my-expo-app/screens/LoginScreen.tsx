import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { ChevronDown, Lock, User, HardHat } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
 const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isRolePickerOpen, setIsRolePickerOpen] = useState(false);

  const roles = [
    { label: 'Miner', value: 'miner' },
    { label: 'Supervisor', value: 'supervisor' },
    { label: 'Engineer', value: 'engineer' },
  ];

  const handleLogin = () => {
    if (!username || !password || !role) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // @ts-ignore
    navigation.navigate('Dashboard');
    // Placeholder for future API integration
    console.log('Login attempt with:', { username, password, role });
    Alert.alert('Success', 'Login successful! Navigating to dashboard...');
    // Navigation to dashboard would go here
  };

  const handleForgotPassword = () => {
    Alert.alert('Info', 'Password recovery functionality will be implemented in a future update.');
  };

  return (
    <ScrollView className="flex-1 bg-[#F8F9FA]">
      <View className="flex-1 justify-center p-6">
        {/* Logo Section */}
        <View className="items-center mb-10">
          <View className="bg-[#1A5F7A] p-4 rounded-full mb-4">
            <HardHat size={48} color="#FFFFFF" />
          </View>
          <Text className="text-3xl font-bold text-[#1A5F7A]">Coalmine Safety</Text>
          <Text className="text-[#5D6D7E] text-lg">Companion App</Text>
        </View>

        {/* Login Card */}
        <View className="bg-white rounded-xl shadow-lg p-6">
          <Text className="text-2xl font-bold text-[#2C3333] mb-6 text-center">
            Safety Login
          </Text>

          {/* Username Input */}
          <View className="mb-5">
            <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3">
              <User size={20} color="#5D6D7E" className="mr-3" />
              <TextInput
                className="flex-1 text-[#2C3333] font-medium"
                placeholder="Username"
                placeholderTextColor="#5D6D7E"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                accessibilityLabel="Username input"
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-5">
            <View className="flex-row items-center bg-gray-100 rounded-lg px-4 py-3">
              <Lock size={20} color="#5D6D7E" className="mr-3" />
              <TextInput
                className="flex-1 text-[#2C3333] font-medium"
                placeholder="Password"
                placeholderTextColor="#5D6D7E"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                accessibilityLabel="Password input"
              />
            </View>
          </View>

          {/* Role Picker */}
          <View className="mb-7">
            <Text className="text-[#2C3333] font-bold mb-2">Select Role</Text>
            <TouchableOpacity
              className="flex-row items-center justify-between bg-gray-100 rounded-lg px-4 py-3"
              onPress={() => setIsRolePickerOpen(!isRolePickerOpen)}
              accessibilityLabel="Role selection dropdown"
            >
              <Text className={`text-lg ${role ? 'text-[#2C3333]' : 'text-[#5D6D7E]'}`}>
                {role ? roles.find(r => r.value === role)?.label : 'Choose your role'}
              </Text>
              <ChevronDown size={20} color="#5D6D7E" />
            </TouchableOpacity>

            {isRolePickerOpen && (
              <View className="bg-white rounded-lg shadow-md mt-2 absolute top-full left-0 right-0 z-10">
                {roles.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    className="px-4 py-3 border-b border-gray-100"
                    onPress={() => {
                      setRole(item.value);
                      setIsRolePickerOpen(false);
                    }}
                  >
                    <Text className="text-[#2C3333] text-lg">{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Login Button */}
          <TouchableOpacity
            className="bg-[#1A5F7A] rounded-xl py-4 items-center mb-4"
            onPress={handleLogin}
            accessibilityLabel="Login button"
          >
            <Text className="text-white text-lg font-bold">Login</Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity
            className="items-center"
            onPress={handleForgotPassword}
            accessibilityLabel="Forgot password link"
          >
            <Text className="text-[#159895] font-semibold">Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-8 items-center">
          <Text className="text-[#5D6D7E] text-center">
            Coalmine Safety Companion ensures worker protection and compliance with safety protocols.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
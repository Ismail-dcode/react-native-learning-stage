import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import { useRouter } from 'expo-router' 


interface props {
    placeholder: string;
    onPress?: () => void;
    value: string;
    onCHangeText: (text: string) => void;
}
const SearchBar = ({ placeholder, onPress, value, onCHangeText }: props) => {
    return (
        <View className='flex-row items-center bg-dark-200
    rounded-full px-5 py-4'>
            <Image source={icons.search} className='size-5'
                resizeMode='contain' tintColor="#ab8bff" />
            <TextInput onPress={onPress}
                placeholder={placeholder}
                value={value}
                onChangeText={onCHangeText}
                placeholderTextColor="#a8b5db"
                className='flex-1 ml-2 text-white'
            />
        </View>
    )
}

export default SearchBar
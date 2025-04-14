import ShareButton from '@/components/button/share.button';
import SocialButton from '@/components/button/social.button';
import ShareInput from '@/components/input/share.input';
import { APP_COLOR } from '@/utils/constain';
import { Link, router, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context';

const VerifyPage = () => {
    const { name, isLogin } = useLocalSearchParams();
    if (Number(isLogin) === 1) {
        router.replace("/home");
    } else {
        router.replace("/(auth)/login");
    }
    return (
        // Khi design thì sẽ có SafeAreaView bao ngoài để đảm bảo trong vùng an toàn  ko bị đẩy lên cao màn hình
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <Text>Veryfile</Text>
            </View>
        </SafeAreaView>
    )
}
export default VerifyPage;
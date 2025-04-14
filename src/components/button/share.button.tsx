import React, { ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { APP_COLOR } from '@/utils/constain';

const styles = StyleSheet.create({
    btn_button: {
        backgroundColor: APP_COLOR.ORANGE,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        flexDirection: "row",
        gap: 10,
    },
});

interface Iprops {
    title: string;
    onPress: () => void;
    textStyle?: StyleProp<TextStyle>;
    pressStyle?: StyleProp<ViewStyle>;
    btnStyle?: StyleProp<ViewStyle>;
    icons?: ReactNode;
    disabled?: boolean;
}

const ShareButton = (props: Iprops) => {
    const { title, onPress, textStyle, pressStyle, btnStyle, icons, disabled = false } = props;
    return (
        <>
            <Pressable
                disabled={disabled}
                style={({ pressed }) => ([{ opacity: pressed || disabled ? 0.5 : 1, alignSelf: 'flex-start' }, pressStyle])}
                onPress={onPress}
            >
                <View style={[styles.btn_button, btnStyle]}>
                    {disabled && <ActivityIndicator size="small" />}
                    {icons}
                    <Text style={textStyle}>
                        {title}
                    </Text>
                </View>
            </Pressable>
        </>

    )
}
export default ShareButton;
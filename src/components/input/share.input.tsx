import { APP_COLOR } from "@/utils/constain";
import React, { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const styles = StyleSheet.create({
    inputGroup: {
        gap: 7,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 5,
    },
    inputText: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "bold",
    }
})

interface Iprops {
    label?: string;
    placeholder: string;
    keyboardType?: KeyboardTypeOptions;
    secureTextEntry?: boolean;
    onChangeText?: any;
    onBlur?: any;
    value?: string;
    setValue?: any;
    error?: any;
}

const ShareInput = (props: Iprops) => {
    const { label, placeholder, keyboardType, secureTextEntry = false,
        onChangeText, onBlur, value, setValue, error } = props;

    // Thêm biến để kiểm tra input có được focus hay không

    const [isFocus, setIsFocus] = useState(false);
    const [isShowPass, setIsShowPass] = useState(false);

    return (
        <View style={styles.inputGroup}>
            {/* Biếu thức điều kiện nếu nó nhập thì hiển thị */}
            {label && <Text style={styles.inputLabel}>{label}</Text>}
            <View>
                <TextInput
                    autoCapitalize="none"
                    onFocus={() => { setIsFocus(true); }}
                    onBlur={(e) => { if (onBlur) onBlur(e); setIsFocus(false) }}
                    style={[styles.inputText, { borderColor: isFocus ? APP_COLOR.ORANGE : "gray" }]}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry && !isShowPass}
                    onChangeText={onChangeText}
                    value={value}
                />

                {/* Biếu thức điều kiện nếu nó nhập sai thì hiển thị */}
                {error && <Text style={{ color: "red", fontSize: 12 }}>{error}</Text>}
                {secureTextEntry &&
                    <FontAwesome5
                        style={{ position: "absolute", right: 5, top: 10 }}
                        name={isShowPass ? "eye" : "eye-slash"}

                        size={15} color="black"
                        onPress={() => { setIsShowPass(!isShowPass); }}
                    />

                }
            </View>

        </View>
    );
}
export default ShareInput;
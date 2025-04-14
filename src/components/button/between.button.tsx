import React, { ReactNode } from 'react';
import { Text, TextStyle, View, ViewStyle } from "react-native"

const BetweenButton = () => {

    return (
        <View style={{
            flexDirection: "row",

            justifyContent: "center",
        }}>
            <View style={{ borderBottomWidth: 1, borderColor: "#fff", paddingHorizontal: 45 }}>

            </View>
            <View>
                <Text style={{
                    textAlign: "center",
                    padding: 10,
                    position: "relative",
                    top: 20,
                    color: "#ccc",
                }}>
                    Đăng nhập với
                </Text>
            </View>

            <View style={{ borderBottomWidth: 1, borderColor: "#fff", paddingHorizontal: 45 }}>


            </View>
        </View>

    )
}
export default BetweenButton;
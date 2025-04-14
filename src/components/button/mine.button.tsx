import React from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
const styles = StyleSheet.create({
    btn_button: {
        backgroundColor: "#ccc",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 5,
        alignSelf: "flex-start",
        borderColor: "black",
        borderWidth: 1,
    },
});

interface Iprops {
    title: string,
    onPress: () => void,
}

const MineButton = (props: Iprops) => {
    const { title, onPress } = props;
    return (
        <>
            <Pressable
                style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, alignSelf: 'flex-start' })}
                onPress={onPress}
            >
                <View style={styles.btn_button}>
                    <AntDesign name="pluscircle" size={15} color="black" />

                    <Text>
                        {title}
                    </Text>
                </View>
            </Pressable>
        </>

    )
}
export default MineButton;
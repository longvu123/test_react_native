import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        borderWidth: 1,
        borderColor: "red",
        flexDirection: "row",
        justifyContent: "center",
    },
    item: {
        borderWidth: 1,
        borderColor: "green",
        padding: 20,
        backgroundColor: "yellow",
    }
})
const FlexBox = () => {
    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <Text>Item 1</Text>
            </View>
            <View style={styles.item}>
                <Text>Item 2</Text>
            </View>
            <View style={styles.item}>
                <Text>Item 3</Text>
            </View>
            <View style={styles.item}>
                <Text>Item 4</Text>
            </View>

        </View>
    )
}
export default FlexBox;
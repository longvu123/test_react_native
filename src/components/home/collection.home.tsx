import { StyleSheet, Text, View } from "react-native";

interface Iprops {
    name: string;
    description: string;
    onPress?: () => void;
}
const styles = StyleSheet.create({
    container: {
        borderColor: "green",
        borderWidth: 1,
        height: 250,
        marginBottom: 10,
        width: "100%",
        paddingHorizontal: 10,
    },
})
const CollectionHome = (props: Iprops) => {
    const { name, description, onPress } = props;
    return (
        <View style={styles.container}>
            <Text>{name}</Text>
            <Text>{description}</Text>
        </View>
    );
}
export default CollectionHome;
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AntDesign from '@expo/vector-icons/AntDesign';
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 5,
        backgroundColor: "#ccc",
        paddingHorizontal: 3,
        paddingVertical: 7,
        marginBottom: 5,
    },
});
const SearchHome = () => {
    return (
        <View style={styles.container}>
            <AntDesign name="search1" size={20} color="black" />
            <Text style={{ color: "#707070" }}>Deal hot từ hôm nay...</Text>
        </View>
    );
}
export default SearchHome;
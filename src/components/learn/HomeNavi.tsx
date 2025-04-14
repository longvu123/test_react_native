import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

const HomeNavi = () => {
    const navigation: any = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button title="goto detail" onPress={() => navigation.navigate("HomeDetailNavi")} />
        </View>
    );
};
export default HomeNavi;
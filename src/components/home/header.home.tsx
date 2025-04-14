import { Text, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
const HeaderHome = () => {
    return (
        <View>
            <Text style={{ marginVertical: 5, marginHorizontal: 5 }}>Điểm đến</Text>
            <Text style={{ marginVertical: 5, marginHorizontal: 5 }}>
                <Entypo name="location-pin" size={15} color="red" />
                Hà Nội
            </Text>
        </View>
    );
}
export default HeaderHome;
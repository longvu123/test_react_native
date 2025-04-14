import { Text, View } from "react-native";
import { Link } from 'expo-router';
const LikeDetail = () => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Like detail</Text>
			<Link href={"/"}>back root</Link>
		</View>
	);
};
export default LikeDetail;
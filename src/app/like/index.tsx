import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { Link } from 'expo-router';
const Like = () => {
	const navigation: any = useNavigation();
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Like</Text>
			<Link href={"/like/like.detail"}>go to like detail</Link>
		</View>
	);
};
export default Like;
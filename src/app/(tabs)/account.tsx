import { useCurrentApp } from "@/context/app.context";
import { useAuth } from "@/context/auth.context";
import { useContext } from "react";
import { Text, View } from "react-native"

const AccountPage = () => {
    const { appState } = useCurrentApp();
    const { user } = useAuth();

    //const { appState } = useContext(AppContext);
    return (
        <View>
            <Text>Xin chào {user?.username}</Text>
        </View>
    );
}

export default AccountPage;
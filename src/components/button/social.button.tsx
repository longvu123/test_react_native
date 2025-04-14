import { View, StyleSheet, Image } from "react-native";
import BetweenButton from "./between.button";
import ShareButton from "./share.button";
import imgFB from '@/assets/auth/facebook.png';
import imgGoogle from '@/assets/auth/google.png';
const loginWithFb = () => {
    alert(1);
}
const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 30,
    },
    welcomeBtn: {
        gap: 30
    },
});
const SocialButton = () => {
    return (
        <View style={styles.welcomeBtn}>
            <BetweenButton />
            <View>
                <View style={styles.btnContainer}>
                    <ShareButton
                        title='facebook'
                        onPress={loginWithFb}
                        textStyle={{ textTransform: "uppercase" }}
                        btnStyle={{ backgroundColor: "white" }}
                        icons={<Image source={imgFB} />}
                    />
                    <ShareButton
                        title='google'
                        onPress={loginWithFb}
                        textStyle={{ textTransform: "uppercase" }}
                        btnStyle={{ backgroundColor: "white", paddingHorizontal: 20 }}
                        icons={<Image source={imgGoogle} />}
                    />
                </View>
            </View>
        </View>
    );
}
export default SocialButton;
import * as React from 'react';
import { Button, Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import { Link, Redirect, router } from 'expo-router';
import ShareButton from '@/components/button/share.button';
import { APP_COLOR } from '@/utils/constain';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import bgWelcome from '@/assets/auth/welcome-background.png';
import imgFB from '@/assets/auth/facebook.png';
import imgGoogle from '@/assets/auth/google.png';
import { LinearGradient } from 'expo-linear-gradient';
import BetweenButton from '@/components/button/between.button';
import SocialButton from '@/components/button/social.button';
import { useCurrentApp } from '@/context/app.context';
import { useAuth } from '@/context/auth.context';
const WelcomePage = () => {
	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			paddingHorizontal: 10,
		},
		welcomeText: {
			flex: 0.6,

			alignItems: "flex-start",
			justifyContent: "center",
			paddingLeft: 10,

		},
		welcomeBtn: {
			flex: 0.4,
			gap: 30
		},
		textSign: {
			textAlign: "center",
		},
		heading: {
			fontSize: 60,
			color: "black",
			fontWeight: "bold",
		},
		titleName: {
			fontSize: 40,
			color: APP_COLOR.ORANGE,
			fontWeight: "bold",
		},
		soloGan: {

		},
		btnContainer: {
			flexDirection: "row",
			justifyContent: "center",
			gap: 30,
		},
		btnContent: {
			backgroundColor: "blue",
			borderRadius: 10,
			padding: 15,
			alignSelf: "flex-start",
		},
		btnText: {
			fontSize: 15,
			color: "white",
			fontWeight: "bold",
			textTransform: "uppercase",
		},
		bgImage: {
			flex: 1,
		}
	});
	const loginWithEmail = () => {
		router.replace("/(auth)/login");
	}


	return (
		<ImageBackground source={bgWelcome} resizeMode="cover" style={styles.bgImage}>
			<LinearGradient
				colors={['transparent', '#191B2F']}
				style={{ flex: 1 }}
				locations={[0.2, 0.8]}
			>
				<View style={styles.container}>
					<View style={styles.welcomeText}>
						<Text style={styles.heading}>Welcome to</Text>
						<Text style={styles.titleName}>Food hud</Text>
						<Text style={styles.soloGan}>
							Thị trường tài chính chờ đợi cuộc gọi
						</Text>
					</View>

					<View style={styles.welcomeBtn}>
						<SocialButton />
						<View>
							<View >
								<ShareButton
									title='Đăng nhập với email'
									onPress={loginWithEmail}
									btnStyle={{
										backgroundColor: "gray",
										marginHorizontal: 50,
										paddingVertical: 10,
										borderRadius: 10,
										justifyContent: "center",
										gap: 10,
										borderColor: "#fff",
										borderWidth: 1,
									}}
									textStyle={{ color: "#fff", paddingVertical: 5 }}
									pressStyle={{ alignSelf: "stretch" }}
								/>
							</View>
							<View style={{ alignItems: "center", paddingTop: 20 }}>
								<Text style={{ color: "#fff" }}>
									Chưa có tài khoản?
									<Link href={"/(auth)/signup"}>
										<Text style={{ textDecorationLine: "underline" }}> Đăng ký. </Text>
									</Link>
								</Text>

							</View>

						</View>
					</View>

				</View >
			</LinearGradient>
		</ImageBackground>
	);
}

export default WelcomePage;
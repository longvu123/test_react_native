
import AppProvider from '@/context/app.context';
import AuthProvider from '@/context/auth.context';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// RootSiblingParent : để được sử dụng 
// để hỗ trợ hiển thị các component overlay 
// như Toast, Modal, hoặc các component nổi (floating components) trong React Native.
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaView } from 'react-native-safe-area-context';


// mặc định ban đầu nó vào _layout.tsx
export default function Layout() {
	// Ghi đè theme mặc định của react-navigation/native set màu header thành transparent
	const navTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: 'transparent',
		},
	};

	return (
		<GestureHandlerRootView>
			{/* // RootSiblingParent : để được sử dụng 
			// để hỗ trợ hiển thị các component overlay  */}
			<RootSiblingParent>
				<AuthProvider>
					<AppProvider>
						{/* Khi design thì sẽ có SafeAreaView bao ngoài để đảm bảo trong vùng an toàn  ko bị đẩy lên cao màn hình */}
						<SafeAreaView style={{ flex: 1 }}>
							<ThemeProvider value={navTheme}>
								<Stack>
									<Stack.Screen
										name="index"
										options={{
											headerShown: false,
										}}
									/>
									<Stack.Screen
										name="(auth)/signup"
										options={{
											headerTitle: "Đăng ký",
											headerShown: false,
										}}
									/>
									<Stack.Screen
										name="(auth)/login"
										options={{
											headerShown: false,
										}}
									/>
									<Stack.Screen
										name="(tabs)"
										options={{
											headerTitle: "Trang chủ",
											headerShown: false,
										}}
									/>
								</Stack>
							</ThemeProvider>
						</SafeAreaView>
					</AppProvider>
				</AuthProvider>
			</RootSiblingParent>
		</GestureHandlerRootView>
	);
}

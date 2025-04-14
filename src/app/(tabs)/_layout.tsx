import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { APP_COLOR } from '@/utils/constain';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function TabLayout() {
    const getIcon = (name: string, focused: boolean, size: number) => {
        if (name === 'index') {
            return <MaterialCommunityIcons name="food-fork-drink" size={size} color={focused ? APP_COLOR.ORANGE : 'gray'} />
        }
        if (name === 'order') {
            return <Feather name="list" size={size} color={focused ? APP_COLOR.ORANGE : 'gray'} />
        }
        if (name === 'favorite') {
            return <MaterialIcons name="favorite" size={size} color={focused ? APP_COLOR.ORANGE : 'gray'} />
        }
        if (name === 'notification') {
            return <Ionicons name="notifications" size={size} color={focused ? APP_COLOR.ORANGE : 'gray'} />
        }
        if (name === 'account') {
            return <FontAwesome6 name="user-large" size={size} color={focused ? APP_COLOR.ORANGE : 'gray'} />
        }
    }
    return (
        <Tabs screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => (
                getIcon(route.name, focused, 22)
            ),
            tabBarActiveTintColor: APP_COLOR.ORANGE,  // Màu khi tab được chọn
            tabBarInactiveTintColor: 'gray',          // Màu khi tab không được chọn
        })}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Trang chủ",
                    headerShown: false,
                    // tabBarIcon: ({ focused }) => (
                    //     <MaterialCommunityIcons name="food-fork-drink" size={24} color={focused ? APP_COLOR.ORANGE : 'gray'} />
                    // )

                }}
            />
            <Tabs.Screen
                name="order"
                options={{
                    title: "Đơn hàng",
                    headerShown: false,
                    // tabBarIcon: ({ focused }) => (
                    //     <Feather name="list" size={24} color={focused ? APP_COLOR.ORANGE : 'gray'} />
                    // )

                }}
            />
            <Tabs.Screen
                name="favorite"
                options={{
                    title: "Đã thích",
                    headerShown: false,
                    // tabBarIcon: ({ focused }) => (
                    //     <MaterialIcons name="favorite" size={24} color={focused ? APP_COLOR.ORANGE : 'gray'} />
                    // )


                }}
            />
            <Tabs.Screen
                name="notification"
                options={{
                    title: "Thông báo",
                    headerShown: false,
                    // tabBarIcon: ({ focused }) => (
                    //     <Ionicons name="notifications" size={24} color={focused ? APP_COLOR.ORANGE : 'gray'} />
                    // )
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: "Tôi",
                    headerShown: false,
                    // tabBarIcon: ({ focused }) => (
                    //     <FontAwesome6 name="user-large" size={24} color={focused ? APP_COLOR.ORANGE : 'gray'} />
                    // )

                }}
            />

        </Tabs>
    );
}
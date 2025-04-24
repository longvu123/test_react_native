import { loginApi } from "@/utils/api";
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

// Khai báo kiểu dữ liệu cho context
interface IAuthContextType {
    user: { username: string, password: string } | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}
const AuthContext = createContext<IAuthContextType | null>(null);
interface IProps {
    children: React.ReactNode;
}
const AuthProvider = (props: IProps) => {
    const { children } = props;
    //     - Đây là kiểu dữ liệu của state user
    // - { username: string, password: string } : một object có 2 thuộc tính username và password, cả hai đều là string
    // - | null : nghĩa là user có thể là null (khi chưa đăng nhập
    const [user, setUser] = useState<{ username: string, password: string } | null>(null);

    // Load user từ AsyncStorage khi ứng dụng khởi động
    useEffect(() => {
        const loadUser = async () => {
            const cachedUser = await AsyncStorage.getItem("user");

            if (cachedUser) {
                setUser(JSON.parse(cachedUser)); // Cập nhật state
            }
        };
        loadUser();
    }, []);


    const login = async (username: string, password: string) => {

        const respon = await loginApi(username, password);

        // Nếu đăng nhập thành công thì set user
        if (respon.success) {
            setUser(respon);

            await AsyncStorage.setItem("user", JSON.stringify(respon));


        } else {
            setUser(null);
            await AsyncStorage.removeItem("user");
        }

    }

    const logout = async () => {
        setUser(null);
        await AsyncStorage.removeItem("user");
    }



    const values = { user, login, logout };
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;  
}

export default AuthProvider;
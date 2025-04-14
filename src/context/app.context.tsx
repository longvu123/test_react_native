// Import các hooks cần thiết từ React
import { createContext, useContext, useState } from "react";

// Định nghĩa kiểu dữ liệu cho context, bao gồm theme và hàm để set theme
interface AppContextType {
    theme: string;
    setTheme: (v: string) => void;
    appState: string;
    setAppState: (v: any) => void;
}

// Tạo context với giá trị mặc định là null và kiểu dữ liệu được định nghĩa ở trên
export const AppContext = createContext<AppContextType | null>(null);

// Định nghĩa kiểu props cho AppProvider, yêu cầu truyền vào children
interface IProps {
    children: React.ReactNode;
}



export const useCurrentApp = () => {
    const useCurrentApp = useContext(AppContext);

    if (!useCurrentApp) {
        throw new Error(
            "useCurrentUser has to be used within <AppContext.Provider>"
        );
    }

    return useCurrentApp;
};

// Component Provider để wrap các component con và chia sẻ state
const AppProvider = (props: IProps) => {
    // Khởi tạo state theme với giá trị mặc định là chuỗi rỗng
    const [theme, setTheme] = useState<string>("");
    const [appState, setAppState] = useState<string>("");

    // Return Provider bao bọc children và truyền các giá trị context
    return (
        <AppContext.Provider value={{ theme, setTheme, appState, setAppState }}>
            {props.children}
        </AppContext.Provider>
    );
}
export default AppProvider;
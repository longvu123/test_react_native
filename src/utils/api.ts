import instanceAxios from "@/utils/axios.customize";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const registerApi = (name: string, email: string, password: string) => {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL;
    const v_url_api = `${baseUrl}?action=register&username=${name}&email=${email}&password=${password}`;
    // Lấy tên từ axios từ ultis custome để mục đích gọi từ nhiều server khác nhau
    return instanceAxios.get(v_url_api);
}

export const loginApi = (username: string, password: string) => {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL;
    const v_url_api = `${baseUrl}?action=login&username=${username}&password=${password}`;   
    return instanceAxios.get(v_url_api);
}

//check async storage
export const printAsyncStorage = () => {
    AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys!, (error, stores) => {
            let asyncStorage: any = {}
            stores?.map((result, i, store) => {
                asyncStorage[store[i][0]] = store[i][1]
            });
            console.log(JSON.stringify(asyncStorage, null, 2));
        });
    });
};
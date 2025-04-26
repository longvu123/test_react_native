import instanceAxios from "@/utils/axios.customize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
export const getListCategory = async () => {
        
    try {
        const v_url_api = 'http://192.168.1.9:9000/index.php?action=get_cat';
       
        
        const response = await axios.get(v_url_api);
    
        if(response?.data) return response?.data;
        return response;
    } catch (error: any) {
        console.error('API Error:', error.message);
        throw error; // Re-throw để component có thể xử lý
    }    
}

export const getListProductByCate = async (categoryName: string) => {

    try{
        const v_url_api = `https://fakestoreapi.com/products/category/${categoryName}`;
        const response = await axios.get(v_url_api);
        if(response?.data) return response?.data;
        return response;
    }catch(error){
        console.log(error);
    }

    const v_url_api = `https://fakestoreapi.com/products/category/jewelery`;
    return instanceAxios.get(v_url_api);
}
export const getListProduct = async (refApi:string) => {

    try{
        const v_url_api = `http://192.168.1.5:9000/index.php?action=get_product&${refApi}`;
        const response = await axios.get(v_url_api);
        if(response?.data) return response?.data;
        return response;
    }catch(error){
        console.log(error);
    }

    const v_url_api = `https://fakestoreapi.com/products/category/jewelery`;
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
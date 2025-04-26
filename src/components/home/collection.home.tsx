import { FlatList, Image, StyleSheet, Text, View } from "react-native";
 import img_demo from "@/assets/demo.jpg";
import { APP_COLOR } from "@/utils/constain";
import { useEffect, useState } from "react";
import { getListProduct } from "@/utils/api";
 
interface Iprops {
    name: string;
    description: string;
    refApi: string;
    onPress?: () => void;
}
const styles = StyleSheet.create({
    container: {
        
        backgroundColor: "#efefef",
    }
})
const CollectionHome = (props: Iprops) => {
    const { name, description, refApi, onPress } = props;
    const [restaurant, setRestaurant] = useState([]);
    const [product, setProduct] = useState([]);
   

    useEffect(() => {
        const fetProduct = async () => {
            const res = await getListProduct(refApi)
            setProduct(res);
        };
        fetProduct();
    },[refApi]);
   
    

    return (
        <>
        <View style={{ backgroundColor:'#ccc', height:10 }}></View>
        <View style={{ paddingHorizontal:10 }}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{ fontSize:18, color:APP_COLOR.ORANGE }}>{name}</Text>
                <Text style={{ color:'#5a5a5a' }}>Xem tất cả</Text>
            </View>
            <View>
                <Text style={{ color:'#5a5a5a' }}>{description}</Text>
            </View>
            <FlatList
                data={product}
                horizontal={true}
                contentContainerStyle={{
                    gap:5,
                    paddingVertical:10
                }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item}) => {
                    
                    
                    return (
                        <View style={styles.container}>                            
                            <Image 
                                style={{
                                    height: 125,
                                    width: 140
                                }}
                                source={{ uri: item.image }}
                                resizeMode="cover"
                               
                            />
                                <Text style={{fontWeight: 'bold', paddingVertical:5, paddingHorizontal:5, maxWidth:125}} numberOfLines={2} ellipsizeMode="tail">{item.title}</Text>
                                <Text style={{fontWeight: 'bold', paddingVertical:5, paddingHorizontal:5}}>{item.price}</Text>                                                                
                        </View>
                    )
                }}
            />
            <View>
               
            </View>
        </View>
        </>
    );
}
export default CollectionHome;
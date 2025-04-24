import { FlatList, Image, StyleSheet, Text, View } from "react-native";
 import img_demo from "@/assets/demo.jpg";
import { APP_COLOR } from "@/utils/constain";
import { useState } from "react";
 
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
    const v_arr_data = [
        {
            id: 1,
            name: "Hoa 1",
            image: img_demo,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 2,
            name: "Hoa 2",
            image: img_demo,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 3,
            name: "Hoa 3",
            image: img_demo,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 4,
            name: "Hoa 4",
            image: img_demo,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
            id: 5,
            name: "Hoa 5",
            image: img_demo,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        }
    ];
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
                data={v_arr_data}
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
                                    width: 125
                                }}
                                source={item.image}/>
                                <Text style={{fontWeight: 'bold', paddingVertical:5, paddingHorizontal:5}}>{item.name}</Text>
                                
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
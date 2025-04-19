import CustomFlatList from '@/components/CustomFlatList/CustomFlatList';
import CollectionHome from '@/components/home/collection.home';
import HeaderHome from '@/components/home/header.home';
import SearchHome from '@/components/home/search.home';
import TopListHome from '@/components/home/toplist.home';
import { useAuth } from '@/context/auth.context';
import { useEffect } from "react";
import * as React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ecf0f1",
        flex: 1,
        justifyContent: "center",
        overflow: "hidden",
        padding: 8
    },
    header: {
        borderColor: "red",
        borderWidth: 5,
        height: 100,
        marginBottom: 6,
        width: "100%"
    },
    list: {
        overflow: "hidden"
    },
    sticky: {
        backgroundColor: "#2555FF50",
        borderColor: "blue",
        borderWidth: 5,
        height: 100,
        marginBottom: 6,
        width: "100%",

    }
});
const dataPageHot = [
    { 
        key: 1,
        name: "Top Quán Rating 5* tuần này",
        description: "khám phá quán mới thật ngon",
        ref: "" 
    },
    {
        key: 2, 
        name: "Quán Mới Lên Sàn", 
        description: "khám phá quán mới thật ngon", 
        ref: "" 
    },
    {
        key: 3, 
        name: "Ăn Thỏa Thích, Freeship 0Đ", 
        description: "khám phá quán mới thật ngon", 
        ref: "" 
    },
]
const HomeTab = () => {


    return (

        <CustomFlatList
            data={dataPageHot}
            style={styles.list}
            renderItem={({ item }) => <CollectionHome name={item.name} description={item.description} />}
            HeaderComponent={<HeaderHome />}
            StickyElementComponent={<SearchHome />}
            TopListElementComponent={<TopListHome />}
        />

    );
}
export default HomeTab;
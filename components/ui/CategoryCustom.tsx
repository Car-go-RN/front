import { Pressable, StyleSheet, Text, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { Colors } from "@/constants/Colors";
import ToggleListCustom from "./ToggleListCustom";
import { amenities, brands, gas } from "@/constants/TagMock";

const CategoryCustom = () => {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>카테고리</Text>
                <Pressable onPress={()=>setIsOpen(!isOpen)}><Ionicons name="menu" size={26} color="black" /></Pressable>
            </View>
            {
                isOpen && (
                    <View>
                        <View style={styles.category}>
                            <ToggleListCustom title="주유/충전소" tagList={gas} isbrand={false}/>
                        </View>
                        <View style={styles.category}>
                            <ToggleListCustom title="브랜드" tagList={brands} isbrand={true} />
                        </View>
                        <View style={styles.category}>
                            <ToggleListCustom title="편의시설" tagList={amenities} isbrand={false}/>
                        </View>
                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.background,

    },
    header:{
        width: '85%',
        margin: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20
    },
    category:{
        width: '85%',
        margin: 'auto'
    },
    text:{
        fontFamily:'Paperlogy',
        fontSize: 15,
        color: 'black',
        fontWeight: 600
    }

})

export default CategoryCustom;
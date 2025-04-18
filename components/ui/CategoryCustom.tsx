import { Pressable, StyleSheet, Text, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { Colors } from "@/constants/Colors";

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

    },
    text:{
        fontFamily:'Paperlogy',
        fontSize: 15,
        color: 'black',
        fontWeight: 600
    }

})

export default CategoryCustom;
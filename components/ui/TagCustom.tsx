import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native"
import { Pressable } from "react-native-gesture-handler";

const TagCustom = () => {
    const [isSelect, setIsSelect] = useState(false)
    return(
        <View style={[styles.container, {borderColor: isSelect ? Colors.tint : Colors.lightGrey}]}>
            <Pressable onPress={()=>setIsSelect(!isSelect)}>
                <Image style={styles.icon} source={require('@/assets/brands/CU.png')}/>
                <Text style={styles.text}>CU</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 5,
        borderWidth: 1,
        marginRight: 5,
        marginBottom:5,
        height: 23
    },
    icon: {
        width: 20,
        height: 10,
        marginTop: 3
    },
    text:{
        fontFamily: 'Paperlogy',
        fontSize: 10,
        paddingTop: 2,
        marginLeft: 5
    }
});

export default TagCustom
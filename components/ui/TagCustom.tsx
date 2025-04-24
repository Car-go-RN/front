import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native"

type TagProps = {
    name: string,
    select?:boolean
}

const TagCustom:React.FC<TagProps> = ({name,select}) => {
    const [isSelect, setIsSelect] = useState(false)
    return(
        <View style={[styles.container, {borderColor: select ? isSelect ? Colors.tint : Colors.lightGrey: Colors.lightGrey}]}>
            <Pressable style={{flexDirection:'row'}} onPress={()=>setIsSelect(!isSelect)}>
                <Image style={styles.icon} source={require('@/assets/brands/CU.png')}/>
                <Text style={styles.text}>{name}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 5,
        borderWidth: 1,
        marginRight: 5,
        marginBottom:5,
        width: 'auto',
        alignSelf:'flex-start' //fit-content의 역할을 대신
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
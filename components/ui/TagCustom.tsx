import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import { brandImg, brandKey } from "@/constants/BrandImg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { CategoryState, addCategories, deleteCategories } from "@/store/slices/CategorySlices";

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

type TagProps = {
    name: string,
    icon?: string,
    select?:boolean,
    isRestItem?: boolean,
    isbrand?: boolean,
    tagClass?: keyof CategoryState
}

const TagCustom:React.FC<TagProps> = ({name,icon,select,isRestItem, isbrand, tagClass}) => {
    const dispatch = useDispatch();
    let tagList
    let selectStatus
    if(select && tagClass){
        tagList = useSelector((state:RootState)=> state.category[tagClass]);
        selectStatus = tagList.includes(name);
    }
    const [isSelect, setIsSelect] = useState(selectStatus)

    const onPressTag = () => {
        if(!tagClass)return;
        if(!isSelect){
            dispatch(addCategories({key:tagClass, value: name}));
            setIsSelect(true);
        }
        else {
            dispatch(deleteCategories({key:tagClass, value: name}));
            setIsSelect(false);
        }
    }

    return(
        <View style={[styles.container, {
            borderColor: select ? isSelect ? Colors.tint : Colors.lightGrey: Colors.lightGrey, 
            paddingHorizontal: isRestItem ? 1 : 7, 
            paddingVertical: isRestItem ?  1 : 3,
            }]}>
            <Pressable style={{flexDirection:'row'}} onPress={select ? (()=>onPressTag()) : null}>
                {
                    isbrand ?
                    <Image style={[styles.icon,{marginTop: isRestItem ? 0 : 3, width: isRestItem ? 15 : 20}]} source={icon ? brandImg[icon as brandKey]?.img : require('@/assets/brands/CU.png')}/>
                    : 
                    <MaterialCommunityIcons name={icon as IconName} size={isRestItem ? 10 : 15} color="black" />
                }
                {
                    !isRestItem && (
                        <Text style={styles.text}>{name}</Text>
                    )
                }
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
    },
    text:{
        fontFamily: 'Paperlogy',
        fontSize: 10,
        paddingTop: 2,
        marginLeft: 5
    }
});

export default TagCustom
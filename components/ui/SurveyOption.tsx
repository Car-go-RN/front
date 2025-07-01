import { Pressable, StyleSheet, Text, View } from "react-native"
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { amenities, brands } from "@/constants/TagMock";
import TagCustom from "./TagCustom";
import { brandImg } from "@/constants/BrandImg";
import { AmenitiesIcon } from "@/constants/AmenitiesIcon";
import { useDispatch } from "react-redux";
import { addCategories, deleteCategories } from "@/store/slices/CategorySlices";

type surveyOptionProps = {
    name: string
}

const SurveyOption:React.FC<surveyOptionProps> = ({name}) => {
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);

    const onPressCheckbox = () => {
        if(name==='전기 충전소'){
            if(!checked)dispatch(addCategories({key:'gas', value: '전기'}));
            else dispatch(deleteCategories({key:'gas', value:'전기'}));
        }
        else if(name==='수소 충전소'){
            if(!checked)dispatch(addCategories({key:'gas', value: '수소'}));
            else dispatch(deleteCategories({key:'gas', value:'수소'}));
        }
        setChecked(!checked);
    }

    return(
        <View style={styles.container}>
            <Pressable style={styles.checkbox} onPress={()=>onPressCheckbox()}>
                {checked && <FontAwesome6 name="check" size={15} color={Colors.tint} />}
            </Pressable>
            <View style={styles.choice}>
                <Text style={styles.text}>{name}</Text>
                <View style={styles.tagContainer}>
                {
                    checked && (name==='브랜드 매장' ? 
                    brands.map((item, index) =>{
                        const iconData = brandImg[item.icon];
                        if (!iconData) return null;
                        return (
                            <TagCustom
                                key={index}
                                name={item.name}
                                tagClass="brands"
                                icon={iconData.icon}
                                select={true}
                                isbrand={true}
                            />
                        );
                    }) : name==='편의시설' && amenities.map((item, index) =>{
                        const iconData = AmenitiesIcon[item.name];
                        if(!iconData)return null;
                        return (
                            <TagCustom 
                                tagClass="facilities" 
                                key={index} 
                                name={item.name} 
                                select={true} 
                                icon={iconData.icon}/>
                        )
                    }))
                }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        marginVertical: 6
    },
    text:{
        fontFamily:'Paperlogy',
        fontWeight: 400,
        fontSize: 15,
    },
    checkbox:{
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        width:20,
        height:20,
        alignItems: 'center',
        justifyContent: 'center',
        userSelect:'none'
    },
    choice:{
        marginLeft: 14,
        flex: 1
    },
    tagContainer:{
        flexDirection: 'row',
        marginTop: 15,
        flexWrap: 'wrap',
    }
});

export default SurveyOption;
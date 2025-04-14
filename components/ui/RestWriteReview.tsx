import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';
import React, { useState } from "react";
import ButtonCustom from "./ButtonCustom";
import { Colors } from "@/constants/Colors";

type writeProps = {
    setNav: (nav:'write'|'detail'|'review') => void
}

const RestWriteReview:React.FC<writeProps> = ({setNav}) => {
    const [rating, setRating] = useState<number>(0);

    return(
        <View>
            <View style={{flexDirection:'row', marginBottom: 30, marginTop: 20, alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={[styles.text,{fontWeight:700}]}>리뷰쓰기</Text>
                <Pressable onPress={()=>setNav('detail')}><AntDesign name="close" size={24} color={Colors.lightGrey} /></Pressable>
            </View>
            <View style={styles.answer}>
                <Text style={styles.text}>휴게소에 만족하셨나요?</Text> 
                <View style={styles.rating}>
                    {
                        [1,2,3,4,5].map((i)=>(
                            <Pressable onPress={()=>setRating(i)} key={i}>
                                <Foundation name="star" size={40} color={i<=rating ? Colors.yellow : Colors.placeholder } />
                            </Pressable>
                        ))
                    }

                </View>
            </View>
            <View style={styles.answer}>
                <Text style={[styles.text,{marginBottom: 15}]}>휴게소에 대한 리뷰를 작성해주세요</Text> 
                <TextInput style={styles.input} placeholder="리뷰를 입력해주세요" placeholderTextColor={Colors.placeholder}/>
            </View>
            <View style={styles.buttonContainer}>
                <ButtonCustom text="리뷰 등록" onPress={()=>setNav('review')}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    answer: {

    },
    text: {
        fontFamily: 'Paperlogy',
        fontSize: 15,
        fontWeight: 500,
    },
    input: {
        backgroundColor: Colors.backgroundGrey,
        borderRadius: 5,
        fontFamily: 'Paperlogy',
        fontSize: 15,
        padding: 15
    },
    buttonContainer: {
        width: '125%',
        alignSelf: 'center',
        marginTop: 50
        
    },
    rating:{
        flexDirection: 'row',
        width: 230,
        alignSelf: 'center',
        justifyContent: 'space-around',
        marginVertical: 20,
        marginBottom: 30
    }
})

export default RestWriteReview;
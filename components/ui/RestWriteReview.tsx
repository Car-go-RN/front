import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';
import React, { useReducer, useState } from "react";
import ButtonCustom from "./ButtonCustom";
import { Colors } from "@/constants/Colors";
import { writeRestReview } from "@/api/RestAreaAPI";

type writeProps = {
    setNav: (nav:'write'|'detail'|'review') => void
}

type FormState = {
    content: string,
    grade: number,
}

type Action = 
    | {type:'CHANGE_INPUT'; name: keyof FormState; value: string|number}
    | {type:'RESET'};

const initialForm:FormState = {
    content: '',
    grade: 0
}

const formReducer = (state:FormState, action: Action) : FormState => {
    switch(action.type){
        case 'CHANGE_INPUT':
            return {
                ...state,
                [action.name]: action.value
            }
        case 'RESET':
            return initialForm;
        default:
            return state
    }
}


const RestWriteReview:React.FC<writeProps> = ({setNav}) => {
    const [form, dispatch] = useReducer(formReducer, initialForm)

    const handlePostReview = async () => {
        //폼 비었는지 환인하는 조건문 작성 필요
        if(form.grade===0){
            Alert.alert('리뷰 작성 실패', '만족도를 선택해주세요');
            return;
        }
        else if(form.content===''){
            Alert.alert('리뷰 작성 실패', '리뷰 내용을 작성해주세요');
            return;
        }

        const res = await writeRestReview({restAreaName: '동명휴게소 춘천방향', content: form.content, grade: form.grade, userId: 2})
        
        if(res.pass){
            Alert.alert('리뷰 작성 성공', '리뷰가 작성되었습니다');
            setNav('review')
        }
    }

    return(
        
                <View style={{flex: 1}}>
                    <View style={{flexDirection:'row', marginBottom: 30, marginTop: 20, alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={[styles.text,{fontWeight:700}]}>리뷰쓰기</Text>
                        <Pressable onPress={()=>setNav('detail')}><AntDesign name="close" size={24} color={Colors.lightGrey} /></Pressable>
                    </View>
                    <View style={styles.answer}>
                        <Text style={styles.text}>휴게소에 만족하셨나요?</Text> 
                        <View style={styles.rating}>
                            {
                                [1,2,3,4,5].map((i)=>(
                                    <Pressable onPress={()=>dispatch({type:'CHANGE_INPUT', name:'grade', value: i})} key={i}>
                                        <Foundation name="star" size={40} color={i<=form.grade ? Colors.yellow : Colors.placeholder } />
                                    </Pressable>
                                ))
                            }

                        </View>
                    </View>
                    <View style={styles.answer}>
                        <Text style={[styles.text,{marginBottom: 15}]}>휴게소에 대한 리뷰를 작성해주세요</Text> 
                        <TextInput style={styles.input} placeholder="리뷰를 입력해주세요" onChangeText={(text: string)=>dispatch({type:'CHANGE_INPUT', name: 'content', value: text})} placeholderTextColor={Colors.placeholder}/>
                    </View>
                    <View style={styles.buttonContainer}>
                        <ButtonCustom text="리뷰 등록" onPress={()=>handlePostReview()}/>
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
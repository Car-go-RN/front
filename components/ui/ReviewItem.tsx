import React from "react"
import { Colors } from "@/constants/Colors"
import { View, Text, StyleSheet, Pressable, Alert } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { deleteRestReview } from "@/api/RestAreaAPI";

type ReviewProps = {
    grade: number,
    message: string,
    reviewId: number,
    isMyReview: boolean,
    reivewChange: ()=>void
}

const ReviewItem:React.FC<ReviewProps> = ({grade, message, reviewId, isMyReview, reivewChange}) => {
    const deleteReview = async () => {
        Alert.alert('리뷰 삭제', '정말 삭제하시겠습니까?',[
            {
                text: '취소',
                style: 'cancel'
            },
            {
                text: '삭제',
                style: 'destructive',
                onPress: () => {
                    handleDeleteReview();
                }
            }
        ]);
        const handleDeleteReview = async () => {
            const res = await deleteRestReview({reviewId: reviewId});
            if(res.pass){
                Alert.alert('리뷰 삭제','삭제되었습니다')
                reivewChange();
            }
            else {
                Alert.alert('리뷰 삭제','리뷰 삭제에 실패했습니다');
            }
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={[styles.gradeContainer]}>
                    <Text style={[styles.text,{color:Colors.yellow}]}>
                        {
                            Array.from({length: 5}, (_, i)=> i + 1).map((i) => {
                                if(i<=grade)return '★' 
                                else return '☆'
                            })
                        }
                    </Text>
                    <Text style={[styles.text,{color:Colors.yellow, marginLeft:5}]}>{grade}.0</Text>
                </View>
                {
                    isMyReview && (
                        <Pressable onPress={()=>deleteReview()}>
                            <AntDesign name="delete" size={16} color={Colors.red}/>
                        </Pressable>
                    )
                }
            </View>
            <Text style={[styles.text,{}]}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderColor: Colors.lightGrey,
        borderWidth: 1,
        borderRadius: 5,
        padding: 18,
        marginBottom: 15
    },
    topContainer:{
        marginBottom: 10,
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    gradeContainer: {
        color:Colors.yellow, 
        display: 'flex',
        flexDirection: 'row'
    },
    text:{
        fontFamily: 'Paperlogy',
        fontSize: 16,
    }
})

export default ReviewItem;
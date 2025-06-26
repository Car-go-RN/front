import React from "react"
import { Colors } from "@/constants/Colors"
import { View, Text, StyleSheet } from "react-native"

type ReviewProps = {
    grade: number,
    message: string,
    userId: number,
    reviewId: number
}

const ReviewItem:React.FC<ReviewProps> = ({grade, message, userId, reviewId}) => {
    return(
        <View style={styles.container}>
            <Text style={[styles.text,{color:Colors.yellow, marginBottom: 10}]}>
                {
                    Array.from({length: 5}, (_, i)=> i + 1).map((i) => {
                        if(i<grade)return '★' 
                        else return '☆'
                    })
                }
                {grade}.0
            </Text>
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
    text:{
        fontFamily: 'Paperlogy',
        fontSize: 16,
    }
})

export default ReviewItem;
import { ScrollView, StyleSheet, View } from "react-native"
import ReviewItem from "./ReviewItem";
import { useEffect, useState } from "react";
import { restSearchReview } from "@/api/RestAreaAPI";

type RestReview = {
    restAreaName: string
}

type Review = {
    id: number,
    content: string,
    grade: number,
    createTime: string,
    editTime: string,
    userId: number,
    restAreaId: number
}

const RestReview = ({restAreaName}:RestReview) => {
    const [reviewData, setReviewData] = useState([]);

    useEffect(()=>{
        const getReviews = async () => {
            const res = await restSearchReview({restAreaId:'254'})
            if(res.pass){
                setReviewData(res.data.reviews)
            }
            else {
                console.log(res.data)
            }
        }
        getReviews();
    },[restAreaName]);

    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
                {
                    reviewData.map((review:Review) => (
                        <ReviewItem key={review.id} message={review.content} grade={review.grade} userId={review.userId} reviewId={review.id} />

                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
})

export default RestReview;
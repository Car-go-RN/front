import { ScrollView, StyleSheet, View, Text } from "react-native"
import ReviewItem from "./ReviewItem";
import { useEffect, useState } from "react";
import { restSearchReview } from "@/api/RestAreaAPI";
import { RootState } from "@/app/store/store";
import { useSelector } from 'react-redux';

type RestReview = {
    restId: number
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

const RestReview = ({restId}:RestReview) => {
    //수정사항 :: userId 받는 useSelector 완성하기
    const userId = useSelector((state:RootState)=>state.user).user?.userId;

    const [reviewData, setReviewData] = useState([]);
    const [isChange, setIsChange] = useState<boolean>(true);

    useEffect(()=>{
        const getReviews = async () => {
            const res = await restSearchReview({restAreaId:restId})
            if(res.pass){
                setReviewData(res.data.reviews)
            }
            setIsChange(false);
        }
        if(isChange)getReviews();
    },[isChange]);

    const reivewChange = () => {
        setIsChange(true);
    }

    return(
        <View style={styles.container}>
        {
            reviewData.map((review:Review) => (
                <ReviewItem key={review.id} message={review.content} grade={review.grade} reviewId={review.id} isMyReview={review.userId===userId} reivewChange={reivewChange}/>
            ))
        }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default RestReview;
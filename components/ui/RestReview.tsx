import { ScrollView, StyleSheet, View } from "react-native"
import ReviewItem from "./ReviewItem";
import { useEffect, useState } from "react";
import { restSearchReview } from "@/api/RestAreaAPI";
import { RootState } from "@/app/store/store";
import { useSelector } from 'react-redux';

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
    //수정사항 :: userId 받는 useSelector 완성하기
    const userId = useSelector((state:RootState)=>state.user);

    const [reviewData, setReviewData] = useState([]);
    const [isChange, setIsChange] = useState<boolean>(true);

    useEffect(()=>{
        const getReviews = async () => {
            const res = await restSearchReview({restAreaId:'632'})
            if(res.pass){
                setReviewData(res.data.reviews)
            }
            else {
                console.log(res.data)
            }
            setIsChange(false);
        }
        if(isChange)getReviews();
    },[restAreaName, isChange]);

    const reivewChange = () => {
        setIsChange(true);
    }

    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
                {
                    reviewData.map((review:Review) => (
                        <ReviewItem key={review.id} message={review.content} grade={review.grade} reviewId={review.id} isMyReview={review.userId===2} reivewChange={reivewChange}/>
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
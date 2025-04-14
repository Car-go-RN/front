import { ScrollView, StyleSheet, View } from "react-native"
import ReviewItem from "./ReviewItem";

const RestReview = () => {
    return(
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <ReviewItem message="예시 리뷰입니다."/>
                <ReviewItem message="예시 리뷰입니다."/>
                <ReviewItem message="예시 리뷰입니다."/>
                <ReviewItem message="예시 리뷰입니다."/>
                <ReviewItem message="예시 리뷰입니다."/>
                <ReviewItem message="예시 리뷰입니다."/>
                <ReviewItem message="예시 리뷰입니다."/>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '60%',
    }
})

export default RestReview;
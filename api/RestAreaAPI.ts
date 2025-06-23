import { BaseUrl } from "./BaseUrl";

//리뷰

//휴게소 리뷰 조회
export const restSearchReview = async ({restAreaId}:{restAreaId:string}) => {
    try{
        const res = await BaseUrl.get(`/review/search?restAreaId=${restAreaId}`);
        return {data:res.data, pass: true}
    }
    catch(error){
        return {data:error, pass:false}
    }
}
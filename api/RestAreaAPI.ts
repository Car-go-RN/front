import axios from "axios";
import { BaseUrl } from "./BaseUrl";

//리뷰

//휴게소 리뷰 조회
export const restSearchReview = async ({restAreaId}:{restAreaId:string}) => {
    try{
        const res = await BaseUrl.get(`/review/search`,{
            params: {
                restAreaId:restAreaId
            }
        });
        return {data:res.data, pass: true}
    }
    catch(error){
        return {data:error, pass:false}
    }
}

//휴게소 리뷰 작성
export const writeRestReview = async ({restAreaName, content, grade, userId}:{restAreaName:string, content:string, grade:number, userId:number}) => {
    console.log(restAreaName, content, grade, userId );
    try{
        const res = await BaseUrl.post(`/review?restAreaNm=${restAreaName}`, {
            content,
            grade,
            userId
        });
        return {data:res.data, pass: true}
    }
    catch(error:any){
        console.log(error?.response?.data)
        return {data:error, pass:false}
    }
}

//휴게소 리뷰 삭제
export const deleteRestReview = async ({reviewId}:{reviewId:number}) => {
    try{
        const res = await BaseUrl.delete(`/review/${reviewId}`);
        return {data:res.data, pass: true}
    }
    catch(error){
        return {data:error, pass:false}
    }
}


//즐겨찾기

//즐겨찾기 표시/취소
export const postMyFavorite = async ({restAreaId, userId}:{restAreaId:number, userId:number}) => {
    try{
        const res = await BaseUrl.post(`/favorites/${restAreaId}?userId=${userId}`);
        return {data:res.data, pass: true}
    }
    catch(error){
        return {data:error, pass:false}
    }
}

//즐겨찾기 목록
export const getMyFavorite =  async ({userId}:{userId:number}) => {
    try{
        const res = await BaseUrl.get(`/favorites/user/${userId}`);
        return {data:res.data, pass:true}
    }
    catch(error){
        return {data:error, pass:false}
    }
}


// 휴게소 이미지
export const getRestImg = async({restName}:{restName:string}) => {
    try{
        const res = await axios.get(`http://myway.dothome.co.kr/google_searcher.php?q=${restName}`);
        return {data: res.data, pass: true}
    }
    catch (error){
        return {data: error, pass:false}
    }
}
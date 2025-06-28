import axios from "axios";
import { BaseUrl } from "./BaseUrl";

//리뷰

//휴게소 리뷰 조회
export const restSearchReview = async ({restAreaId}:{restAreaId:number}) => {
    const restId = restAreaId.toString();
    try{
        const res = await BaseUrl.get(`/review/search`,{
            params: {
                restAreaId:restId
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
    
    try{
        const res = await BaseUrl.post(`/review?restAreaNm=${restAreaName}`, {
            content,
            grade,
            userId
        });
        return {data:res.data, pass: true}
    }
    catch(error:any){
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

//휴게소 정보 

//휴게소 이미지
export const getRestImg = async({restName}:{restName:string}) => {
    try{
        const res = await axios.get(`http://myway.dothome.co.kr/google_searcher.php?q=${restName}`);
        return {data: res.data, pass: true}
    }
    catch (error){
        return {data: error, pass:false}
    }
}

//휴게소 상세 정보
export const getRestInfo = async({stdRestNm}:{stdRestNm:string}) => {
    try{
        const res = await BaseUrl.get(`http://13.124.148.94:8080/open-api/detail?stdRestNm=${stdRestNm}`);
        return {data:res.data[0], pass:true}
    }
    catch (error){
        return {data:error, pass:false}
    }
}

//휴게소까지 남은 거리 조회
export const getremainingDistance = async ({latitude, longitude, stdRestNm}:{latitude:number, longitude:number, stdRestNm:string}) => {
    try{
        const res = await BaseUrl.get(`/distance?currentLat=${latitude}&currentLng=${longitude}&stdRestNm=${stdRestNm}`);
        return {data:res.data, pass:true}
    }
    catch(error){
        return {data:error, pass:false}
    }
}
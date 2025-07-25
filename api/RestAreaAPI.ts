import axios from "axios";
import { PrivateAxios, PublicAxios } from "./BaseUrl";

//리뷰

//휴게소 리뷰 조회
export const restSearchReview = async ({restAreaId}:{restAreaId:number}) => {
    const restId = restAreaId.toString();
    try{
        const res = await PublicAxios.get(`/review/search`,{
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
        const res = await PublicAxios.post(`/review?restAreaNm=${restAreaName}`, {
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
        const res = await PrivateAxios.delete(`/review/${reviewId}`);
        return {data:res.data, pass: true}
    }
    catch(error){
        return {data:error, pass:false}
    }
}

//좋아요

//좋아요한 휴게소 ID 조회
export const getRestLikeIds = async ({userId}:{userId:number}) => {
    try{
        const res = await PublicAxios.get(`likes/check/user/${userId}`);
        return {data: res.data, pass:true}
    }
    catch (error){
        return {data:error, pass:false}
    }
}

//좋아요 표시/취소
export const postMyLikes = async ({restAreaId, userId}:{restAreaId:number, userId:number}) => {
    try{
        const res = await PublicAxios.post(`likes/${restAreaId}?userId=${userId}`);
        return {data:res.data, pass:true}
    }
    catch (error){
        return {data:error, pass:false}
    }
}

//휴게소 좋아요 개수
export const getRestLikesCount = async ({restAreaId}: {restAreaId:number}) => {
    try{
        const res = await PublicAxios.get(`/likes/${restAreaId}`);
        return {data:res.data, pass:true}
    }
    catch (error){
        return {data:error, pass:false}
    }
}

//즐겨찾기

//즐겨찾기한 휴게소 ID 조회
export const getRestFavoriteIds = async ({userId}:{userId:number}) => {
    try {
        const res = await PublicAxios.get(`favorites/check/user/${userId}`);
        return {data:res.data, pass:true}
    }
    catch (error){
        return {data:error, pass:false} 
    }
}

//즐겨찾기 표시/취소
export const postMyFavorite = async ({restAreaId, userId}:{restAreaId:number, userId:number}) => {
    try{
        const res = await PrivateAxios.post(`/favorites/${restAreaId}?userId=${userId}`);
        return {data:res.data, pass: true}
    }
    catch(error){
        return {data:error, pass:false}
    }
}

//즐겨찾기 목록
export const getMyFavorite =  async ({userId}:{userId:number}) => {
    try{
        const res = await PrivateAxios.get(`/favorites/user/${userId}`);
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
        const jpgImage = res.data.find((item:{imageUrl:string, title:string}) => item.imageUrl.toLowerCase().split('?')[0].endsWith('.jpg'));
        return {data: jpgImage.imageUrl, pass: true}
    }
    catch (error){
        return {data: error, pass:false}
    }
}

//휴게소 상세 정보
export const getRestInfo = async({latitude, longitude, stdRestNm}:{latitude:number, longitude:number, stdRestNm:string}) => {
    try{
        const res = await PublicAxios.get(`http://13.124.148.94:8080/open-api/detail?stdRestNm=${stdRestNm}&currentLng=${longitude}&currentLat=${latitude}`);
        return {data:res.data[0], pass:true}
    }
    catch (error){
        return {data:error, pass:false}
    }
}

//휴게소까지 남은 거리 조회
export const getremainingDistance = async ({latitude, longitude, stdRestNm}:{latitude:number, longitude:number, stdRestNm:string}) => {
    try{
        const res = await PublicAxios.get(`/distance?currentLat=${latitude}&currentLng=${longitude}&stdRestNm=${stdRestNm}`);
        return {data:res.data, pass:true}
    }
    catch(error){
        return {data:error, pass:false}
    }
}

//휴게소 API 요청 함수 
export const getRestAreaList = async ({page,latitude,longitude }:{page: number, latitude:number, longitude:number}) => {
  const res = await PublicAxios.get(`/open-api/detail?page=${page}&currentLat=${latitude}&currentLng=${longitude}`);
  return res.data; 
};

// 휴게소 출발지, 도착지 사이 조회 API
export const getRestAreaAlong = async (originX: number, originY: number, destX: number, destY: number) => {
    try {
        const res = await PublicAxios.get(
            `/rest-area/search/path?originX=${originX}&originY=${originY}&destX=${destX}&destY=${destY}`
        );
        return res.data;
    } catch (err) {
        console.error("API 호출 실패:", err);
        throw err;
    }
}

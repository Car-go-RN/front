import { BaseUrl } from "./BaseUrl";

//리뷰

//휴게소 리뷰 조회
export const restSearchReview = async ({restAreaId}:{restAreaId:string}) => {
    try{
        const res = await BaseUrl.get(`/review/search?restAreaId=${restAreaId}`,{
            headers:{
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJldW5zaWw1NTIzQGdtYWlsLmNvbSIsImlzcyI6ImNhcmdvYmFqaTI1QGdtYWlsLmNvbSIsImlhdCI6MTc1MDkzNDg1MCwiZXhwIjoxNzUxMDIxMjUwfQ.AbJTB1fFS0dXbUA9jQSOyLrATfDJKms4tyShEE7rGbM'
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
        },{
            headers: {
                Authorization: 'Bearer '
            }
        });
        return {data:res.data, pass: true}
    }
    catch(error){
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
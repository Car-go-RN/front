import { PublicAxios } from "./BaseUrl"


//카테고리 검색
export const getSearchCategory = async ({brands, facilities, gas, currentLng, currentLat}:{brands: string[], facilities: string[], gas: string[], currentLng:number, currentLat:number}) => {
    try{
        const res = await PublicAxios.get(`/rest-area/search/filter`, {
            params: {
                brands,
                facilities,
                gas,
                currentLng,
                currentLat
            }
        })
        return {data:res.data, pass: true}
    }
    catch (error:any){
        console.log(error.response)
        return {data:error, pass: false}
    }
}

//키워드 검색
export const getSearchKeyword = async({keyword}:{keyword:string}) => {
    try{
        const res = await PublicAxios.get(`/rest-area/search`, {
            params: {
                keyword
            }
        })
        return {data:res.data, pass:true}
    }
    catch(error){
        return {data:error, pass:false}
    }
}
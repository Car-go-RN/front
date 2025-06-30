import { PublicAxios } from "./BaseUrl"

//휴게소 추천

//설문조사 저장
export const postRecommandSurvey = async ({userId, gases, facilities, brands}:{userId:number, gases:string[], facilities:string[], brands:string[]}) => {
    try{
        const res = await PublicAxios.post(`/recommend/save/${userId}`, {
            preferences: {
                gases,
                facilities,
                brands
            }
        })
        return {data: res.data, pass: true}
    }
    catch (error) {
        return {data: error, pass:false}
    }
}
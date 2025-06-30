import { PublicAxios } from "./BaseUrl"

export const getSearchCategory = async ({brands, facilities, gas}:{brands: string[], facilities: string[], gas: string[] }) => {
    try{
        const res = await PublicAxios.get(`/rest-area/search/filter`, {
            params: {
                brands,
                facilities,
                gas
            }
        })
        return {data:res.data, pass: true}
    }
    catch (error){
        return {data:error, pass: false}
    }
}
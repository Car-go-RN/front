import { PublicAxios } from "./BaseUrl"

//로그인
export const postLogin = async ({email, password}: {email:string, password:string}) => {
    try{
        const res = await PublicAxios.post('/api/auth/login', {
            email,
            password
        })
        return {data: res.data, pass:true}
    }
    catch(error: any){
        const message = error.response?.data?.message || '로그인 실패';
        console.log('로그인 에러:', message);
        return {data: error, pass:false}
    }
}

//회원가입
export const postSignup = async ({email, password}:{email:string, password:string}) => {
    try{
        const res = await PublicAxios.post('/api/users/register', {
            email,
            password,
        })
        return {data:res, pass:true}
    }
    catch(error){
        return {data:error, pass:false}
    }
}

//회원가입 - 이메일 인증
export const emailVerification = async ({email}:{email:string}) => {
    try{
        const res = await PublicAxios.post('/api/email/send', {
            email
        });
        return {data:res, pass: true}
    }
    catch(error: any){
        console.log("에러 응답", error?.response?.data);
        return {data:error, pass:false}
    }
}


//회원가입 - 이메일 코드 인증
export const codeVerification = async ({email, code}:{email:string, code:string}) => {
    try{
        const res = await PublicAxios.post('/api/email/verify', {
            email,
            code
        });
        return {data:res, pass: true}
    }
    catch(error){
        return {data:error, pass:false}
    }
}
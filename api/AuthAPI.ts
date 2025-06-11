import { BaseUrl } from "./BaseUrl"

//로그인
export const postLogin = async ({email, password}: {email:string, password:string}) => {
    try{
        const res = await BaseUrl.post('/api/auth/login', {
            email,
            password
        })
        return {data: res, pass:true}
    }
    catch(error){
        return {data:error, pass:false}
    }
}

//회원가입
export const postSignup = async ({email, password}:{email:string, password:string}) => {
    try{
        const res = await BaseUrl.post('/api/users/register', {
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
        const res = await BaseUrl.post('/api/email/send', {
            email
        });
        return {data:res, pass: true}
    }
    catch(error){
        return {data:error, pass:false}
    }
}


//회원가입 - 이메일 코드 인증
export const codeVerification = async ({email, code}:{email:string, code:string}) => {
    try{
        const res = await BaseUrl.post('/api/email/verify', {
            email,
            code
        });
        return {data:res, pass: true}
    }
    catch(error){
        return {data:error, pass:false}
    }
}
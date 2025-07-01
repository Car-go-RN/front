import { PublicAxios, PrivateAxios } from "./BaseUrl"

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
        return {data: error, pass:false}
    }
}

//비밀번호변경
export const changePassword = async ({
    currentPassword,
    newPassword
}:{
    currentPassword: string;
    newPassword: string;
}) => {
    try {
        const res = await PrivateAxios.post("/api/auth/reset-password", {
            currentPassword,
            newPassword,
        });

        return { pass: true, data: res.data };
    } catch (err: any) {
        const message =
            err.response?.data?.message || err.message || "비밀번호 변경 실패";
        return { pass: false, data: message };
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
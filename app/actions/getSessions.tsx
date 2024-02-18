import {getServerSession} from "next-auth"
import {authOptions} from "../api/auth/[...nextauth]/route"

// 로그인 한거에 따라 처리하려는 모양 
export default async function getSessions(){
 return await getServerSession(authOptions) // authOptions의 serversesssion 받아오기 
}




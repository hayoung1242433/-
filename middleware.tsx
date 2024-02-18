// 보안용 
import {withAuth} from "next-auth/middleware";

//  로그인 보안 => 로그인이 안될 시 바로 첫 페이지로 
export default withAuth({
    pages: {
        signIn: "/"
    }
})

// user 안의 모든 route를 보호할 수 있는 용도 
export const config = {
   matcher :[
    "/users/:path*",
    "/conversations/:path*"
   ] 
}
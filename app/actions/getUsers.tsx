import prisma from "@/app/libs/prismadb";

import getSession from "./getSessions";

const getUsers = async () => {
    const session = await getSession();
    if(!session?.user?.email){
        //session이 있는가 
        return [];
    }

    try{
        // 내 계정 빼고 다른 애들 거 찾기 
        const users = await prisma.user.findMany({
     orderBy: {
        createdAt : 'desc' // descending 
     },
     where : { 
        NOT: {
            email : session.user.email
        }
     }
        })
        return users;
    }
    catch(error: any){
        return []
    }

   
}

export default getUsers;
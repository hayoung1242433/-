import prisma from "@/app/libs/prismadb"

// 진짜 message 가져올 거임 

const getMessages = async (
    conversationId : string 
) => {
    try{
        const messages = await prisma.message.findMany({
            where: {conversationId : conversationId},
            include : {
                sender : true,
                seen : true 
            },
            orderBy : {createdAt : 'asc'}
        })
        return messages
    } catch (error: any){ return []}
}

export default getMessages;



import {NextResponse} from "next/server"
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb"

interface IParams {
    conversationId ?: string 
}

export async function POST(request : Request, 
    {params} : {params : IParams}) {
        try{
            const currentUser = await getCurrentUser();
            const{conversationId} = params;
if(!currentUser ?. id || !currentUser?. email){
    return new NextResponse('Unauthorized' , {status : 401 })
}
  // 존재하는 대화 찾기 
  const conversation = await prisma.conversation.findUnique({
    where :{id : conversationId },
    include: {
        messages : {
            include:{
                seen : true 
            }
        },
        users : true 
    }
  });

  if(!conversation){
    return new NextResponse('Invalid ID' , {status : 400 })
  }


  // 마지막 message 찾기 
  const lastMessage = conversation.messages[conversation?.messages.length -1 ];

  if(!lastMessage){
    return NextResponse.json(conversation)
  }

  // 마지막 메세지의 seen이 업데이트 되었는지 확인 
  const updatedMessage = await prisma.message.update({
    where: {
        id : lastMessage.id 
    },
    include:  {
        sender : true ,
        seen : true 
    },
    data : {
        seen : {
            connect : {id : currentUser.id}
        }
    }
  })
  return NextResponse.json(updatedMessage)

        }
        catch(error : any ){
            console.log(error, 'ERROR_MESSAGES_SEEN')
            return new NextResponse("Internal Error" , {status : 500 })
        }
    }
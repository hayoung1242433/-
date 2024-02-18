// in our sidebar 
import {useParams} from "next/navigation";
import {useMemo} from "react";

const useConversation = () => {
    const params = useParams();

    const conversationId = useMemo(()=>{
        if(!params?.conversationId){
            // params 객체가 존재x 경우 
            return '';
        }

        return params.conversationId as String;

    },[params?.conversationId])

    // !! make string to boolean
    const isOpen = useMemo(() => !!conversationId , [conversationId])

    return useMemo(() => ({
        isOpen,
        conversationId
    } ), [isOpen, conversationId])
}
export default useConversation;
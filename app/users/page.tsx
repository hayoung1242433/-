
import EmptyState from "../components/inputs/EmptyState" ;

// 첫번째 css => 레이어드 바를 위해  
const Users = () =>{
    return(
    <div className= "hidden lg:block lg:pl-80 h-full">
    <EmptyState/> 
        </div>
    )
}

export default Users;
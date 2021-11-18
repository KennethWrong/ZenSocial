import NavbarAfterLogin from "../components/NavbarAfterLogin"
import PostFourm from "../components/PostFourm"
import {useParams} from 'react-router-dom'

function CreatePost(){
    const user_id = useParams();
    return(
        <div>
            <NavbarAfterLogin />
            <PostFourm user_id={user_id}/>
        </div>
    )
}

export default CreatePost
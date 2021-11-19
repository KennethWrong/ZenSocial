import { useParams} from "react-router";
import NavbarAfterLogin from "../components/NavbarAfterLogin";
import Post from "../components/Post";

function ViewPost(){
    let post_id = useParams()['post_id']
    let user_id = useParams()['user_id']

    return(
        <div>
            <NavbarAfterLogin/>
            <Post post_id={post_id} user_id={user_id}/>
        </div>
    )

}
export default ViewPost;
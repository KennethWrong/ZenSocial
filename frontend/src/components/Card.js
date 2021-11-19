import Avatar from './Avatar'
import {get_time_difference} from '../helpers/dateHelper'
import { useHistory, useParams } from 'react-router'
import Vote from './Vote'

function Card(props){
    const post = props.post
    let title = post.title
    let content = post.content
    let post_user_id = post.user_id
    let date = post.date
    let post_id = post.id
    date = new Date(date);
    let time_diff = get_time_difference(date)

    const history = useHistory()
    const current_user_id = useParams()['user_id']

    if(title && title.length > 70){
        title = title.slice(0,70) + '...'
    }
    if(content && content.length > 200){
        content = content.slice(0,200) + '...'
    }

    const redirectToPostView = () =>{
        history.push(`/${current_user_id}/posts/${post_id}`)
    }

    return(
        <div className="card lg:card-side bordered cursor-pointer hover:bg-gray-300">
            <Avatar user_id={post_user_id}  />
            <div className="card-body">
                <h2 className="card-title text-3xl">{title}</h2> 
                <p className=" max-w-3xl text-xl text-gray-500">{content}</p> 
                <div className="card-actions mt-2">
                <button className="btn btn-primary" onClick={redirectToPostView}>Read more</button> 
                <Vote post={post}/>
                </div>
                <p className='mt-2 text-gray-400'>{time_diff}</p>
            </div>
            
        </div>
    )
}

export default Card;
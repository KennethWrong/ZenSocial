import axios from "axios"
import Avatar from "./Avatar"
import Vote from "./Vote"
import {useState, useEffect} from 'react'
import {get_time_difference} from '../helpers/dateHelper'
import { useHistory} from "react-router"
import ScrollToTopMount from '../components/ScrollToTopMount'

function Post(props){
    const [post, setPost] = useState('')
    const [user, setUser] = useState('')
    const [vote, setVote] = useState('')
    let post_id = props.post_id
    let user_id = props.user_id
    let post_date = new Date(post.date)
    let time_diff = get_time_difference(post_date)
    let history = useHistory()

    useEffect(()=>{
        async function fetchData(){
            if(post_id){
                let res_post = await axios.get(`http://localhost:5000/post/${user_id}/${post_id}`)
                let content = res_post['data']
                setPost({
                    'content':content['content'],
                    'date':content['date'],
                    'post_id':content['post_id'],
                    'title':content['title'],
                    'upvotes':content['upvotes'],
                    'downvotes':content['downvotes'],
                    'vote':content['vote']
                })
                setUser({
                    'username':content['username'],
                    'picture_id':content['picture_id'],
                    'user_id':content['user_id'],
                })
                setVote({
                    'vote':content['vote'],
                    'upvotes':content['upvotes'],
                    'downvotes':content['downvotes'],
                })
            }
        }
        fetchData()
    },[post_id, user_id])

    const handleVoteChange = (obj) => {
        setVote(obj)
    }

    return(
        <div className="flex items-center w-full px-4 py-10 bg-cover card bg-base-200 min-h-screen" style={{backgroundImage:"url(&quot;https://picsum.photos/id/314/1000/300&quot)"}}>
            <ScrollToTopMount /> 
            <button className="btn bg-blue-400 border-blue-700 mt-4 hover:bg-blue-800 self-start mb-9 ml-3 " onClick={()=> history.push(`/feed/${props.user_id}`)}>return</button>
            <div className="card glass lg:card-side text-gray-800 min-h-full min-w-full">
                <div className="p-6 flex-col">
                    <Avatar user_id={user.user_id} size={'w-20 h-20'}/>
                    <p>User: <span className=' text-pink-500'>{user.username}</span> </p>
                </div> 
                <div className=" max-w-5xl min-w-min card-body min-h-full">
                <h2 className="card-title text-4xl max-w-full">{post.title}</h2> 
                <p className="text-2xl max-w-4xl mt-2">{post.content}</p> 
                <p className='mt-4 text-gray-400'>Posted {time_diff}</p>
                <div className="card-actions mt-12">
                    <Vote post={post} vote={vote} handleVoteChange={handleVoteChange} pid={user.user_id} cid={user_id}/>
                </div>
                </div>
            </div>
        </div>

    )
}

export default Post
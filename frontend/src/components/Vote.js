import axios from 'axios'
import { useParams} from 'react-router'
import { useState} from 'react'
import Upvote from './UpVote'
import Downvote from './DownVote'

function Vote(props){
    let post = props.post
    let vote = props.vote
    let user_id = useParams()['user_id']
    let post_id = useParams()['post_id'] ?? post.id
    let upvote_url = `http://localhost:5000/upvote/${user_id}/${post_id}`
    let downvote_url = `http://localhost:5000/downvote/${user_id}/${post_id}`

    const [loading, setLoading] = useState(false)
    const [deleteButtonText, setDeleteButtonText] = useState('Delete')


    const handleUpvote = async() => {
        let res = await axios.put(`${upvote_url}`)
        console.log(res.data)
        props.handleVoteChange(res.data)
    }

    const handleDownvote = async() => {
        let res = await axios.put(`${downvote_url}`)
        console.log(res.data)
        props.handleVoteChange(res.data)
    }

    const handleDeletePost = async() => {
        try{
            await axios.delete(`http://localhost:5000/delete/post/${post_id}`);
            setLoading(true)

            setTimeout(() => {
                setLoading(false)
                setDeleteButtonText('Success')
            },1000)
            setTimeout(() => {
                window.location.reload(false);
            },1500)
        }
        catch{
            setDeleteButtonText('Error')
            setTimeout(() => {
                setLoading(false)
                setDeleteButtonText('Delete')
            },1000)
        }

    }
    return(
        <div className='flex'>

            <button onClick={handleUpvote} 
            className={`btn btn-md btn-ghost hover:bg-transparent text-lg`}>
                <Upvote color={vote.vote===1?'orange':''}/>
                <span className={`text-grey-400 ml-2 ${vote.vote===1?'text-yellow-600':''}`}>{vote.upvotes} </span>
            </button>

            <button onClick={handleDownvote} className={`btn btn-ghost hover:bg-transparent text-lg`}>
                <Downvote color={vote.vote===-1?'blue':''} />
                <span className={` text-grey-400 ml-2 ${vote.vote===-1?'text-blue-400':''} `}>{vote.downvotes} </span>
            </button>
            {props.cid === props.pid?
                <button onClick={handleDeletePost} 
                className={`btn btn-md btn-outline btn-secondary ${loading?'loading':""}`}
                >
                    {!loading?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 mr-2 stroke-current">   
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>                       
                        </svg>:""
                    }
                   {deleteButtonText}
            </button>:''}
        </div>
    )
}
export default Vote;
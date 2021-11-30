import axios from 'axios'
import { useParams } from 'react-router'
import { useState } from 'react'

function Vote(props){
    let post = props.post
    let user_id = useParams()['user_id']
    let post_id = useParams()['post_id'] ?? post.id
    let upvote_url = `http://localhost:5000/upvote/${user_id}/${post_id}`
    let downvote_url = `http://localhost:5000/downvote/${user_id}/${post_id}`

    const [vote, setVote] = useState(post.vote)
    const [localUpvote, setLocalUpvote] = useState(0) // just used for display number calculation
    const [localDownvote, setLocalDownvote] = useState(0) // just used for display number calculation

    const handleUpvote = async() => {
        if(vote === 1){
            setLocalUpvote(localUpvote - 1)
        }else if(vote === -1){
            setLocalDownvote(localDownvote - 1)
            setLocalUpvote(localUpvote + 1)
        }else{
            setLocalUpvote(localUpvote + 1)
        }
        vote === 1 ? setVote(0) : setVote(1) // check vote === 1  to highlight upvote
        await axios.put(`${upvote_url}`)
    }

    const handleDownvote = async() => {
        if(vote === -1){
            setLocalDownvote(localDownvote - 1)
        }else if(vote === 1){
            setLocalUpvote(localUpvote - 1)
            setLocalDownvote(localDownvote + 1)
        }else{
            setLocalDownvote(localDownvote + 1)
        }
        vote === -1 ? setVote(0) : setVote(-1) // check vote === 1  to highlight downvote 
        await axios.put(`${downvote_url}`)
    }

    return(
        <div className=''>
            <button onClick={handleUpvote} className="btn btn-md btn-outline hover:text-white  border-blue-400 opacity-75 hover:opacity-100 hover:bg-blue-400 ml-5">Updoot
                <span className="text-grey-400 ml-2">{post.upvotes + localUpvote} </span>
            </button>
            <button onClick={handleDownvote} className="btn btn-outline opacity-75 hover:opacity-100 ml-5 hover:text-white">Downdoot
                <span className=" text-grey-400 ml-2">{post.downvotes + localDownvote} </span>
            </button>
        </div>
    )
}
export default Vote;
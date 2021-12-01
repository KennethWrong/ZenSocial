import axios from 'axios'
import { useParams } from 'react-router'
import { useState } from 'react'
import Upvote from './UpVote'
import Downvote from './DownVote'

function Vote(props){
    let post = props.post
    let vote = props.vote
    let user_id = useParams()['user_id']
    let post_id = useParams()['post_id'] ?? post.id
    let upvote_url = `http://localhost:5000/upvote/${user_id}/${post_id}`
    let downvote_url = `http://localhost:5000/downvote/${user_id}/${post_id}`


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
    return(
        <div className=''>

            <button onClick={handleUpvote} 
            className={`btn btn-md btn-ghost hover:bg-transparent text-lg`}>
                <Upvote color={vote.vote==1?'orange':''}/>
                <span className={`text-grey-400 ml-2 ${vote.vote==1?'text-yellow-600':''}`}>{vote.upvotes} </span>
            </button>

            <button onClick={handleDownvote} className={`btn btn-ghost hover:bg-transparent text-lg`}>
                <Downvote color={vote.vote==-1?'blue':''} />
                <span className={` text-grey-400 ml-2 ${vote.vote==-1?'text-blue-400':''} `}>{vote.downvotes} </span>
            </button>
        </div>
    )
}
export default Vote;
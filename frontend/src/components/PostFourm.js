import axios from "axios";
import { useState } from "react";
import SuccessMessage from './SuccessMessage'
import ErrorMessage from "./ErrorMessage";
function PostFourm(props){
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const user_id = props.user_id['username']
    const handleClick = async(e) => {
        e.preventDefault()
        try{
            let obj = {
                title:title,
                content:content,
                user_id:user_id,
            }
            let res = await axios.post('http://localhost:5000/post/create_post',obj)
            console.log(res)

            setLoading(true)
            setTimeout(()=>{
                setLoading(false)
                setTitle('')
                setContent('')
                setMessage('You have successfully created a new post')
            },1500)
    
            setTimeout(()=>{
                setMessage('')
            },3000)
        }
        catch{
            setLoading(true)
            setTimeout(()=>{
                setLoading(false)
                setTitle('')
                setContent('')
                setErrorMessage('Oops something went wrong, please try again later')
            },1500)
    
            setTimeout(()=>{
                setErrorMessage('')
            },3000)
        }
    }

    const handleTitleChange = (e) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const handleContentChange = (e) =>{
        e.preventDefault()
        setContent(e.target.value)
    }

    return(
        <div className="hero min-h-screen" style={{backgroundImage:`url(http://33.media.tumblr.com/daa0c9107281b754adc75dc6eb2d10df/tumblr_nv7sf27UTn1rpco88o1_r1_500.gif)`, backgroundRepeat:"no-repeat"}}>
            <div className="hero-overlay bg-opacity-60 bg-white width-2/3"></div> 
            <div className="text-center hero-content text-neutral-content ">
                <div className="max-w-md">
                    <div className="form-control bg-gray-200 bg-opacity-60 rounded-box p-5">
                        <h1 className="text-gray-700 text-4xl mb-4 font-bold">Create a new post </h1>
                        {message?<SuccessMessage message={message}/>:''}
                        {errorMessage?<ErrorMessage message={errorMessage}/>:''}
                        <input type="text" placeholder="Title" value={title} className="input input-md input-bordered text-gray-500 mb-4" onChange={handleTitleChange}/>
                        <textarea value={content} className="textarea h-36 w-96 textarea-bordered textarea-succcess text-gray-800 mb-4" placeholder="Content" onChange={handleContentChange}></textarea>
                        <button className={`btn btn-xs md:btn-sm lg:btn-md xl:btn-lg ${loading?'loading btn-ghost text-black':''}`} onClick={handleClick}>Create</button> 
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default PostFourm;


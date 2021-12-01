import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EditProfile from "../components/EditProfile";
import Feed from "./Feed";
import {useHistory} from 'react-router-dom'

function Profile(props){
    let user_id = useParams()['user_id']
    const [user,setUser] = useState('')
    const [deleted, setDeleted] = useState(false)
    const [text, setText] = useState('Processing')
    const history = useHistory()
    useEffect(() =>{
        async function getUserInformation(){
            let res = await axios.get(`http://localhost:5000/users/${user_id}`)
            let content = res['data']
            let obj = {
                'picture_id':content['picture_id'],
                'user_id': content['user_id'],
                'username': content['username']
            }
            setUser(obj)
        }
        getUserInformation()
    },[user_id])

    const deleteProfile = async() =>{
        if(window.confirm('Do you really want to delete your profile? \nAll your previous posts will be deleted along with your account.')){
            let res = await axios.delete(`http://localhost:5000/delete/profile/${user_id}`)
            setDeleted(true)
            setTimeout(()=>{
                setText('[:DELETED:]')
            },3000)
            setTimeout(()=>{
                history.push('/')
            },5000)
        }
    }

    return(
        <div>
            <div className="card lg:card-side bordered ml-5">
                {text==='[:DELETED:]'?'':
                <figure className=''>
                    {user['user_id']?
                    <img src={`http://localhost:5000/assets/picture/${user['user_id']}`} className=' object-cover h-48 w-full' alt='user_profile_pic'/>:
                    <img src="https://www.freeiconspng.com/thumbs/load-icon-png/load-icon-png-8.png" className=' object-cover h-48 w-full' alt='loading picture'/>}
                </figure> 
                }

                <div className="card-body">
                    {deleted?
                    <kbd class={`kbd text-5xl ${text==='Processing'?'loading':''}`}>{text}</kbd>:
                    <h1 className="card-title text-5xl">{user['username']}</h1> }
                    
                    {text==='[:DELETED:]'?'':
                    <div className="card-actions">
                        <EditProfile user_id={user_id}/>
                        <button className="btn bg-red-500 border-red-500 hover:border-red-800 hover:bg-red-700" onClick={deleteProfile}>
                            Delete Profile
                        </button>
                    </div>
                    }
                </div>
            </div> 
            <hr/>
            {text==='[:DELETED:]'?'':<Feed feed_url={`http://localhost:5000/profile/${user_id}/`}/>}
        </div>
    )
}

export default Profile;
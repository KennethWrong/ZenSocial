
import axios from "axios";
import { useEffect, useState } from "react";
import {useParams, useHistory}from "react-router-dom"


function NavbarAfterLogin(){
    const [username, setUsername] = useState('')
    let user_id = useParams();
    user_id = user_id['user_id']
    const history = useHistory()

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${user_id}`)
        .then(res => {
            setUsername(res.data['username'])
        })
    },[user_id, username])


    const redirectToCreate = () => {
        history.push(`/create/${user_id}`)
    }

    const redirectToFeed = () => {
        history.push(`/feed/${user_id}`)
        window.location.reload(false)
    }

    const redirectToLogin = () => {
        history.push(`/`)
    }

    const redirectToProfile = () => {
        history.push(`/profile/${user_id}`)
    }

    return(
    <div className="navbar mb-2 shadow-lg bg-blue-400 text-neutral-content rounded-box sticky top-0 z-50">
 
        <div className="flex-1 px-2 mx-2">
            <span className="font-bold text-2xl">
                <h1 className= "cursor-pointer hover:bg-gray-800 p-2  rounded-box hover:bg-opacity-25" onClick={redirectToFeed}>ZenSocial </h1>
            </span>
        </div> 
        <div className="flex-none">
            <button className="btn btn-ghost" onClick={redirectToLogin}>
                <div className="items-center mt-1">
                    <span className="text-lg items-center">
                        Logout
                    </span>
                </div>
            </button>
         </div>
        <div className="flex-none">
            <button className="btn btn-ghost" onClick={redirectToCreate}>
                <div className="items-center mt-1">
                    <span className="text-lg items-center">
                        Create
                    </span>
                </div>
            </button>
         </div>
         <div className="flex-none">
            <button className="btn btn-ghost" onClick={redirectToProfile}>
                <div className="avatar flex-row items-center">
                    <span className="text-lg">
                        {username}
                    </span>
                    <div className="rounded-full w-10 h-10 m-1 ml-4">
                        <img src={`http://localhost:5000/assets/picture/${user_id}`} alt='user_profile_pic'/>
                    </div>
                </div>
            </button>
         </div>
</div>
    )
}

export default NavbarAfterLogin
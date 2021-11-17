
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useParams}from "react-router-dom"


function NavbarAfterLogin(){
    const [username, setUsername] = useState('')
    let user_id = useParams();
    user_id = user_id.username

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${user_id}`)
        .then(res => {
            setUsername(res.data)
        })
    },[username])

    return(
    <div className="navbar mb-2 shadow-lg bg-blue-400 text-neutral-content rounded-box">
 
        <div className="flex-1 px-2 mx-2">
            <span className="font-bold text-3xl">
                <Link to="/" className="hover:text-indigo-500">ZenSocial </Link>
            </span>
        </div> 
        <div className="flex-none">
            <button className="btn btn-ghost">
                <div className="avatar flex-row items-center">
                    <span className="text-lg">
                        {username}
                    </span>
                    <div className="rounded-full w-10 h-10 m-1 ml-4">
                        <img src={`http://localhost:5000/assets/picture/${user_id}`} />
                    </div>
                </div>
            </button>
         </div>
</div>
    )
}

export default NavbarAfterLogin
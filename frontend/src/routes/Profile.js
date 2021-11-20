import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Profile(props){
    let user_id = useParams()['user_id']
    const [user,setUser] = useState('')
    useEffect(() =>{
        async function getUserInformation(){
            let res = await axios.get(`http://localhost:5000/users/${user_id}`)
            let content = res['data']
            console.log(content)
            let obj = {
                'picture_id':content['picture_id'],
                'user_id': content['user_id'],
                'username': content['username']
            }
            setUser(obj)
        }
        getUserInformation()
    },[])
    return(
        <div className="card lg:card-side bordered">
            <figure>
                {user['user_id']?
                <img src={`http://localhost:5000/assets/picture/${user['user_id']}`} className=' border-4'/>:
                <img src="https://www.freeiconspng.com/thumbs/load-icon-png/load-icon-png-8.png" />}
            </figure> 
            <div className="card-body">
                <h1 className="card-title text-5xl">{user['username']}</h1> 
                <div className="card-actions">
                <button className="btn btn-primary">Get Started</button> 
                <button className="btn btn-ghost">More info</button>
                </div>
            </div>
    </div> 
    )
}

export default Profile;
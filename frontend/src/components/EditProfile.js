import { useState } from "react"
import ErrorMessage from "./ErrorMessage"
import SuccessMessage from "./SuccessMessage"
import axios from 'axios'

function EditProfile(props){
    const [p1, setP1] = useState('')
    const [p2, setP2] = useState('')
    const [loading,setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    let user_id = props.user_id

    const changeP1 = (e) => {
        setP1(e.target.value)
    }
    const changeP2 = (e) => {
        setP2(e.target.value)
    }

    const handleClose = () => {
        setP2('')
        setP1('')
    }

    const handlePasswordChange = async() => {
        try{
            setLoading(true)
            setTimeout(()=>{
                setLoading(false)
             },1500)

            let res = await axios.put(`http://localhost:5000/user/${user_id}/password/change`,{'p1':p1,'p2':p2})
            setTimeout(()=>{
                setSuccessMessage(res.data)
            },1000)
        }catch(e){
            setTimeout(()=>{
                setErrorMessage(e.response.data)
            },1000)
        }
        setTimeout(()=>{
            setErrorMessage('')
            setSuccessMessage('')
            setP1('')
            setP2('')
        },2500)
    }


    return(
    <div>
            <label htmlFor="my-modal-2" className="btn modal-button bg-blue-400 border-0 hover:bg-blue-700">Change Password</label> 
            <input type="checkbox" id="my-modal-2" className="modal-toggle" /> 
            <div className="modal">
                <div className="modal-box flex flex-col p-10">
                    <h1 className='mb-4 text-3xl'>Change Password </h1>
                    {errorMessage?<ErrorMessage message={errorMessage}/>:''}
                    {successMessage?<SuccessMessage message={successMessage} />:''}
                    <input type="password" value={p1} placeholder="New password" 
                    className={`input input-bordered mb-4 ${p1 && p1.length>=3?`input-success`:''} ${p1 && p1.length<3?'input-error':''}`} 
                    onChange={changeP1}/>

                    <input type="password" value={p2}placeholder="Retype new password" 
                    className={`input input-bordered ${p1 && p2 && p1===p2?`input-success`:''} ${p1&&p2 && p1!=p2?'input-error':''}`} 
                    onChange={changeP2}/>
                    <div className="modal-action">
                        {!loading?
                        <label className="btn btn-primary" onClick={handlePasswordChange}>Change Password</label>:
                        <label className="btn btn-ghost loading"> Loading </label>
                        }
                        <label htmlFor="my-modal-2" className="btn" onClick={handleClose}>Close</label>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default EditProfile
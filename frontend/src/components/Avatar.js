
function Avatar(props){
    
    return(
        <div className="avatar">
                <div className= {`rounded-full w-14 h-14 ${props.size?props.size:''}`}>
                    <img src={`http://localhost:5000/assets/picture/${props.user_id}`} alt="user_picture" />
                </div>
        </div> 
    )
}

export default Avatar;
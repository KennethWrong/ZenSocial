
function Avatar(props){

    return(
        <div className="avatar">
                <div className= "rounded-full w-14 h-14">
                    <img src={props.picture_id} />
                </div>
        </div> 
    )
}

export default Avatar;
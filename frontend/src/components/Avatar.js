
function Avatar(props){
    let post = props.post

    return(
        <div className="avatar">
                <div className= "rounded-full w-14 h-14">
                    <div data-tip={post.user} class=" absolute tooltip tooltip-right">
                    <img src={post.picture_id} />
                    </div>
                </div>
            
        </div> 
    )
}

export default Avatar;
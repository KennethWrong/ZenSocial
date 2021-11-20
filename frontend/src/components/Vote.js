function Vote(props){
    let post = props.post
    
    return(
        <div className=''>
            <button className="btn btn-md btn-outline hover:text-white  border-blue-400 opacity-75 hover:opacity-100 hover:bg-blue-400 ml-5">Updoot
                <span className="text-grey-400 ml-2">{post.upvotes} </span>
            </button>
            <button className="btn btn-outline opacity-75 hover:opacity-100 ml-5 hover:text-white">Downdoot
                <span className=" text-grey-400 ml-2">{post.downvotes} </span>
            </button>
        </div>
    )
}
export default Vote;
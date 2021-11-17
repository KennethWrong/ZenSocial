import Avatar from './Avatar'

function Card(props){
    const post = props.post
    let title = post.title
    let content = post.content
    let picture_id = post.picture_id
    if(title.length > 70){
        title = title.slice(0,70) + '...'
    }
    if(content.length > 200){
        content = content.slice(0,200) + '...'
    }
    return(
        <div className="card lg:card-side bordered cursor-pointer hover:bg-gray-300">
            <Avatar picture_id={picture_id}  />
            <div className="card-body">
                <h2 className="card-title text-3xl">{title}</h2> 
                <p className=" max-w-3xl text-xl text-gray-500">{content}</p> 
                <div className="card-actions">
                <button className="btn btn-primary">Read more</button> 
                <button className="btn btn-warning btn-outline">Updoot</button>
                <div className="badge badge-lg badge-neutral">{post.upvotes}</div> 
                </div>
            </div>
        </div>
    )
}

export default Card;
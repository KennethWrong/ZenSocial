import Avatar from './Avatar'

function Card(props){
    const post = props.post
    let title = post.title
    let content = post.content
    let user_id = post.user_id
    let date = post.date
    date = new Date(date);

    let current_date = new Date()

    if (current_date < date) {
        current_date.setDate(current_date.getDate() + 1);
    }
    
    var diff = current_date - date;
    
    var msec = diff;
    var hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    var mm = Math.floor(msec / 1000 / 60);  
    msec -= mm * 1000 * 60;
    var ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    var diff2 =(current_date.getTime() - date.getTime()) / 1000;
    diff2 /= (60 * 60 * 24);
    let years = Math.abs(Math.round(diff2/365.25));
    {console.log(years)}
    {console.log(hh)}

    if(title && title.length > 70){
        title = title.slice(0,70) + '...'
    }
    if(content && content.length > 200){
        content = content.slice(0,200) + '...'
    }
    return(
        <div className="card lg:card-side bordered cursor-pointer hover:bg-gray-300">
            <Avatar user_id={user_id}  />
            <div className="card-body">
                <h2 className="card-title text-3xl">{title}</h2> 
                <p className=" max-w-3xl text-xl text-gray-500">{content}</p> 
                <div className="card-actions">
                <button className="btn btn-primary">Read more</button> 
                <button className="btn btn-warning btn-outline">Updoot</button>
                <div className="badge badge-lg badge-neutral">{post.upvotes}</div> 
                </div>
                {date.toString()}
            </div>
            
        </div>
    )
}

export default Card;
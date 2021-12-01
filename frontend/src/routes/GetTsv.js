import axios from 'axios'
import {Link} from 'react-router-dom'
function GetTsv(){

    const handleTsvFunction = async(value) => {
        let res = await axios.get(`http://localhost:5000/TSVdump/${value}`)
        console.log(res.data)
    }


    return(
        <div className="p-6">
            <h1 className="text-center text-5xl mb-20 mt-20 ">Get TSV Dump</h1>
           <div className="flex flex-row w-full">
            <Link className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center cursor-pointer text-4xl"
            onClick={()=>handleTsvFunction('users')} to={`/tsv/users.tsv`}>
                Users
            </Link> 
            <div className="divider divider-vertical"></div> 
            <Link className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center cursor-pointer text-4xl"
            onClick={()=>handleTsvFunction('posts')} to={`/tsv/posts.tsv`}>
                Posts
            </Link>
            </div>

        </div>
    )
}

export default GetTsv
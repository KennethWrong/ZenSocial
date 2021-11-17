import Card from '../components/Card'
import Pagination from '../components/Pagination'
import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

function Feed(){

    const [page, setPage] = useState(1)
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/feed/${page}`)
        .then((res) => {
            let json_list = Object.values(res.data)
            setData(Object.values(res.data))
        })
    },[page])

    return (
        <div>
            <div className='ml-20 mt-10'>
                {data.map((post) => (
                    <Card post={post} key={post.id}></Card>
                ))}
            </div>  
            <Pagination></Pagination>
        </div>
    )
}

export default Feed;
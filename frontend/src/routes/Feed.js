import Card from '../components/Card'
import Pagination from '../components/Pagination'
import {useEffect, useState} from 'react'
import axios from 'axios'

function Feed(){

    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [max, setMax] = useState(false)


    useEffect(() => {
        axios.get(`http://localhost:5000/feed/${page}`)
        .then((res) => {
            let json_list = Object.values(res.data)
            if(json_list.length < 5){
                setData(json_list)
                setMax(true)
            }
            else if(json_list.length == 5){
                setData(json_list)
                if(max){
                    setMax(false)
                }
            }else{
                setMax(true)
            }
        })
    },[page])

    const handlePageChange = (val) => {
        if(val == 0){
            if(page > 1){
                setPage(page - 1)
            }
        }else{
            if(!max){
                setPage(page + 1)
            }
        }
    }


    return (
        <div>
            <div className='ml-20 mt-10'>
                {data.map((post) => (
                    <Card post={post} key={post.id}></Card>
                ))}
            </div>  
            <Pagination handlePageChange={handlePageChange} max={max}></Pagination>
        </div>
    )
}

export default Feed;
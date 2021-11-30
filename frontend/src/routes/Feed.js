import Card from '../components/Card'
import Pagination from '../components/Pagination'
import {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

function Feed(props){

    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const [max, setMax] = useState(false)
    const [min, setMin] = useState(true)
    let user_id = useParams()['user_id']
    let feed_url = `http://localhost:5000/feed/${user_id}/`
    if(props.feed_url){
        feed_url = props.feed_url
    }


    useEffect(() => {
        axios.get(`${feed_url}${page}`)
        .then((res) => {
            let json_list = Object.values(res.data)
            if(json_list.length < 5){
                setData(json_list)
                setMax(true)
            }
            else if(json_list.length === 5){
                setData(json_list)
                if(max){
                    setMax(false)
                }
            }else{
                setMax(true)
            }
        })
    },[feed_url, max, page])

    const handlePageChange = (val) => {
        if(val === 0){
            if(page > 1){
                setPage(page - 1)
                if(page-1 === 1){
                    setMin(true)
                }
            }else{
                setMin(true)
            }
        }else{
            if(!max){
                setPage(page + 1)
                setMin(false)
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
            <Pagination handlePageChange={handlePageChange} min={min} max={max}></Pagination>
        </div>
    )
}

export default Feed;
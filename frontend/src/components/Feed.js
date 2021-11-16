import Card from './Card'
import Pagination from './Pagination'
import {useParams} from 'react-router-dom'

const dummyData = [
    {
        title:"As you get older, what's something that becomes increasingly annoying?",
        content:'',
        user: 'ZhongXena',
        upvotes:44,
        id: 0,
        picture_id: "http://daisyui.com/tailwind-css-component-profile-5@56w.png"
    },
    {
        title:'A female Gorilla at the Taipei Zoo, trying to figure out an escape plan using a log as a stepping stone',
        content:'Yes. Sad was the first emotion I felt as well. Thank goodness other people are starting to see, as this being the top rated comment.',
        user: 'Ainsley-Sorby',
        upvotes: 50,
        id: 1,
        picture_id: "http://daisyui.com/tailwind-css-component-profile-2@56w.png"
    },
    {
        title:'TIFU by showing my girlfriend my actual strength',
        content:'So, when my then gf and I started dating, I discovered early on that she can be quite physical. In the sense that she likes to push, hold, punch even. Bare in mind she is not actually trying to hurt me, she is just playful like that. I found this both adorable and fun, so I played along.',
        user: 'aauthor8',
        upvotes:44,
        id:2,
        picture_id: "http://daisyui.com/tailwind-css-component-profile-1@56w.png"
    },
]

function Feed(){
    const {username} = useParams()
    return (
        <div>
            <div className='ml-20 mt-10'>
                {dummyData.map((post) => (
                    <Card post={post}></Card>
                ))}
            </div>  
            <Pagination></Pagination>
        </div>
    )
}

export default Feed;
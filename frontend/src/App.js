import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState('Loading ...')

  const handle_click = () => {
    setCount(count + 1);
  }

  useEffect(async() => {
    const res = await axios.get(`http://localhost:5000/`);
    setTimeout(()=>{
      setLoading(res.data);
    },1000)
    },[])

  return (
    <div>
      <h1>Hi</h1>
      <h1>{count}</h1>
      <button onClick={handle_click}>click me</button>
      <h1>{loading}</h1>
    </div>
  )
}

export default App;
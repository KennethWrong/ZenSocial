import React, { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handle_click = () => {
    setCount(count + 1);
  }

  return (
    <div>
      <h1>Hi</h1>
      <h1>{count}</h1>
      <button onClick={handle_click}>click me</button>
    </div>
  )
}

export default App;
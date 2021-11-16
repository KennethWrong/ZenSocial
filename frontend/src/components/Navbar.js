import {Link} from 'react-router-dom'

function Navbar(){
    
    return(
        <div className="navbar mb-2 shadow-lg bg-blue-400 text-neutral-content rounded-box">
  <div className="flex-1 px-2 mx-2">
    <span className="font-bold text-3xl">
          <Link to="/" className="hover:text-indigo-500">ZenSocial </Link>
    </span>
  </div> 
  <div className="flex-none hidden px-2 mx-2 lg:flex">
    <div className="flex items-stretch">
      <a className="btn btn-ghost btn-sm rounded-btn" href='#'>Likes</a> 
      <a className="btn btn-ghost btn-sm rounded-btn" href='#'>
              Notifications
            
      </a> 
      <a className="btn btn-ghost btn-sm rounded-btn" href='#'>
              Files
            
      </a> 
      <a className="btn btn-ghost btn-sm rounded-btn" href='#'>
              Config 
      </a>
    </div>
  </div> 
  <div className="flex-none">
    <button className="btn btn-square btn-ghost">
    </button>
  </div>
</div>
    )
}

export default Navbar;
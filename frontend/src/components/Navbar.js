import {Link} from 'react-router-dom'

function Navbar(){
    
    return(
        <div className="navbar mb-2 shadow-lg sticky top-0 z-50 bg-blue-400 text-neutral-content rounded-box">
  <div className="flex-1 px-2 mx-2">
    <span className="font-bold text-3xl">
          <Link to="/" className="hover:text-indigo-500">ZenSocial </Link>
    </span>
  </div> 
  <div className="flex-none hidden px-2 mx-2 lg:flex">
    <div className="flex items-stretch">
      <Link to='/' className="btn btn-ghost btn-sm rounded-btn">Likes</Link>
      <Link to="/" className="btn btn-ghost btn-sm rounded-btn"> Notifications </Link> 
      <Link to="/" className="btn btn-ghost btn-sm rounded-btn"> Files </Link> 
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
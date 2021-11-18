import { stringify } from 'purgecss/node_modules/postcss'
import {useEffect, useState} from 'react'

function SelectAvatar(props) {
    const [imgClicked, setImgClicked] = useState(0);

    useEffect(() => {
        props.handleClickEvent(imgClicked)
    }, [imgClicked])
    
    return(
        <div> 
            <label htmlFor="my-modal-2" className="btn btn-primary modal-button mb-0 mt-3">Choose avatar</label> 
            <input type="checkbox" id="my-modal-2" className="modal-toggle" /> 
            <div className="modal">
            <div className="modal-box">
                <div className="grid grid-cols-4">
                    <img src="http://localhost:5000/assets/picture/allpicture/0" className={` cursor-pointer max-w-xs max-h-20 ${imgClicked == 0 ? 'border-solid border-4 border-blue-500' :""}`} onClick={() => setImgClicked(0)}/>
                    <img src="http://localhost:5000/assets/picture/allpicture/1" className={` cursor-pointer max-w-xs max-h-20 ${imgClicked == 1 ? 'border-solid border-4 border-blue-500' :""}`} onClick={() => setImgClicked(1)}/>
                    <img src="http://localhost:5000/assets/picture/allpicture/2" className={` cursor-pointer max-w-xs max-h-20 ${imgClicked == 2 ? 'border-solid border-4 border-blue-500' :""}`} onClick={()=> setImgClicked(2)}/>
                    <img src="http://localhost:5000/assets/picture/allpicture/3" className={` cursor-pointer max-w-xs max-h-20 ${imgClicked == 3 ? 'border-solid border-4 border-blue-500' :""}`} onClick={()=> setImgClicked(3)}/>
                </div>
                <div className="modal-action">
                <label htmlFor="my-modal-2" className="btn btn-primary">Accept</label> 
                <label htmlFor="my-modal-2" className="btn">Close</label>
                </div>
            </div>
            </div>     
        </div>      
    )
}

export default SelectAvatar
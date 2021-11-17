import { stringify } from 'purgecss/node_modules/postcss'
import {useState} from 'react'

function SelectAvatar(props) {
    const [state, setState] = useState({p0: 'border-solid border-4 border-blue-500', p1:'', p2:'',p3:''})

    const click_event = (id) => {
        switch(id){
            case 0:
                setState({p0: 'border-solid border-4 border-blue-500', p1:'', p2:'',p3:''})
                break
            case 1:
                setState({p0: '', p1:'border-solid border-4 border-blue-500', p2:'',p3:''})
                break
            case 2:
                setState({p0: '', p1:'', p2:'border-solid border-4 border-blue-500',p3:''})
                break
            case 3:
                setState({p0: '', p1:'', p2:'',p3:'border-solid border-4 border-blue-500'})
                break
        }

        props.handleClickEvent(id)
    }
    
    
    return(
        <div>
            <label htmlFor="my-modal-2" className="btn btn-primary modal-button mb-0 mt-3">Choose avatar</label> 
            <input type="checkbox" id="my-modal-2" className="modal-toggle" /> 
            <div className="modal">
            <div className="modal-box">
                <div className="grid grid-cols-4">
                    <img src="http://localhost:5000/assets/picture/allpicture/0" className={` cursor-pointer max-w-xs max-h-20 ${state.p0}`} onClick={() => click_event(0)}/>
                    <img src="http://localhost:5000/assets/picture/allpicture/1" className={` cursor-pointer max-w-xs max-h-20 ${state.p1}`} onClick={() => click_event(1)}/>
                    <img src="http://localhost:5000/assets/picture/allpicture/2" className={` cursor-pointer max-w-xs max-h-20 ${state.p2}`} onClick={()=> click_event(2)}/>
                    <img src="http://localhost:5000/assets/picture/allpicture/3" className={` cursor-pointer max-w-xs max-h-20 ${state.p3}`} onClick={()=> click_event(3)}/>
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
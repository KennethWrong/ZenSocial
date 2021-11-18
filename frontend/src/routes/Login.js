import {useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage'
import SelectAvatar from '../components/SelectAvatar'

function Login(){
    const [greetingsH1, setGreetingH1] = useState('Welcome to ZenSocial')
    const [greetingsP, setGreetingsP] = useState('Connect with your friends. Have a laugh. Come join us and have some fun.')
    const [button1Text, setButton1Text] = useState('Login')
    const [button2Text, setButton2Text] = useState('Create an account')
    const [h1Color, setH1color] = useState('text-blue-400')
    const [pColor, setPcolor] = useState('text-indigo-600')
    const [buttonColors, setButtonColors] = useState(['btn-primary','btn-info'])
    const [username, setUsername] = useState('')
    const history = useHistory()
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [error, setError] = useState(false)
    const [pictureId, setPictureId] = useState(0)

    const change_theme = (e) => {
        e.preventDefault()
        let gh1,gp,bt1,bt2,pc,hc, buttonCols;
        
        if (button2Text === 'Create an account'){
            gh1 = 'Come join ZenSocial'
            gp = 'Enjoy content you have yet to see. Share it with you close ones. Join Now!'
            bt1 = 'Register'
            bt2 = 'Got an account?'
            hc = 'text-indigo-600'
            pc = 'text-blue-400'
            buttonCols = ['btn-secondary','btn-accent']
        }else{
            gh1 = 'Welcome to ZenSocial'
            gp = 'Connect with your friends. Have a laugh. Come join us and have some fun.'
            bt1 = 'Login'
            bt2 = 'Create an account'
            hc = 'text-blue-400'
            pc = 'text-indigo-600'
            buttonCols = ['btn-primary','btn-info']
        }
        setGreetingH1(gh1);
        setGreetingsP(gp);
        setButton1Text(bt1);
        setButton2Text(bt2);
        setH1color(hc);
        setPcolor(pc);
        setButtonColors(buttonCols);
        setUsername('')
        setPassword('')
    }

    const CreateErrorMessage = (message) => {
        setErrorMessage(message)
        setError(true)
        setTimeout(()=>{
            setError(false)
        },1500)
    }

    const send_info_request = async () => {
        if (button1Text === 'Login'){
            //send LOGIN request
            let obj = {
                username: username,
                password: password,
            }
            try{
                const res = await axios.post('http://localhost:5000/login', obj)
                let user_id = res['data']
                history.push(`/feed/${user_id}`)
            } catch(e){
                CreateErrorMessage(e.response['data'])
                return
            }
        }
        else{
        //send REGISTER request
            let obj = {
                username: username,
                password: password,
                picture_id: '0',
            }
            try{
                const res = await axios.post('http://localhost:5000/register', obj)
                let user_id = res['data']
                history.push(`/feed/${user_id}`)
            }catch(e){
                CreateErrorMessage(e.response['data'])
                return
            }

        }
    }
    //For selection of avatar
    const handleClickEvent = (pid) => {
        setPictureId(pid)
    }

    const selectAvatar = () => { 
        if(button1Text === 'Register'){
            return(
                <div>
                <SelectAvatar handleClickEvent={handleClickEvent}/> 
                <img src={`http://localhost:5000/assets/picture/allpicture/${pictureId}`} className={` cursor-pointer max-w-xs max-h-20`} />
                </div>  
            )
        }
        return <div></div>
    }


    return(
        <div className="hero min-h-screen bg-base-200 text-3xl">
        <div className="flex-col justify-center hero-content lg:flex-row">
            <div className="text-center lg:text-left">
            <h1 className={`mb-5 text-9xl font-bold ${h1Color}`}>
                    {greetingsH1}
                </h1> 
            <p className={`mb-5 leading-relaxed ${pColor}`}>
                    {greetingsP}
                </p>
            </div> 
            <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            <div className="card-body">
                {error? <ErrorMessage message={errorMessage}/>: <div></div>}
                <div className="form-control">
                <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}
                className="input h-15 input-bordered input-info text-2xl mb-4" />
                </div> 
                <div className="form-control">
                <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}
                className="input h-15 text-2xl input-info input-bordered" /> 
                {selectAvatar()}
                </div> 
                <div className="form-control mt-6">
                <input type="button" value={button1Text} className={`btn ${buttonColors[0]}`} onClick={send_info_request}/>
                </div>
                <button className={`btn btn-outline ${buttonColors[1]} mt-4`} onClick={change_theme}>{button2Text}</button> 
            </div>
            </div>
        </div>
</div>
    )
}

export default Login;
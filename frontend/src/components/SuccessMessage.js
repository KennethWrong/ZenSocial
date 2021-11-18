
function SuccessMessage (props){
    return(
        <div className="alert alert-success text-sm">
            <div className="flex-1">
                <label>{props.message}</label>
            </div>
        </div>
    )
}

export default SuccessMessage
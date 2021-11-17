
function ErrorMessage (props){
    return(
        <div className="alert alert-error text-sm">
            <div className="flex-1">
                <label>{props.message}</label>
            </div>
        </div>
    )
}

export default ErrorMessage
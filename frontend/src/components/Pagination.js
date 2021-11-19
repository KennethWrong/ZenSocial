function Pagination(props){

    const handlePageClick = (state) => {
        props.handlePageChange(state)
    }

    return(

    <div className="btn-group ml-20 mt-12 mb-12">
        <button className="btn btn-outline btn-wide" disabled={props.min?'disabled':''} onClick={()=>handlePageClick(0)}>Previous Page</button> 
        <button className={`btn btn-outline btn-wide`} disabled={props.max?'disabled':''} onClick={()=>handlePageClick(1)}>Next Page</button>
    </div>
    )
}

export default Pagination
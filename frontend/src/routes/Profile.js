function Profile(){

    return(
        <div className="card lg:card-side bordered">
            <figure>
                <img src="https://picsum.photos/id/1005/400/250" />
            </figure> 
            <div className="card-body">
                <h2 className="card-title">Horizontal</h2> 
                <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente.</p> 
                <div className="card-actions">
                <button className="btn btn-primary">Get Started</button> 
                <button className="btn btn-ghost">More info</button>
                </div>
            </div>
    </div> 
    )
}

export default Profile;
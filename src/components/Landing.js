import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <section >
            <div >
                <div >
                    <h1>Media Library</h1>
                    <p>
                        Create/edit tags added to the uploaded file.
                     </p>
                    <div >
                        <Link to="/register">Sign Up</Link>
                        <Link to="/login">Sign In</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing
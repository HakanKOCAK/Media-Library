import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const Login = ({ }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [isAuthenticated, setIsAuthenticated] = useState();

    const { email, password } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault()
        setIsAuthenticated(true)
    }

    // Redirect if Logged in 
    if (isAuthenticated) {
        return <Redirect to='/files' />
    }

    return (
        <Fragment>
            <section >
                <h1 >Sign In</h1>
                <p><i className="fas fa-user"></i> Sign Into Your Account</p>
                <form onSubmit={e => onSubmit(e)}>
                    <div >
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            minLength="6"
                            value={password}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <input type="submit" value="Sign In" />
                </form>
                <p >
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(Login)
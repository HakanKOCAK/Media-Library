import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

const Register = ({ }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const [isAuthenticated, setIsAuthenticated] = useState();

    const onSubmit = async e => {
        e.preventDefault()
        setIsAuthenticated(true)
    }

    if (isAuthenticated) {
        return <Redirect to='/files' />
    }

    return (
        <Fragment>
            <section >
                <h1 >Sign Up</h1>
                <p ><i className="fas fa-user"></i> Create Your Account</p>
                <form onSubmit={e => onSubmit(e)}>
                    <div >
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            valıue={name}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div >
                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            valıue={email}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            valıue={password}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <div >
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            valıue={password2}
                            onChange={e => onChange(e)}
                        />
                    </div>
                    <input type="submit" value="Register" />
                </form>
                <p>
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(Register)
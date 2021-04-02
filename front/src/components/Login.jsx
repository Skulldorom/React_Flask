import React from 'react';
import {BrowserRouter as Router,Link} from "react-router-dom";
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import Cinput from '../small_parts/Input'

export default (props) => {
    const error = props.error;
    const status = props.status;
    if (status)
        return <div className="hero-body">    
        <div className="container">
            <div className="columns is-centered">
                    <div className="column is-three-fifths">
                        <h1 className="title">You are logged in!</h1>
                        <Router>
                            <Link to="/" className="button is-main is-large is-inverted is-rounded" btn_id="Home" onClick={props.change}>
                                Home
                            </Link>
                        </Router>
                    </div>
                </div>
            </div>
        </div>
    return <div className="hero-body">    
    <div className="container">
        <div className="columns is-centered">
                <div className="column is-three-fifths">
                    <h1 className="title">Login</h1>
                    <form onSubmit={(event) => props.login(event)} id="loginform" className="box">
                    {error ?(
                        <div className="container is-centered">
                            <span className="tag is-danger is-medium">Wrong email or password, please try again.</span>
                        </div>
                    ):(
                        <span></span>
                    )}

                    <Cinput name ="email" type="email" place="e.g. bobsmith@gmail.com" ico={faEnvelope} val={props.email} func={props.handle}  />
                    <Cinput name ="password" type="password" place="*********" ico={faLock} val={props.password} func={props.handle}  />
                    <div className="field">
                        <label className="checkbox"><input type="checkbox" name="remember" checked={props.remember} onChange={props.handle} /> Remember me </label>
                    </div>
                    <div className="field">
                        <button className="button is-main is-large is-rounded">
                        Login
                        </button>
                    </div>
                    <a className="">Forgot password?</a>
                    </form>
                    <div className="container has-text-centered">
                        <Router>
                            <Link to="/createac" className="button is-main is-large is-inverted is-rounded" btn_id="Create" onClick={props.change}>
                                Create account
                            </Link>
                        </Router>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
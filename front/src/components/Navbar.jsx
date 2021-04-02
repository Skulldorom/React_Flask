import React from 'react';
import {BrowserRouter as Router,Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faSignOutAlt, faUserAlt, faHome } from '@fortawesome/free-solid-svg-icons'

function LogCheck(props){
    if (props.props === true){
        const name = "Logout"
        return Button(name,'/logout',faSignOutAlt,props.func2)
    }
    else {
        const name = "Login"
        return Button(name,'/login',faSignInAlt,props.func)
    }
}

function Button(name,url,ico,func){
        return <div className="navbar-item">
            <Router><Link to={url} className="button is-main is-inverted" btn_id={name} onClick={func}>
                <span className="icon" >
                <FontAwesomeIcon icon={ico}/>
                </span>
                <span>{name}</span>
            </Link></Router>
        </div>
}

function NavItem(props){
    const active = props.act;
    const id = props.id;
    const url = props.url;
    const ico = props.ico;
    const func = props.func;

    return <Router><Link to={url} className={`navbar-item is-hidden-desktop ${active === id? 'is-active': ''}`} btn_id={id} onClick={func}>
    <span className="icon">
    <FontAwesomeIcon icon={ ico } />
    </span>
    <span> { id } </span>
    </Link></Router>
}

export default (props) => {
    return <div className="hero-head">
                <nav className="navbar is-fixed-top">
                <div className="container">
                    <div className="navbar-brand">
                    <span className="navbar-item">
                        <Router><Link to="/" className="title" btn_id="Home" onClick={props.change}>{props.title}</Link></Router>
                    </span>
                    <span className="navbar-burger" data-target="navbarMenuHeroA">
                        <span></span>
                        <span></span>
                        <span></span>                                                
                    </span>
                    </div>
                    <div id="navbarMenuHeroA" className="navbar-menu">
                    <div className="navbar-end">
                        {props.loggedin ?(
                            <div>
                                <span className="navbar-item"> Welcome {props.name} </span>
                                <NavItem act = {props.active} id= { "Home" } url="/" ico= { faHome } func = {props.change} />
                                <NavItem act = {props.active} id= { "Profile" } url="/profile" ico= { faUserAlt } func = {props.change}/>
                            </div>
                                ):(null)}
                        <LogCheck props= {props.loggedin} name = {props.name} func = {props.change} func2={props.logout}/>
                    </div>
                    </div>
                </div>
                </nav>
            </div>
}
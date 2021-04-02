import React from 'react';
import {BrowserRouter as Router,Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt, faHome } from '@fortawesome/free-solid-svg-icons'


function MenueItem(props){
    const active = props.act;
    const id = props.id;
    const url = props.url;
    const ico = props.ico;
    const func = props.func;

    return <li><Router><Link to={url} className={`${active === id? 'is-active': ''}`} btn_id={id} onClick={func}>
    <span className="icon">
    <FontAwesomeIcon icon={ ico } />
    </span>
    <span> { id } </span>
    </Link></Router></li>
}

export default (props) => {
    return <aside className="menue is-fixed">
                <ul className="menu-list">
                        <MenueItem act = {props.active} id= { "Home" } url="/" ico= { faHome } func = {props.change} />
                        <MenueItem act = {props.active} id= { "Profile" } url="/profile" ico= { faUserAlt } func = {props.change}/>
                </ul>
            </aside>
}
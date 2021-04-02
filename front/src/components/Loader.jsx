import React from 'react';
import logo from '../Infinity.svg'

export default (props) => {
    props.stop()
    return <div className="section">
        <div className="container has-text-centered">
            <img src={logo} className="App-logo" alt="logo" />
        </div>
    </div>
    
}
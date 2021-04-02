import React from 'react';

export default (props) => {
    return <div className="container has-text-centered">
        <p className="title">
            Welcome!
        </p>
        <p className="subtitle">
            {props.name}
        </p>
    </div>

}
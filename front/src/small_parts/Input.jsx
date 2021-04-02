import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default (props) => {
    const name = props.name;
    const capName = name[0].toUpperCase() + name.slice(1);
    return <div className="field">
    <p className="">        
        <span className="label">
            <span className="icon is-small">
                <FontAwesomeIcon icon={props.ico} />
            </span>
            <span> { capName } </span>
        </span>
    </p>
    <div className="control">
        <input type={props.type} placeholder={props.place} className="input" name={name} value={props.val} onChange={props.func} required />
    </div>
</div>
}
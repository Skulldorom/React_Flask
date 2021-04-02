import React from 'react';
import axios from 'axios'
const backend = 'http://localhost:5000'

function createdb (){
    const url = `db/create`    
    axios.get(`${backend}/`+url)
    // axios.get(url)     
    .then((res) => {
        console.log(res)            
        alert("Db created")
    })
    .catch((err) => {
      console.log(err);
    });
  }

export default (props) => {

    return <div className="hero-body">
        <div className="container has-text-centered">
        <p className="title">
            This is the Admin page
        </p>
        <p className="subtitle"> Be careful these controls have alot of power!!</p>
        <button className="button is-main is-inverted" onClick={createdb}>
                <span>Create Database</span>
        </button>
        </div>
    </div>
}
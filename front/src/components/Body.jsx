import React, { Component } from 'react';
import axios from 'axios'
import backend from '../index'
import IsLogedin from './IsLogedin'

function Nologin(){
    return <div className="container has-text-centered">
    <p className="title">
        Welcome to React Flask
    </p>
    <p className="subtitle">
        This app shows login functionality between react and flask
    </p>
    <img src="https://www.trusontechnologies.com/wp-content/uploads/2015/09/Custom-web-application-slider-1.png" alt=""></img>
</div>
}

class Body extends Component {
    constructor(props) {
    super(props);

    this.state = {
        name:props.name,
        token: props.token
    }

    }
    
    getinfo = () => {
        const url = `api/getinfo`
        const data = {token:this.state.token} 
        axios.post(`${backend}/`+url,data)
        // axios.get(url)     
        .then((res) => {
            console.log(res.data)
            this.setState({name: res.data.name}); 
            this.setState({message: res.data.data});         
        })
        .catch((err) => {
            console.log(err);
        });
        }

    componentDidMount() {
        if (this.state.token)  
            this.getinfo();
    }
        
    render() {
        return <div className="hero-body">
            {this.state.name?(
                <IsLogedin name={this.state.message} />
                ):(
                <Nologin />
                )}
        </div>
    }
};


export default Body;
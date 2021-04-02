import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUserCircle, faPhone, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import Cinput from '../small_parts/Input'
import axios from 'axios'
import backend from '../index'

class Create extends Component{
    constructor(props) {
        super(props);
        this.state = {
            createform:{
            email:'',
            'first name':'',
            'last name':'',
            tel:'',
            password:'',
            'confirm password':''
            },
            same:false,
            error:false,
            created:false,
            message:'that email already exists'

        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.checkpass = this.checkpass.bind(this);
    }

    checkpass(){
        setTimeout(() => {
        const data = {...this.state.createform}
        if (data.password !== data['confirm password'] || data.password === "" )
            this.setState({same: false});            
        else
            this.setState({same: true});
        }, 100);
    }

    handleChange(event) { 
        const obj = {};
        obj['createform'] = {...this.state.createform}
        obj['createform'][event.target.name] = event.target.value;
        this.setState(obj);
        this.checkpass();
    };

    handleCreate = (event) => {
        event.preventDefault();

        const url = `auth/create`
        const data = {...this.state.createform}      
        if (data.password !== data['confirm password'] || data.password === '')
            return
        //axios.post(url, data)
        axios.post(`${backend}/`+url, data)    
          .then((res) => {
            console.log(res)
            this.setState({error:false});
            this.setState({created:true});             
            this.setState({createform: {email:'','first name':'','last name':'',tel:'',password:'','confirm password':''}});
          })
          .catch((err) => {
            console.log(err.response.data);
            this.setState({error:true});
            this.setState({message:err.response.data.message});
          });
    };

    render() {
    return <div className="hero-body">    
    <div className="container">
        <div className="columns is-centered">
                <div className="column is-three-fifths">
                    <h1 className="title">Create Account</h1>
                    {this.state.created? (
                        <div className="notification is-success"><strong>Account Created</strong>, please go login.</div>
                    ):(null)}
                    {this.state.error? (
                        <div className="notification is-danger"><strong>There was an issue</strong>, {this.state.message}</div>
                    ):(null)}                    
                    <form onSubmit={(event) => this.handleCreate(event)} id="createform" className="box">
                    <Cinput name ="email" type="email" place="e.g. bobsmith@gmail.com" ico={faEnvelope} val={this.email} func={this.handleChange}  />
                    <Cinput name ="first name" type="text" place="Bob" ico={faUserCircle} val={this.fname} func={this.handleChange}  />
                    <Cinput name ="last name" type="text" place="Smith" ico={faUserCircle} val={this.lname} func={this.handleChange}  />
                    <div className="field">
                        <p className="">        
                            <span className="label">
                                <span className="icon is-small">
                                    <FontAwesomeIcon icon={faPhone} />
                                </span>
                                <span> Phone number +254 </span>
                            </span>
                        </p>
                        <div className="control">
                            <input type="tel" placeholder="701234567" className="input" name="tel" value={this.tel} onChange={this.handleChange} pattern="[0-9]{3}[0-9]{3}[0-9]{3}" required />
                        </div>
                    </div>
                    <Cinput name ="password" type="password" place="*********" ico={faLock} val={this.password} func={this.handleChange}  />
                    <Cinput name ="confirm password" type="password" place="*********" ico={faLock} val={this.confirmpassword} func={this.handleChange}/>
                    {this.state.same ?(
                        <span className="tag is-medium is-success">
                        <span className="icon is-small">
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </span>
                        <span> Passwords match</span>
                        </span>
                        ):(
                        <span className="tag is-medium is-danger">
                        <span className="icon is-small">
                            <FontAwesomeIcon icon={faTimesCircle} />
                        </span>
                        <span> Passwords do not match</span>
                        </span>
                        )}
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="button is-main is-rounded" type="submit">
                                Submit
                            </button>
                        </div>
                        <div className="control">
                            <button className="button is-warning is-rounded" type="reset">
                                Reset
                            </button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    }
}

export default Create;
import React, { Component } from 'react';
import handleClick from './utils/restClient';
import axios from 'axios'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import backend from './index'


import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Foot from './components/Foot'
import Loader from './components/Loader'
import event from './Event'

import Body from './components/Body'
import Profile from './components/profile'
import Login from './components/Login'
import Create from './components/CreateAC'
import Admin from './components/Admin'
event()

const appname = "React Flask"

class Base extends Component {
    constructor(props){
    super(props);
    
    this.state = {
        loading: true,
        disp:"Home",
        active: 'Home',
        loggedin:false,
        name:"",
        logerror:false,
        token:'',
        loginform: {
            email:'',
            password:'',
            remember : false
        }
    };
    this.handleClick = handleClick.bind(this);
    this.ChangeTo = this.ChangeTo.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.stopLoading = this.stopLoading.bind(this);
    this.logout = this.logout.bind(this);

    document.title = appname
    

    } 

    addActiveClass(e){
        //const clicked = e.target.getAttribute("btn_id");
        const clicked = e
        if(this.state.active !== clicked) { 
            this.setState({active: clicked})
        }
    }

    ChangeTo(e){
        const data = e.currentTarget.getAttribute("btn_id");
        this.addActiveClass(data)
        this.setState({disp: data});
        this.setState({loading: true});
    }

    stopLoading(){
        setTimeout(() => {
            this.setState({loading: false});
          }, 500);
    }

    handleChange(event) { 
        const obj = {};
        obj['loginform'] = {...this.state.loginform}
        if (event.target.name !== "remember")
            obj['loginform'][event.target.name] = event.target.value;
        else
            obj['loginform'][event.target.name] = event.target.checked;
        this.setState(obj);
      };

    handleChangechk(event) { 
    const obj = {};
    obj['loginform'] = {...this.state.loginform}
    obj['loginform'][event.target.name] = event.target.checked;
    this.setState(obj);
    };

    handleLogin = (event) => {
        event.preventDefault();
        const url = `auth/login`
        const data = {...this.state.loginform}      
        
        //axios.post(url, data)
        axios.post(`${backend}/`+url, data)    
          .then((res) => {     
            this.setState({logerror: false});
            this.setState({loggedin: true});
            this.setState({name:res.data.name});
            this.setState({loginform: {
                email:'',
                password:'',
                remember : false
            }});
            this.setState({token:res.data.access_token});
            if (data.remember){
                localStorage.setItem('access_token', res.data.access_token);            
                window.location.replace("/")}

          })
          .catch((err) => {
            this.setState({logerror: true});
            console.log(err);
          });
      }

    loggedin = () => {
        this.setState({token:localStorage.getItem("access_token")});
        setTimeout(() => {
            const url = `auth/loggedin`
            const data = {token:this.state.token}    
            axios.post(`${backend}/`+url,data)
            // axios.get(url)     
            .then((res) => {            
                this.setState({loggedin: res.data.value});
                this.setState({name:res.data.name});
            })
            .catch((err) => {
            console.log(err);
            });
          }, 100);
    }
    
    logout(){
        console.log("logout");
        this.setState({loggedin: false});
        this.setState({name:''});
        this.setState({token:''});
        localStorage.setItem('access_token', null);
        window.location.replace("/")
    }

    componentDidMount() {
        if (localStorage.getItem("access_token")!== 'null')
            this.loggedin();
    }     

    render() {
        return (
            <section className="hero is-main is-fullheight-with-navbar">
                <Navbar 
                 title= {appname}
                 change = {this.ChangeTo}
                 loggedin = {this.state.loggedin}
                 name = {this.state.name}
                 active= {this.state.active}
                 logout = {this.logout}
                 />
                 <div className="hero-body">
                 <div className="columns is-main">
                    {this.state.loggedin?(
                        <div className="column is-one-fifth is-hidden-mobile is-sidebar">
                        <Sidebar
                            change = {this.ChangeTo}
                            loggedin = {this.state.loggedin}
                            name = {this.state.name}
                            active= {this.state.active}
                            logout = {this.logout}
                        />
                    </div>
                    ):(null)}                    
                    <div className="column">
                        {this.state.loading ? (
                        <Loader stop = {this.stopLoading} />
                        ) : (
                        <Router>
                            <Switch>
                                <Route path="/profile">
                                    <Profile props = {{name: this.state.name}}  />
                                </Route>
                                <Route path="/login">
                                    <Login login= {this.handleLogin} handle = {this.handleChange} change = {this.ChangeTo} error = {this.state.logerror} status = {this.state.loggedin}/>
                                </Route>
                                <Route path="/logout">
                                    <Body props = {{name: ""}}  />
                                </Route>
                                <Route path="/createac">
                                    <Create />
                                </Route>
                                <Route path="/adorom">
                                    <Admin />
                                </Route>
                                <Route path="/">
                                    <Body name = {this.state.name} token = {this.state.token} />
                                </Route>
                            </Switch>
                        </Router>
                        )}
                        </div>
                    </div>
                 </div>
                <Foot id={'Foot'} />
            </section>
                );
            }
}

export default Base;
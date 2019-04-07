import React, { Component } from 'react';
import logo from './imgs/logo-blue.png';
import './Home.css';

class Home extends Component {

  addRoom = () => {
    var xhttp = new XMLHttpRequest(), data = {"name": this.state.roomName};
    xhttp.open("POST", "http://api.rhythmes.com/"+"/addRoom/", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onload = function(data){
      let response = JSON.parse(this.responseText);
      if(response.data && response.data.id){
        window.location.href="/room/"+response.data.id;
      }
      console.log(data);
    }
    xhttp.onerror=function(error){
      console.log(error);
    }
    xhttp.send(JSON.stringify(data));
  }

  inputChanged = (e) => {
    this.setState({roomName: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <img className="home-logo" src={logo} alt="home-logo"/>
        <div className="ask-room">
            <h2>get a room</h2>
            <input type="text" placeholder="Enter Room Name" onChange={this.inputChanged}/>
            <div className="add-room" onClick={()=>{this.addRoom()}}>
            Add Room
            </div>
        </div>
      </div>
    );
  }
}

export default Home;

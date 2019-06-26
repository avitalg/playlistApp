import React, { Component } from 'react';
import logo from './imgs/logo-2colors.png';
import './css/Home.css';
import Loader from './Loader';
import axios from 'axios';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loader: false
    }
  }

  addRoom = () => {
    this.setState({ loader: true });
    var data = { "name": this.state.roomName }, that = this;
    axios.post(process.env.REACT_APP_API_URL + "/addRoom/", data)
      .then(res => {
        that.setState({ loader: false });
        // let response = JSON.parse(this.responseText);
        if (res.data && res.data.data && res.data.data._id) {
          window.location.href = "/room/" + res.data.data._id;
        }
        console.log(res);
      });
  }

  inputChanged = (e) => {
    this.setState({ roomName: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <img className="home-logo" src={logo} alt="home-logo" />
        <div className="ask-room">
          <h2>get a room</h2>
          <input type="text" placeholder="Enter Room Name" onChange={this.inputChanged} />
          {(!this.state.loader) ?
            <div className="add-room site-btn" onClick={() => { this.addRoom() }}>
              Add Room
           </div> :
            <Loader />
          }

        </div>
      </div>
    );
  }
}

export default Home;

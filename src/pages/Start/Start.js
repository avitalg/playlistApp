import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import './Start.scss';

class Start extends Component {
  constructor() {
    super();
    this.state = {
      loader: false
    }
  }

  addRoom = () => {
    this.setState({ loader: true });
    var data = { 'name': this.state.roomName }, that = this;
    axios.post(`${process.env.REACT_APP_API_URL}/addRoom/`, data)
      .then(res => {
        that.setState({ loader: false });
        if (res.data && res.data.data && res.data.data._id) {
          window.location.href = `/room/${res.data.data._id}`;
        }
        console.log(res);
      });
  }

  inputChanged = (e) => {
    this.setState({ roomName: e.target.value });
  }

  render() {
    return (
      <div className='App'>
        <div className='ask-room'>
          <h2>get a room</h2>
          <input type='text' placeholder='Enter Room Name' onChange={this.inputChanged} />
          {(!this.state.loader) ?
            <div className='add-room site-btn' onClick={() => { this.addRoom() }}>
              Add Room
           </div> :
            <Loader />
          }
        </div>
      </div>
    );
  }
}

export default Start;

import React, { Component } from 'react';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import MusicList from '../../components/MusicList/MusicList';
import MediaPlayer from '../../components/MediaPlayer/MediaPlayer';
import Share from '../../components/Share/Share';
import Search from '../../components/Search/Search';
import Private from '../../components/Private/Private';
import './Room.scss';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'test',
      currUri: '#',
      currId: -1,
      end: false,
      error: false,
      searchType: 'text',
      searchTO: null,
      socket: socketIOClient(process.env.REACT_APP_API_URL)
    }

    this.changeMusic = this.changeMusic.bind(this);
  }

  componentWillUnmount() {
    this.state.socket.off('get_data');
  }

  componentDidMount() {
    this.state.socket.emit('initial_data', { '_id': this.props.match.params.number });
    this.state.socket.on('get_data', this.newDataHandler);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //last song on the list wont change currUri;
    if (this.state.currId == -1 && prevState.currId != 1) {
      return;
    }

    if (this.state.currId !== prevState.currId && this.state.result.list) {
      this.setState({ currUri: this.getUriById(this.state.currId) });
      this.updateCurrVid();
    }
  }

  updateCurrVid = () => {
    if (!this.state.currId || this.state.currId == -1) {
      this.setState({ end: true });
      return;
    }

    axios.put(`${process.env.REACT_APP_API_URL}/updateCurrVid/${this.props.match.params.number}/${this.state.currId}`).then(response => {
      if (response.status !== 200 || response.data.status !== 'success') {
        console.log(`Request failed.  Returned status of ${response.status}`);
      }
    })
  }

  newDataHandler = (data) => {
    if (!data || data.status === 'failure') {
      window.location.href = '/404';
      return;
    }

    this.setState({ result: data, error: false });
    let nextVidId = this.getNextVidId();
    if (this.state.currId == -1 && nextVidId != -1 && !this.state.end) {
      //first video
      if (!data.play) return this.setState({ currId: nextVidId })
      this.setState({ currId: data.play })
    }
    if (this.state.end && nextVidId != -1) {
      this.setState({ currId: nextVidId, end: false })
    }

  }

  changeMusic = (itemId, event) => {
    let curr;
    if (!this.state.result || !this.state.result.list) {
      return -1;
    }
    curr = this.state.result.list.find((item) => item._id == itemId);
    this.setState({ currUri: curr.uri, currId: curr._id });
  }

  getNextVidId = () => {
    let index;

    if (!this.state.result || !this.state.result.list) {
      return -1;
    }
    //first vid
    if (this.state.currId == -1 && this.state.result.list.length > 0) {
      return this.state.result.list[0]._id;
    }
    //next vid
    index = this.state.result.list.findIndex(item => item._id == this.state.currId);
    if (index > -1 && index != this.state.result.list.length - 1) {
      return this.state.result.list[index + 1]._id;
    }
    return -1;
  }

  getUriById = (vidId) => {
    let vid;
    if (this.state.result && this.state.result.list && this.state.result.list.length > 0) {
      vid = this.state.result.list.find(item => item._id == vidId);
      if (vid) {
        return vid.uri;
      }
    }
    return "#";
  }

  onPlayerStateChange = (event) => {
    //end of playlist
    let nextVid = this.getNextVidId();
    if (event.data == 0 && nextVid == -1) {
      this.setState({ end: true });
    }
    //move to next video
    else if (event.data === 0) {
      this.setState({ currId: nextVid })
    }
  }

  addMusic = (vidId) => {
    this.state.socket.emit('add_to_list', {
      _id: this.props.match.params.number,
      uri: `https://www.youtube.com/watch?v=${vidId}`
    });
  }

  render() {
    return (
      <div className='App'>
        <h1>{this.state.result.name}</h1>
        <div className='show-room'>
          <Search socket={this.state.socket} searchType={this.state.searchType} addMusic={this.addMusic} roomId={this.props.match.params.number} />
          <Share />
          <Private private='private' />
          <div className='media-container'>
            <MediaPlayer uri={this.state.currUri} change={this.onPlayerStateChange} />
            <MusicList list={this.state.result.list} currUri={this.state.currUri} click={this.changeMusic} />
          </div>
        </div>
      </div>
    );
  }
}

export default Room;

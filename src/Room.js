import React, { Component } from 'react';
import axios from 'axios';
import './css/Room.css';
import MusicList from './MusicList';
import MediaPlayer from './MediaPlayer';
import MusicItem from './MusicItem';
import Loader from './Loader';
import { socket } from "./Header";

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "test",
      currUri: "#",
      currId: -1,
      end: false,
      loader: false,
    }

    this.changeMusic = this.changeMusic.bind(this);
  }

  componentWillUnmount() {
    socket.off("get_data");
  }

  componentDidMount() {
    socket.emit("initial_data", { "_id": this.props.match.params.number });
    socket.on("get_data", this.newDataHandler);
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

    axios.put(process.env.REACT_APP_API_URL + "/updateCurrVid/" + this.props.match.params.number + "/" + this.state.currId).then(response => {
      if (response.status !== 200 || response.data.status != "success") {
        console.log('Request failed.  Returned status of ' + response.status);
      }
    })
  }

  newDataHandler = (data) => {
    this.setState({ result: data });
    if (this.state.currId == -1 && this.getNextVidId() != -1 && !this.state.end) {
      this.setState({ currId: data.play })
    }
    if (this.state.end && this.getNextVidId() != -1) {
      this.setState({ currId: this.getNextVidId(), end: false })
    }
  }

  addToList = () => {
    let that = this, data = { uri: that.state.addUri };
    this.setState({ loader: true });
    axios.put(process.env.REACT_APP_API_URL + "/addToList/" + this.props.match.params.number, data).then(response => {
      that.setState({ loader: false });
      if (response.status !== 200 || response.data.status != "success") {
        that.setState({ error: true });
        console.log('Request failed.  Returned status of ' + response.status);
      }
    })
  }

  showList = () => {
    let list;
    if (this.state.result.list) {
      list = this.state.result.list.map(item => {
        return (
          <MusicItem {...item} />
        )
      })
    }
    return list;
  }

  check = () => {
    console.log(this.state.result);
  }

  changeMusic = (itemId, event) => {
    let item;
    for (let i = 0; i < this.state.result.list.length; i++) {
      item = this.state.result.list[i];
      if (item._id == itemId) {
        this.setState({ currUri: item.uri, currId: item._id });
        return;
      }
    }
  }

  changedSong = (e) => {
    this.setState({ addUri: e.target.value });
  }

  getNextVidId = () => {
    if (this.state.currId == -1 && this.state.result.list.length > 0) {
      return this.state.result.list[0]._id;
    }
    for (let i = 0; i < this.state.result.list.length - 1; i++) {
      if (this.state.result.list[i]._id == this.state.currId) {
        return this.state.result.list[i + 1]._id;
      }
    }
    return -1;
  }

  getUriById = (vidId) => {
    for (let i = 0; i < this.state.result.list.length; i++) {
      if (this.state.result.list[i]._id == vidId) {
        return this.state.result.list[i].uri;
      }
    }
    return "#";
  }

  onPlayerStateChange = (event) => {
    //end of playlist
    if (event.data == 0 && this.getNextVidId() == -1) {
      this.setState({ end: true });
    }
    //move to next video
    else if (event.data === 0) {
      this.setState({ currId: this.getNextVidId() })
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Room {this.state.result.name}</h1>
        <div className="show-room">
          <div className="add-media">
            <input type="url" onChange={this.changedSong} placeholder="https://www.youtube.com/watch?v=video_id" />
            {
              (!this.state.loader) ?
                <button onClick={this.addToList}>Add</button> :
                <Loader />
            }
            {(this.state.error) ? <div className="error">
              Wrong Uri
            </div> : null}
          </div>
          <div className="media-container">
            <div className="player">
              <MediaPlayer uri={this.state.currUri} change={this.onPlayerStateChange} />
            </div>
            <div className="list">
              <MusicList list={this.state.result.list} currUri={this.state.currUri} click={this.changeMusic} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Room;

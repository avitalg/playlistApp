import React, { Component } from 'react';
import axios from 'axios';
import './css/Room.css';
import MusicList from './MusicList';
import MediaPlayer from './MediaPlayer';
import MusicItem from './MusicItem';
import SearchList from './SearchList';
import Loader from './Loader';
import socketIOClient from "socket.io-client";
import debounce from 'debounce';

class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "test",
      currUri: "#",
      currId: -1,
      end: false,
      loader: false,
      errorMsg: "Oops! Something went wrong ",
      searchType: "text",
      songList: [],
      showSearchList: false,
      searchTO: null,
      socket: socketIOClient(process.env.REACT_APP_API_URL)
    }

    this.changeMusic = this.changeMusic.bind(this);
  }

  componentWillUnmount() {
    this.state.socket.off("get_data");
  }

  componentDidMount() {
    this.state.socket.emit("initial_data", { "_id": this.props.match.params.number });
    this.state.socket.on("get_data", this.newDataHandler);
    this.state.socket.on("search_song", this.newSearchList);
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
    if (!data || data.status === 'failure') {
      this.setState({ error: true });
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

  addToList = () => {
    let that = this;
    this.state.socket.emit('add_to_list', {
      _id: this.props.match.params.number,
      uri: that.state.addUri
    });
  }

  showList = () => {
    let list;
    if (this.state.result.list) {
      list = this.state.result.list.map(item => (<MusicItem {...item} />));
    }
    return list;
  }

  changeMusic = (itemId, event) => {
    let curr;
    curr = this.state.result.list.find((item) => item._id == itemId);
    this.setState({ currUri: curr.uri, currId: curr._id });
  }

  changedSong = (e) => {
    this.setState({ addUri: e.target.value });
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
    if (event.data == 0 && this.getNextVidId() == -1) {
      this.setState({ end: true });
    }
    //move to next video
    else if (event.data === 0) {
      this.setState({ currId: this.getNextVidId() })
    }
  }

  newSearchList = (result) => {
    if (!result || result.status === 'failure') {
      this.setState({ error: true, showSearchList: false });
      return;
    }
    let songList = [];
    for (let i = 0; i < result.length; i++) {
      songList.push({ title: result[i].title, desc: result[i].description, img: result[i].thumbnails.default.url, id: result[i].sid });
    }
    this.setState({ songList: songList, error: false, showSearchList: true });
  }

  debounceSearch = debounce(function (query) {
    if (query.length < 3) {
      this.setState({ showSearchList: false });
      return;
    }
    this.state.socket.emit('search_song', {
      _id: this.props.match.params.number,
      q: query
    });
  }, 700);

  searchSong = (e) => {
    this.debounceSearch(e.target.value);

    this.setState({
      showSearchList: false
    });
  }

  addMusic = (vidId) => {
    this.setState({ showSearchList: false });
    this.state.socket.emit('add_to_list', {
      _id: this.props.match.params.number,
      uri: "https://www.youtube.com/watch?v=" + vidId
    });
  }

  searchMethod = (type = "text") => {
    switch (type) {
      case "url":
        return (
          <input type="url" onChange={this.changedSong} placeholder="https://www.youtube.com/watch?v=video_id" />
        )

      case "text":
        return <div><input type="text" onKeyUp={this.searchSong} placeholder="Enter a song name..." />
          {(this.state.showSearchList) ? <SearchList list={this.state.songList} click={this.addMusic} /> : null}
        </div>
    }

  }

  render() {
    return (
      <div className="App">
        <h1>{this.state.result.name}</h1>
        <div className="show-room">
          <div className="add-media">
            {this.searchMethod(this.state.searchType)}
            {(this.state.error) ? <div className="error">
              {this.state.errorMsg}
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

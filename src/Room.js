import React, { Component } from 'react';
import './Room.css';
import MusicList from './MusicList';
import MediaPlayer from './MediaPlayer';

class Room extends Component {
  constructor() {
    super();
    this.state = {
      result: "test",
      currUri: "#",
      currId: -1,
      end: false
    }
  }

  componentDidMount() {
    this.getRoomData();
    setInterval(this.getRoomData, 10000);
  }

componentDidUpdate(prevProps, prevState, snapshot){

    if (this.state.currId !== prevState.currId && this.state.result.list && this.state.currId<this.state.result.list.length) {
      this.setState({currUri: this.state.result.list[this.state.currId].uri});
      this.updateCurrVid();
    }

  }

  updateCurrVid = () =>{
    let xhttp = new XMLHttpRequest(), that = this;
    xhttp.open("PUT", "http://localhost:8080/updateCurrVid/"+this.props.match.params.number+"/"+this.state.currId, true);
    xhttp.onload = function() {
      let resObj = JSON.parse(xhttp.responseText);
      console.log("update curr vid" );
      if (xhttp.status === 200 && resObj.status == "success" && resObj.data !=null) {
          that.newDataHandler(resObj.data);
      } else if(xhttp.status !== 200 || resObj.status == "failure" ){
          console.log('Request failed.  Returned status of ' + xhttp.status);
      }
    };
    xhttp.send();
  }

  newDataHandler = (data) =>{
     this.setState({result : data });
      if(this.state.currId == -1 && data.list.length>0){
        this.setState({currId:data.play, currUri:data.list[0].uri})
      }
      if(this.state.end && this.state.currId<data.list.length-1){
        this.setState({currId:this.state.currId+1, end:false})
      }
  }

  getRoomData = () =>{
    let xhttp = new XMLHttpRequest(), that = this;
    xhttp.open("GET", process.env.REACT_APP_BASE_URL+"/getRoom/"+this.props.match.params.number, true);
    xhttp.onload = function() {
      let resObj = JSON.parse(xhttp.responseText);
      console.log(resObj );
      if (xhttp.status === 200 && resObj.status == "success" && resObj.data !=null) {
          that.newDataHandler(resObj.data);
      }
      else if(xhttp.status !== 200 || resObj.status == "failure" ){
          console.log('Request failed.  Returned status of ' + xhttp.status);
      }
    };
    xhttp.send();
  }

  addToList = () => {
      let xhttp = new XMLHttpRequest(), that = this, data={uri:that.state.addUri};
      xhttp.open("PUT", process.env.REACT_APP_BASE_URL+"/addToList/"+that.props.match.params.number, true);
      xhttp.setRequestHeader("Content-type", "application/json");
      xhttp.onload = function() {
        console.log(xhttp.responseText );
        let resObj = JSON.parse(xhttp.responseText);
        if (xhttp.status === 200 && resObj.status == "success" && resObj.data !=null && resObj.data.list.length>0) {
          that.newDataHandler(resObj.data);
        }
        else {
            that.setState({error:true});
        }
      };
      xhttp.send(JSON.stringify(data));
  }

  showList = () => { 
    let list;
    if(this.state.result.list){
      list = this.state.result.list.map(item=>{
      return(
        <div key={item.id}>
        {item.uri}
        </div>
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
    for(let i=0; i<this.state.result.list.length; i++){
      item = this.state.result.list[i];
      if(item.id == itemId){
        console.log("found");
        this.setState({currUri : item.uri, currId: i});
        return;
      } 
    }

    console.log("no");
  }

  changedSong = (e) =>{
        this.setState({addUri: e.target.value});
  }

  onPlayerStateChange = (event) => {
        console.log("check");
        console.log(event.data);
        if(event.data === 0 &&  this.state.currId<this.state.result.list.length-1) {          
          this.setState({currId:this.state.currId+1})
        }
        if(event.data == 0 &&  this.state.currId == this.state.result.list.length-1) {
          this.setState({end: true});
        }
      }

  render() {
    return (
      <div className="App">
        <h1>Room {this.state.result.name}</h1>
        <div className="show-room" onClick={this.check}>
        <div className="add-media">
            <input type="url" onChange={this.changedSong} placeholder="https://www.youtube.com/watch?v=video_id"/>
            <button onClick={this.addToList}>Add</button>
            {(this.state.error)?<div className="error">
              Wrong Uri
            </div>:null}
        </div>
        <div className="media-container">
          <div className="player">
            <MediaPlayer uri={this.state.currUri} change={this.onPlayerStateChange}/>
          </div>
          <div className="list">
            <MusicList list={this.state.result.list} currUri={this.state.currUri} click={this.changeMusic}/>
          </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Room;

import React, { Component } from 'react';
import './css/MediaPlayer.css';
import YouTube from 'react-youtube';

class MediaPlayer extends Component {
  constructor() {
    super();
    var tag = document.createElement('script');
    this.state = {
      options: {
        height: '390',
        width: this.selectWidthByDevice(),
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          rel: 0,
          showinfo: 0,
          ecver: 2
        }
      },
      player: null,
      done: false
    }
    // tag.src = "https://www.youtube.com/iframe_api";
    // var firstScriptTag = document.getElementsByTagName('script')[0];
    // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  }

  selectWidthByDevice = () => {
    if(window.innerWidth <= 768) {
      return '640';
    } 
    return '100%';
  }


  onPlayerReady = (event) => {
    event.target.playVideo();
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.

  stopVideo = () => {
    // player.stopVideo();
  }

  getId = (url) => {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return "false";
    }
  }

  getUrl = () => {
    return "//www.youtube.com/embed/" + this.getId(this.props.uri);
  }

  render() {
    return (
      (this.getId(this.props.uri) === "false")? <div className='empty-vid'></div> : 
      <YouTube
        videoId={this.getId(this.props.uri)}
        opts={this.state.options}
        onReady={this.onPlayerReady}
        onStateChange={this.props.change}
      />
    );
  }
}

export default MediaPlayer;

import React, { Component } from 'react';
import './css/MediaPlayer.css';
import YouTube from 'react-youtube';

class MediaPlayer extends Component {
  constructor() {
    super();
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
  }

  selectWidthByDevice = () => {
    if (window.innerWidth <= 768) {
      return '640';
    }
    return '100%';
  }

  onPlayerReady = (event) => {
    event.target.playVideo();
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

  showVid = () => {
    return (
      (this.getId(this.props.uri) === "false") ? <div className='empty-vid'></div> :
        <YouTube
          videoId={this.getId(this.props.uri)}
          opts={this.state.options}
          onReady={this.onPlayerReady}
          onStateChange={this.props.change}
        />
    );
  }

  render() {
    return (
      <div className="player">
        {this.showVid()}
      </div>
    );
  }
}

export default MediaPlayer;

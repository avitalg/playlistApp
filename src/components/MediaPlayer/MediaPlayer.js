import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './MediaPlayer.scss';

class MediaPlayer extends Component {
  constructor(props) {
    super(props);
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
    } 
    return false;
  }

  getUrl = () => {
    return `//www.youtube.com/embed/${this.getId(this.props.uri)}`;
  }

  showVid = () => {
    const { uri, change } = this.props;
    return (
      (this.getId(uri)) ? <div className='empty-vid'></div> :
        <YouTube
          videoId={this.getId(uri)}
          opts={this.state.options}
          onReady={this.onPlayerReady}
          onStateChange={change}
        />
    );
  }

  render() {
    return (
      <div className='player'>
        {this.showVid()}
      </div>
    );
  }
}

export default MediaPlayer;

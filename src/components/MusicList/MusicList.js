import React, { Component } from 'react';
import MusicItem from '../MusicItem/MusicItem';
import './MusicList.scss';

class MusicList extends Component {
  render() {
    return (
      <div className='list'>
        <div className='MusicList'>
          {
            (this.props.list && this.props.list.length > 0) ?
              this.props.list.map(item => {
                return (<MusicItem id={item._id} curr={this.props.currUri === item.uri} title={item.title} click={this.props.click} key={item._id} />)
              }) : <div className='empty-list'>Empty List</div>
          }
        </div>
      </div>
    );
  }
}

export default MusicList;

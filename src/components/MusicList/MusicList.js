import React, { Component } from 'react';
import MusicItem from '../MusicItem/MusicItem';
import './MusicList.scss';

class MusicList extends Component {
  render() {
    const { list, currUri, click } = this.props;
    return (
      <div className='list'>
        <div className='MusicList'>
          {
            (list && list.length > 0) ?
              list.map(item => {
                return (
                <MusicItem 
                  id={item._id} 
                  curr={currUri === item.uri} 
                  title={item.title} 
                  click={click} 
                  key={item._id} 
                  />)
              }) : <div className='empty-list'>Empty List</div>
          }
        </div>
      </div>
    );
  }
}

export default MusicList;

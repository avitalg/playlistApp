import React, { Component } from 'react';
import './css/MusicList.css';

class MusicList extends Component {
  render() {
    return (
      <div className="MusicList">
      {
        (this.props.list && this.props.list.length>0)?
        this.props.list.map(item => {
        return (<div className="MusicItem" data-id={item.id} data-curr={this.props.currUri == item.uri} onClick={(e)=> this.props.click && this.props.click(item.id,e)} key={item.id}>
          {item.title}
        </div> )
      }) : <div class="empty-list">Empty List</div>
      }
      </div>
    );
  }
}

export default MusicList;

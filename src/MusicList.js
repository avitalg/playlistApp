import React, { Component } from 'react';
import './css/MusicList.css';

class MusicList extends Component {
  render() {
    return (
      <div className="MusicList">
        {
          (this.props.list && this.props.list.length > 0) ?
            this.props.list.map(item => {
              return (<div className="MusicItem" data-id={item._id} data-curr={this.props.currUri == item.uri} onClick={(e) => this.props.click && this.props.click(item._id, e)} key={item._id}>
                <span>
                  {item.title}
                </span>
              </div>)
            }) : <div className="empty-list">Empty List</div>
        }
      </div>
    );
  }
}

export default MusicList;

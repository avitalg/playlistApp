import React, { Component } from 'react';
import './css/SearchList.css';

class SearchList extends Component {
  render() {
    return (
      (this.props.list && this.props.list.length > 0) ?
        <div className='search-list'><ul>{this.props.list.map((item, index) => <li key={index} className="song" onClick={() => this.props.click(item.id)}><span>{item.title}</span><img src={item.img} /></li>)}</ul>
        </div> :
        <div>Can't Find</div>
    );
  }
}

export default SearchList;

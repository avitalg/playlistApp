import React from 'react';
import './SearchList.scss';

const SearchList = (props) => (
  (props.list && props.list.length > 0) ?
    <div className='search-list'>
      <ul>{props.list.map((item, index) => 
        <li key={index} className='song' onClick={() => props.click(item.id)}>
          <span>{item.title}</span>
          <img src={item.img} alt={item.title}/>
        </li>
        )}
      </ul>
    </div> :
    <div>Can't Find</div>
);

export default SearchList;

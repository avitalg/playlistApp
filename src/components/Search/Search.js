import React, { useState, useEffect } from 'react';
import debounce from 'debounce';
import SearchList from '../SearchList/SearchList';
import './Search.scss';

function Search(props) {
    const [showSearchList, setShowSearchList] = useState(false);
    const [songList, setSongList] = useState([]);
    const [error, setError] = useState(false);
    const [errMsg, setErrMsg] = useState('Oops! Something went wrong');

    useEffect(() => {
        props.socket.on('search_song', newSearchList);
    }, []);

    const addMusic = (result) => {
        props.addMusic(result);
        setSongList(false);
        setShowSearchList(false);
    }

    const searchMethod = (type = 'text') => {
        switch (type) {
            case 'url':
                return (
                    <input type='url' onChange={this.changedSong} placeholder='https://www.youtube.com/watch?v=video_id' />
                )

            case 'text':
                return <div><input type='text' onKeyUp={searchSong} placeholder='Enter a song name...' />
                    {showSearchList && <SearchList list={songList} click={addMusic} />}
                </div>
        }

    };

    const newSearchList = (result) => {
        if (!result || result.status === 'failure') {
            setShowSearchList(false);
            setError(true);
            return;
        }
        let songList = [];
        for (let i = 0; i < result.length; i++) {
            songList.push({ 
                title: result[i].title, 
                desc: result[i].description, 
                img: result[i].thumbnails.default.url, 
                id: result[i].sid 
            });
        }
        setSongList(songList);
        setShowSearchList(true);
        setError(false);
    }

    const debounceSearch = debounce(function (query) {
        if (query.length < 3) {
            setShowSearchList(false);
            return;
        }
        props.socket.emit('search_song', {
            _id: props.roomId,
            q: query
        });
    }, 700);

    const searchSong = (e) => {
        debounceSearch(e.target.value);
        setShowSearchList(false);
    }

    const errorMsg = () => {
        let result = (error) ? <div className='error'>
            {errMsg}
        </div> : null
        return result;
    }

    return (
        <div className='add-media'>
            {searchMethod(props.searchType)}
            {errorMsg()}
        </div>
    )
};

export default Search;




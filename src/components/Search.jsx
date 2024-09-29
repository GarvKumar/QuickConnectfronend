import React from 'react'

const Search = () => {
    return (
        <div className='search'>
            <div className="searchForm">
                <input type="text" placeholder='Find a user'/>
            </div>
            <div className="userChat">
                <img src="https://i.pinimg.com/564x/be/3c/55/be3c55a51e534e80169233165703dae8.jpg" alt="" />
                <div className="userChatInfo">
                    <span>Jane</span>
                </div>            
            </div>
        </div>
    )
}

export default Search;
import React from 'react'
import Login from './Login'

export default class Header extends React.Component{
    render() {
        return (
            <div className='header flex-row'>
                <i className='fab fa-steam' />
                <p className='p-big'>Games that masochists love.</p>
                <Login />
            </div>
        )
    }
}
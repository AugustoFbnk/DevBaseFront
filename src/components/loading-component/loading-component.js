import React, { Component, useContext } from 'react';
import './../loading-component/loading-component.css';
import LoadingContext from '../../contexts/loading-context';
import Spinner from 'react-spinkit'

function LoadingComponent() {
    const context = useContext(LoadingContext);

    return context?.loading ? (
        <div className='overlay-content'>
            <div className='wrapper'>
                <Spinner
                    name='ball-beat'
                    fadeIn='none'
                    color='blue'
                />
                <span className='message'>
                    {context?.message}
                </span>
            </div>
        </div>
    ) : null
}

export default LoadingComponent;
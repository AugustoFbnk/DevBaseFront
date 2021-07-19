import React, { useState, ReactNode } from 'react'

const LoadingContext = React.createContext({})

export const LoadingProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const updateLoading = (isLoading) => {
        setLoading(isLoading);
    }
    const updateMessage = (newMessage) => {
        setMessage(newMessage);
    }

    return (
        <LoadingContext.Provider value={
            {
                loading,
                message,
                updateLoading,
                updateMessage
            }
        }>
            {children}
        </LoadingContext.Provider>
    )
}

export default LoadingContext;
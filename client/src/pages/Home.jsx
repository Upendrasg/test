import React, { useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser';

export default function Home() {
    const { user } = useAuth();
    const getUser = useUser()

    useEffect(() => {
        getUser()
    }, [])

    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email !== undefined ? user?.balance == "Invalid wallet address" ?  "Provided wallet address is not valid" :  <h1>Your wallet Balance is - ${user?.balance}</h1> : 'Please login first'}
                    </div>
                </div>
            </h2>
        </div>
    )
}

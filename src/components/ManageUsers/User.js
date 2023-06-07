import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';

const User = (props) => {
    let history = useHistory();

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            history.push("/login");
        }
    })
    return (
        <div>
            User components
        </div>
    )
}

export default User

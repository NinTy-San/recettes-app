import React from 'react';

const Login = ({authenticate}) => {
    return ( 
        <div className='login'>
            <h2>Connecte toi pour créer tes recettes</h2>
            <button onClick={authenticate} className="google-button">Me connecter avec Google</button>
        </div>
     )
}
 
export default Login
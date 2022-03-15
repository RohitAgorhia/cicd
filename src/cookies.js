import React, { useState } from 'react';
import Cookies from 'universal-cookie';

const App = () => {
  const [name, setName] = useState('');
  const [pwd, setPwd] = useState('');
  const cookies = new Cookies();

  const handle = () => {       
    cookies.set('Name', name, { path: '/' });
    cookies.set('Password', pwd, { path: '/' });
  };

  return (
     <div className="App">
     <h1>Name of the user:</h1>
     <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
     />
     <h1>Password of the user:</h1>
     <input
        type="password"
        placeholder="Password"
        value={pwd}
        onChange={(e) => setPwd(e.target.value)}
     />
     
     <div>
     <button onClick={handle}>Set Cookie</button>{' '}
     </div>
     <br />
     {cookies.get('Name') && (
     <div>
        Name: <p>{cookies.get('Name')}</p>
     </div>
     )}
     {cookies.get('Password') && (
     <div>
        Password: <p>{cookies.get('Password')}</p>
     </div>
     )}
     </div>
  );
};
export default App;
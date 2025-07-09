// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { baseURL } from '../utils/constant';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch(`${baseURL}/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password })
//     });
//     const data = await res.json();
//     if (res.ok) {
//       localStorage.setItem('token', data.token);
//       navigate('/');
//     } else {
//       alert(data.msg);
//     }
//   };

//   return (
//     <div style={{ maxWidth: '300px', margin: 'auto' }}>
//       <h2 style={{fontSize:'50px'}}>Login</h2>
//       <div className="center-screen">
//         <form className="container" onSubmit={handleSubmit}>
//           <input 
//             type="email" 
//             placeholder="Email" 
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required 
//           />
//           <input 
//             type="password" 
//             placeholder="Password" 
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required 
//           />
//           <button type="submit">Login</button>
//         </form>
//         {/*  Signup link */}

//       </div>
//       <p >
//           Don't have an account? <Link to="/signup">Sign up here</Link>
//       </p>
      
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { baseURL } from '../utils/constant';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); //  loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // start loading
      const res = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      setLoading(false); // stop loading

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        alert(data.msg || 'Login failed. Please check your credentials.');
      }

    } catch (err) {
      setLoading(false);
      alert('Server might be waking up, or there was a network error. Please try again in a few seconds.');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto' }}>
      <h2 style={{ fontSize: '50px' }}>Login</h2>

      <div className="center-screen">
        <form className="container" onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            required 
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>

      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
}


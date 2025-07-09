// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { baseURL } from '../utils/constant';

// export default function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch(`${baseURL}/auth/signup`, {
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
//       <h2 style={{fontSize:'50px'}}>Sign-Up</h2>

//       <div className="center-screen">
//         <form className="container" onSubmit={handleSubmit}>
//           <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
//           <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>
//       <p >
//           Already have an account? <Link to="/login">login here</Link>
//       </p>
//     </div>
    
    
//   );
// }


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from '../utils/constant';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); //  loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // show loading
      const res = await fetch(`${baseURL}/auth/signup`, {
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
        alert(data.msg || 'Signup failed. Please try again.');
      }

    } catch (error) {
      setLoading(false); // stop loading on error
      alert('Server might be waking up, or there was a network error. Please try again shortly.');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto' }}>
      <h2 style={{ fontSize: '50px' }}>Sign-Up</h2>

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
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
      </div>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}

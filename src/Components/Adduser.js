import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password || !dob) {
      setError('All fields are required!');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setMessage('');

    // Prepare data to send to PHP API
    const userData = { name, email, password, dob };

    try {
      const response = await fetch('http://local.reactcrud.com/api/index.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        mode: 'no-cors'
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Something went wrong!');
      }

      const result = await response.json();
      setMessage('Data successfully added!'); // Display success message

      // Redirect to homepage after 2 seconds
      setTimeout(() => {
        navigate('/'); // Redirect to the homepage
      }, 2000);
    } catch (error) {
      setError(error.message || 'An error occurred while submitting the data.');
    }

    // Clear form fields after submission
    setName('');
    setEmail('');
    setPassword('');
    setDob('');
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        <div>
          <label>Date of Birth: </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {message && <span style={{ color: 'green' }}>{message}</span>}

        <button type="submit">Add User</button>
      </form>
    </div>
  );
}






  
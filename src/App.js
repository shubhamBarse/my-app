import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import AddUser from './Components/Adduser';
import Showuser from './Components/Showuser';
import EditUser from './Components/Edituser'; // Import the EditUser component

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h3>CRUD using PHP and React!</h3>

        {/* Navigation */}
        <nav>
          <Link to="/add-user">
            <button className="add-user-button">Add User</button>
          </Link>
          <Link to="/show-users">
            <button className="view-users-button">View Users</button>
          </Link>
        </nav>

        {/* Set up routing */}
        <Routes>
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/show-users" element={<Showuser />} />
          <Route path="/edit-user/:id" element={<EditUser />} /> {/* Route for EditUser */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;






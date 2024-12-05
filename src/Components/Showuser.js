// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// export default function Showuser() {
//   const initialUsers = [
//     { id: 1, username: 'John Doe', email: 'john.doe@example.com', dob: '1990-01-01' },
//     { id: 2, username: 'Jane Smith', email: 'jane.smith@example.com', dob: '1985-05-15' },
//     { id: 16, username: 'Bob Johnson', email: 'bob.johnson@example.com', dob: '1992-08-23' }
//   ];

//   const [users, setUsers] = useState(initialUsers);
//   const [error, setError] = useState(null);

//   const navigate = useNavigate(); // Initialize navigate

//   const handleEdit = (id) => {
//     // Navigate to the edit user page and pass the user ID as a parameter
//     navigate(`/edit-user/${id}`);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm(`Are you sure you want to delete user with ID: ${id}?`)) {
//       axios
//         .post("http://localhost/reactcrud/api/delete.php", { id: id })
//         .then((response) => {
//           if (response.data.success) {
//             setUsers(users.filter((user) => user.id !== id));
//             alert(response.data.message || "User deleted successfully.");
//           } else {
//             alert(response.data.message || "Failed to delete user.");
//           }
//         })
//         .catch((error) => {
//           alert("An error occurred while deleting the user. Please try again.");
//         });
//     }
//   };

//   return (
//     <div className="show-user-container">
//       <h1>User Details</h1>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <table className="user-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Date of Birth</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.length === 0 ? (
//             <tr>
//               <td colSpan="5" align="center">No Data Found</td>
//             </tr>
//           ) : (
//             users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//                 <td>{user.dob}</td>
//                 <td>
//                   <button className="edit-button" onClick={() => handleEdit(user.id)}>
//                     Edit
//                   </button>
//                   <button className="delete-button" onClick={() => handleDelete(user.id)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }




import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Userlist() {
  const [userData, setUserData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get("http://local.reactcrud.com/api/user.php");
      setUserData(response.data);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to fetch user data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete user with ID: ${id}?`)) {
      axios
        .delete("http://local.reactcrud.com/api/delete.php", { 
          data: { id: id } // Sending id in the request body
        })
        .then((response) => {
          if (response.data.success) {
            setUserData(userData.filter((uData) => uData.id !== id)); // Corrected to update the userData state
            alert(response.data.message || "User deleted successfully.");
          } else {
            alert(response.data.message || "Failed to delete user.");
          }
        })
        .catch((error) => {
          alert("An error occurred while deleting the user. Please try again.");
        });
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-10 mt-4">
            <h5 className="mb-4">User List</h5>
            {message && <p className="text-success">{message}</p>}
            {error && <p className="text-danger">{error}</p>}
            {loading ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Sr.No</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date of birth</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.length > 0 ? (
                    userData.map((uData, index) => (
                      <tr key={uData.id}>
                        <td>{uData.id}</td>
                        <td>{uData.username}</td>
                        <td>{uData.email}</td>
                        <td>{uData.status}</td> {/* Assuming 'status' is the DOB */}
                        <td>
                          <Link
                            to={`/edit-user/${uData.id}`}
                            className="btn btn-success mx-2"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(uData.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Userlist;









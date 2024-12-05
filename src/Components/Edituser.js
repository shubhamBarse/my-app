import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edituser() {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the user ID from the route params
    const [formValue, setFormValue] = useState({
        username: '',
        email: '',
        dob: '',
    });
    const [message, setMessage] = useState('');

    // Handle input change
    const handleInput = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    // Fetch user data by ID and populate the form
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://local.reactcrud.com/api/user.php?id=${id}`, {
                    headers: { "Content-Type": "application/json" },
                });
    
                if (response.data) {
                    const { username, email, status ,password} = response.data; // Assuming 'status' is the DOB
                    setFormValue({
                        username: username,
                        email: email,
                        dob: status, 
                        password:password// Map 'status' to 'dob'
                    });
                } else {
                    console.log("User not found");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
    
        fetchUserData();
    }, [id]);
    
    

    // Handle form submission for updating user data
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`http://local.reactcrud.com/api/user.php`, {
                id, // Include user ID
                ...formValue, // Send updated data
            }, {
                headers: { "Content-Type": "application/json" },
            });

            if (res.data.success) {
                setMessage("User updated successfully.");
                setTimeout(() => navigate("/userlist"), 2000); // Redirect after 2 seconds
            } else {
                setMessage(res.data.error || "Failed to update user.");
            }
        } catch (error) {
            console.error("Failed to update user:", error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 mt-4">
                        <h5 className="mb-4">Edit User</h5>
                        {message && <p className="text-success">{message}</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 row">
                                <label className="col-sm-2">Username</label>
                                <div className="col-sm-10">
                                    <input
                                        type="text"
                                        name="username"
                                        value={formValue.username}
                                        className="form-control"
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-sm-2">Email</label>
                                <div className="col-sm-10">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formValue.email}
                                        className="form-control"
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-sm-2">Password</label>
                                <div className="col-sm-10">
                                    <input
                                        type="password"
                                        name="password"
                                        value={formValue.password}
                                        className="form-control"
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <label className="col-sm-2">Date of Birth</label>
                                <div className="col-sm-10">
                                    <input
                                        type="date"
                                        name="dob"
                                        value={formValue.dob}
                                        className="form-control"
                                        onChange={handleInput}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3 row">
                                <div className="col-sm-10 offset-sm-2">
                                    <button type="submit" className="btn btn-success">
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Edituser;











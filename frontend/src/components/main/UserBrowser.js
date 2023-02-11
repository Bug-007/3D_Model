
import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
const UserBrowser = () => {
  const [userArray, setUserArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const getDataFromBackend = async () => {
    setLoading(true);
    const response = await fetch("http://localhost:5000/user/getall");
    const data = await response.json();
    console.log(data);
    setUserArray(data);
    setLoading(false);
  }; 
  const deleteUser = async (id) => {
    console.log(id);
    const response = await fetch("http://localhost:5000/user/delete/" + id, {
      method: "DELETE",
    });
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "User deleted successfully",
      });
      getDataFromBackend();
    }
  };
  useEffect(() => {
    getDataFromBackend();
  }, []);
  const displayUsers = () => {
    if (loading) {
  return (
    <div class="text-center">
          <div class="spinner-border text-primary " role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    } else {
      return userArray.map(({ _id, email, password, username }) => (
        <tr key={_id}>
          <td>{username}</td>
          <td>{email}</td>
          <td>{password}</td>
          <td>
            <button className="btn btn-danger" onClick={(e) => deleteUser(_id)}>
              <i class="fas fa-trash   "></i>
            </button>
          </td>
        </tr>
      ));
    }
  };
  return (
    <div>
      <h1>User Manager</h1>
      <div className="row">
        <div className="col-md">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{displayUsers()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default UserBrowser
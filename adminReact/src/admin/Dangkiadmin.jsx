import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dangnhapadmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleregister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASEURL}/api/accountregister`, { email, password });
      if (response.status === 200) {
        alert("đăng kí tài khoản thành công");
       navigate('/admin/dangnhap');
      } else {
        alert("tạo tài khoản lỗi (failed)");
      }
    } catch (error) {
      console.error(error);
    
    }
  };
  
  return (
    <div className="login-form">
        <h1>đăng kí tài khoản admin</h1>
    <form onSubmit={handleregister}>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit">Đăng kí</button>
    </form>
  </div>
  );
}
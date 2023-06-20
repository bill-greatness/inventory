import { useState } from "react";
import { auth } from "../functions";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [staff_id, setStaffID] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()


  const getAccess = (e) => {

    e.preventDefault();
    signInWithEmailAndPassword(auth, staff_id, password).then(() => {
      localStorage.setItem("logged", "True")
      navigate("/")
    }).catch((err) => {
      alert(err.message)
    });

  };

  return (
    <div className="flex w-screen h-screen flex-col items-center justify-center">
      <form onSubmit={getAccess} action="#" className="flex flex-col px-2">
        <img
          className="w-72 object-cover"
          src="https://img.freepik.com/free-vector/handling-order-processing-abstract-concept-vector-illustration-order-documentation-processing-system-handling-customer-request-logistics-automated-logistics-operations-abstract-metaphor_335657-1789.jpg"
          alt=""
        />
        <h3 className="text-xl font-bold text-center">Welcome, Staff.</h3>
        <div className="flex flex-col my-1">
          <label htmlFor="staff_id" className="text-xs">
            Staff ID
          </label>
          <input
            className="border border-gray-300 w-full p-2"
            required
            type="email"
            id="staff_id"
            value={staff_id}
            onChange={(e) => setStaffID(e.target.value)}
          />
        </div>
        <div className="flex flex-col my-1">
          <label htmlFor="password" className="text-xs">
            Password
          </label>
          <input
            className="border border-gray-300 w-full p-2"
            required
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="p-2 bg-blue-500 mt-1 text-white " type="submit" >
          Login
        </button>
      </form>
    </div>
  );
}

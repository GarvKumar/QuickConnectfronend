import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { useNavigate, Link } from "react-router-dom";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { sendEmailVerification } from "firebase/auth"; // Import sendEmailVerification
import { app } from "../firebase"; // Import app from the correct path
import { getAuth } from "firebase/auth"; // Import getAuth

const auth = getAuth(app); // Initialize the auth instance

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
     setLoading(true);
     e.preventDefault();
     const Name = e.target[0].value;
     const contact = e.target[1].value;
     const email = e.target[2].value;
     const password = e.target[3].value;
     const file = e.target[4].files[0];

     try {
//       Create user

       //Create a unique image name
       const date = new Date().getTime();
       const storageRef = ref(storage, `${Name + date}`);

       await uploadBytesResumable(storageRef, file).then(() => {
         getDownloadURL(storageRef).then(async (downloadURL) => {
           try {
             //Update profile
             
             //create user on firestore
             const userData = {
              Name,
      contact ,
     email,
     password ,
              avatar: downloadURL, // Use the avatar URL from the response
            };

//             //create empty user chats on firestore
//             await setDoc(doc(db, "userChats", res.user.uid), {});
await axios.post("http://localhost:8080/api/register", userData);
             console.log("User created");   
             navigate("/login");
           } catch (err) {
             console.log(err);
             setErr(true);
             setLoading(false);
           }
         });
       });
      await sendEmailVerification(auth.currentUser);

      // Show a message to the user about email verification
      alert("A verification email has been sent to your email address. Please verify your email before logging in.");

      navigate("/Login");
     } catch (err) {
       setErr(true);
       setLoading(false);
     }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Quick Connect</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="Name" />
          <input required type="tel" placeholder="Contact number" pattern="[0-9]{10}" title="Please enter a valid 10-digit contact number" />
          <input required type="email" placeholder="Email" />
          <input required type="password" placeholder="Password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span className="avtar">Add an avatar</span>
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image, please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Already have an account? <Link to="/Login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

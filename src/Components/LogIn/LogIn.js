import { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { handleSignOut, handleGoogleSignIn, initializeLoginFramework, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./LoginManager";

function LogIn() {
  const [newPerson, setNewPerson] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: '',
    photo: ''
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true)
      })
  }

  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res, false)
      })
  }

  const handleResponse = (res, redirect) => {
    setUser(res)
    setLoggedInUser(res)
    if(redirect){
      history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 8;
      const isPasswordNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && isPasswordNumber;
    }
    if (isFieldValid) {
      const newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser);
    }
  };

  const handleSubmit = (e) => {
    console.log(user.email, user.password);
    if (newPerson && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true)
        })
    }
    e.preventDefault();
  };

  if (!newPerson && user.email && user.password) {
    signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res, true)
      })
  }

  return (
    <div style={{ textAlign: 'center' }}>
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={googleSignIn}>Sign In</button>
      )}



      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email, {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      )}

      <h1>Authentication</h1>
      <input
        type="checkbox"
        onChange={() => setNewPerson(!newPerson)}
        name="newPerson"
        id=""
      />
      <label htmlFor="newPerson">Sign up new person</label>

      <form onSubmit={handleSubmit}>
        {newPerson && (
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            onBlur={handleBlur} />)}<br />
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Enter your email" required /> <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Enter your password" required /> <br />
        <input type="submit" value={newPerson ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: "red" }}> {user.error} </p>
      {user.success && (
        <p style={{ color: "green" }}>
          {" "}
          You are {newPerson ? "created" : "Logged In"} account successfully{" "}
        </p>
      )}
    </div>
  );
}

export default LogIn;

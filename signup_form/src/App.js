import "./styles.css";
import react, { useState } from "react";

const SIGNUP_URL = "https://www.greatfrontend.com/api/questions/sign-up";

export default function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  async function signUp() {
    console.log("You have entered below details:");
    console.log(username, email, password, confirmPass);
    try {
      const response = await fetch(SIGNUP_URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password,
          password_confirm: confirmPass
        })
      });
      const { message } = await response.json();
      alert(message);
    } catch (error) {
      alert("Signup failed");
    }
  }

  return (
    <form onSubmit={signUp} action={SIGNUP_URL} method="post">
      <h1>Signup</h1>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          required
          minLength={4}
          pattern="^[a-zA-Z0-9]+$"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          required
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label>Confirm password</label>
        <input
          type="password"
          value={confirmPass}
          required
          minLength={6}
          aria-describedby="password-mismatch-error"
          onChange={(e) => setConfirmPass(e.target.value)}
        />
        <div
          className={password === confirmPass ? "hidden" : "error"}
          id="password-mismatch-error"
        >
          The passwords do not match
        </div>
      </div>
      <div>
        <button type="submit">Signup</button>
      </div>
    </form>
  );
}

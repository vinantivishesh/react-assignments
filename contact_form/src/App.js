import "./styles.css";
import react, { useEffect, useState } from "react";

const SUBMIT_URL = "https://www.greatfrontend.com/api/questions/contact-form";

export default function App() {
  const submitForm = async (e) => {
    // prevents the default action
    // which is propogating the event
    e.preventDefault();
    const form = e.target;

    // perform form validation
    try {
      if (form.action !== SUBMIT_URL) {
        alert("Incorrect form action value");
        return;
      }
      if (form.method.toLowerCase() !== "post") {
        alert("Incorrect form method");
        return;
      }

      const formData = new FormData(form);
      const response = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message")
        })
      });
      const text = await response.text();
      alert(text);
    } catch (error) {
      alert("Error submitting form!");
    }
  };

  return (
    <form
      onSubmit={submitForm}
      action="https://www.greatfrontend.com/api/questions/contact-form"
      method="post"
    >
      <h1>Contact us</h1>
      <div>
        <label htmlFor="name-input">Name</label>
        <input id="name-input" name="name" type="text" />
      </div>
      <div>
        <label htmlFor="email-input">
          Email
          <input id="email-input" name="email" type="text" />
        </label>
      </div>
      <div>
        <label htmlFor="message-input">Message</label>
        <textarea id="message-input" name="message"></textarea>
      </div>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
}

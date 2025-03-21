"use client";
import React, { useState } from "react";
import axios from "axios"; // Import axios
import { forgotPassword } from "../lib/actions/user";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false); // Track pending state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const result = await forgotPassword(email);

    setLoading(false);
    if (result === true) {
      setSuccess(true);
    } else {
      setErrorMessage("try again");
    }
  };

  return (
    <div className="flex justify-center">
      {success && (
        <p className="text-green-500">Email with reset link has been sent.</p>
      )}

      <form
        onSubmit={handleSubmit}
        className="border flex flex-col gap-4 p-4 w-96"
      >
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          className="border px-4 py-2"
          disabled={loading} // Disable input while loading
        />

        <button
          className={`px-4 py-2 text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default ForgotPassword;

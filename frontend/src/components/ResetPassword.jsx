import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ResetPassword({ onResetComplete }) {
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const updatePassword = async () => {
    if (!newPassword) return setMsg("Enter a new password.");

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setMsg(error.message);
    else {
      setMsg("Password updated! Please log in again.");
      if (onResetComplete) onResetComplete(); // Optional callback
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={updatePassword}>Set New Password</button>
      <p>{msg}</p>
    </div>
  );
}
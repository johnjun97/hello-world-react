import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // Auto-detect redirect URL for local or deployed
  const redirectUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:5173"
      : "https://your-username.github.io/your-repo"; // replace with your repo URL

  // Magic link login
  const loginMagicLink = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { redirectTo: redirectUrl }
    });
    if (error) setMsg(error.message);
    else setMsg("Check your email for the magic link!");
  };

  // Email/password login
  const loginWithPassword = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) setMsg(error.message);
    else setMsg(`Logged in as ${data.user.email}`);
  };

  // Email/password sign up
  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: redirectUrl }
    });
    if (error) setMsg(error.message);
    else setMsg("Account created. Check your email to confirm.");
  };

  // OAuth login (Google example)
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: redirectUrl }
    });
  };

  return (
    <div>
      <h2>Login / Signup</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password (optional for magic link)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={signUp}>Sign Up</button>
        <button onClick={loginWithPassword}>Login with Password</button>
        <button onClick={loginMagicLink}>Login with Magic Link</button>
        <button onClick={loginWithGoogle}>Login with Google</button>
      </div>

      <p>{msg}</p>
    </div>
  );
}

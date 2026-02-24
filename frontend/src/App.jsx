import React, { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [resetPasswordMode, setResetPasswordMode] = useState(false);

  useEffect(() => {
    const handleRedirects = async () => {
      // Check if user landed via magic/reset link
      const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });
      if (error) console.log("Error getting session from URL:", error);

      // Detect if it’s a password reset link
      const params = new URLSearchParams(window.location.search);
      if (params.get("type") === "recovery") {
        setResetPasswordMode(true);
      }

      if (data.session) setUser(data.session.user);

      // Clean URL
      window.history.replaceState({}, document.title, "/");
    };

    handleRedirects();

    // Check if a session already exists
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUser(session.user);
    });

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setUser(session.user);
      else setUser(null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (resetPasswordMode) {
    return <ResetPassword onResetComplete={() => setResetPasswordMode(false)} />;
  }

  return (
    <div>
      <h1>Hello App!</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={() => supabase.auth.signOut()}>Logout</button>
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
}
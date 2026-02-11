import React, { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a session already exists
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setUser(session.user);
    });

    // Listen for login/logout changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setUser(session.user);
      else setUser(null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Hello App!</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={() => supabase.auth.signOut()}>Logout</button>
        </div>
      ) : (
        <Auth /> // Show login/signup if not logged in
      )}
    </div>
  );
}

import type { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  const handleAuth = async (
    email: string,
    password: string,
  ): Promise<{ message: string }> => {
    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginData.user) {
      return { message: "Logged in successfully!" };
    }

    if (loginError) {
      // Try to sign up if login failed
      const { data: signupData } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupData.user) {
        return { message: "Check your email for a confirmation link." };
      }

      // If signup also failed, return the login error message
      return { message: loginError.message };
    }

    return { message: "Authentication failed" };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleAuth,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const signInIfNeeded = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data.session) {
        setSession(data.session);
      }
      if (error) {
        console.error(error);
      }

      //   sign in anonymously if no session is found
      if (!data.session) {
        const { data, error } = await supabase.auth.signInAnonymously();
        if (data.session) {
          setSession(data.session);
        }
        if (error) {
          console.error(error);
        }
      }
    };

    signInIfNeeded();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: session?.user || null, isAuthenticated: !!session }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

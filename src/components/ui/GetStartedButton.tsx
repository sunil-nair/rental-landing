'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

export function GetStartedButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const { data: session } = await supabase.auth.getSession();

    const user = session?.session?.user;
    // disable checking for signed in user for now temporary !!
    //if (user && user.email_confirmed_at) {
    if(true) { // not checking user logged in for now.
      router.push("/dashboard");
    } else {
      router.push("/signup"); 
    }
 
    setLoading(false);
  };

  return (
    <Button size="lg" onClick={handleClick} disabled={loading}>
      {loading ? "Loading..." : "Get Started"}
    </Button>
  );
}
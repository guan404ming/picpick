import { useSession } from "next-auth/react";

export default function useUserInfo() {
  const { data: session } = useSession();

  return {
    session,
  };
}

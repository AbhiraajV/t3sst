import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div>Loading...</div>;

  if (!session) {
    void router.push("/login");
    return null;
  }
  return (
    <>Hello</>
  );
}

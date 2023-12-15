import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth/auth";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="w-full space-y-4 p-5">
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Admin
      </h2>
    </div>
  );
}

import { Separator } from "@/components/ui/separator";

import TableList from "./_components/TableList";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex max-h-screen w-full max-w-6xl">
      <div className="min-w-[76vw]">{children}</div>
      <Separator orientation="vertical" />
      <TableList />
    </div>
  );
}

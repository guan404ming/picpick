import { Separator } from "@/components/ui/separator";

import TableList from "./_components/TableList";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-[80%]">{children}</div>
      <Separator orientation="vertical" />
      <TableList />
    </>
  );
}

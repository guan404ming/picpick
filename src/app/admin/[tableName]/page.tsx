import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { TableItem } from "../_components/TableItem";
import UploadButton from "../_components/UploadButton";

import { db } from "@/db";
import { bookTable, messageTable, questionTable } from "@/db/schema";
import { authOptions } from "@/lib/auth/auth";

const tableMap = {
  book: bookTable,
  question: questionTable,
  message: messageTable,
};

export default async function AdminBookPage({
  params,
}: {
  params: {
    tableName: "book" | "question" | "message";
  };
}) {
  const session = await getServerSession(authOptions);
  const { tableName } = params;
  let dataList = [];

  if (session?.user.role !== "admin") {
    redirect("/");
  }

  try {
    dataList = await db.select().from(tableMap[tableName]);
  } catch (error) {
    console.log(error);
    redirect("/admin");
  }

  return (
    <div className="mx-auto flex max-h-screen flex-col space-y-4 overflow-y-hidden p-5">
      <div className="flex items-center space-x-4 border-b pb-2">
        <h2 className="mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          {tableName}
        </h2>
        <UploadButton></UploadButton>
      </div>
      {dataList.length === 0 ? (
        <div>No data in this table</div>
      ) : (
        <TableItem dataList={dataList}></TableItem>
      )}
    </div>
  );
}

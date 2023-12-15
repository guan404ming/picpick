import { BookIcon, LucideFileQuestion } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function TableList() {
  const tableList = [
    {
      name: "Book",
      icon: <BookIcon className="ml-1 h-5 w-5" />,
    },
    {
      name: "Question",
      icon: <LucideFileQuestion className="ml-1 h-5 w-5" />,
    },
  ];

  return (
    <div className="mt-3 w-[20vw] max-md:hidden">
      <h1 className="flex items-center space-x-2 truncate bg-white px-4 py-4 pt-5 text-lg font-semibold">
        <p>🧑‍💻 &nbsp;Table Overview</p>
      </h1>
      <div className="px-4">
        {tableList.map((table, idx) => (
          <Alert
            key={idx}
            className="mb-3 min-w-[200px] align-middle drop-shadow-sm"
          >
            {table.icon}
            <AlertTitle className="mb-3 ml-2">{table.name}</AlertTitle>
            <AlertDescription className="ml-2 text-xs text-gray-500">
              {`click to view all ${table.name.toLowerCase()}`}
            </AlertDescription>
          </Alert>
        ))}
      </div>
    </div>
  );
}

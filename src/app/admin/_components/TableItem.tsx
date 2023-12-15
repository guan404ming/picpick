import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableItemProps = {
  dataList: { id: number }[];
};

export function TableItem({ dataList }: TableItemProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.keys(dataList[0]).map((key, index) => (
            <TableHead key={index}>{key}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataList.map((book, idx) => (
          <TableRow key={idx}>
            {Object.values(book).map((value, index) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

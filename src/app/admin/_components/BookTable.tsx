import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { SelectBook } from "@/lib/types/db"

 type BookTableProps = {
  bookList: SelectBook[]
 } 
  
  export function BookTable({
    bookList
  }: BookTableProps) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Book Name</TableHead>
            <TableHead>Author</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookList.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.bookName}</TableCell>
              <TableCell>{book.author}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
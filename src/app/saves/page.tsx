import Book from "./_components/Book";

export default function SavesPage() {
  const books = [
    { id: 1, title: "Book 1", image: "book1.jpg" },
    { id: 2, title: "Book 2", image: "book1.jpg" },
    { id: 3, title: "Book 3", image: "book1.jpg" },
    { id: 4, title: "Book 4", image: "book1.jpg" },
    { id: 5, title: "Book 5", image: "book1.jpg" },
    { id: 6, title: "Book 6", image: "book1.jpg" },
    { id: 1, title: "Book 1", image: "book1.jpg" },
    { id: 2, title: "Book 2", image: "book1.jpg" },
    { id: 3, title: "Book 3", image: "book1.jpg" },
    { id: 4, title: "Book 4", image: "book1.jpg" },
    { id: 5, title: "Book 5", image: "book1.jpg" },
    { id: 6, title: "Book 6", image: "book1.jpg" },
  ];

  return (
    <div className="block w-full overflow-scroll p-8">
      <h1 className="mb-10 text-3xl font-bold">Saves</h1>
      <div className="flex w-full flex-col items-center justify-center">
        <div className="grid gap-x-20 gap-y-14 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {books.map((book, idx) => (
            <Book key={idx} book={book}></Book>
          ))}
        </div>
      </div>
    </div>
  );
}

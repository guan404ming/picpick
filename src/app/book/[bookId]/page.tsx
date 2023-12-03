import BookReader from "./_components/BookReader";

export default function BookPage() {
  return (
    <div className="max-h-screen w-full overflow-y-hidden p-4">
      <BookReader
        pdf={{ src: "https://react-reader.metabits.no/files/alice.epub" }}
      ></BookReader>
    </div>
  );
}

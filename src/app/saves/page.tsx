import React from 'react';

interface Book {
  id: number;
  title: string;
  image: string;
}

interface CardProps {
  book: Book;
}

function Card({ book }: CardProps) {
  return (
    <div style={{ width: '200px', margin: '10px', borderRadius: '10px', padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3 style={{ textAlign: 'left', fontSize: '18px', margin: '0' }}>繪本名稱</h3>
        <span role="img" aria-label="bookmark" style={{ fontSize: '20px' }}>📖</span>
      </div>
      <img src={book.image} alt={book.title} style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '10px' }} />
      <input type="range" style={{ width: '100%' }} />
    </div>
  );
}

export default function SavesPage() {
  const books: Book[] = [
    { id: 1, title: 'Book 1', image: 'book1.jpg' },
    // ... 其他書籍資料
  ];

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Saves</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {books.map((book) => (
          <Card key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

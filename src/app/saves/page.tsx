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
    <div style={{ flex: '1', maxWidth: '300px', margin: '10px', borderRadius: '10px', padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ textAlign: 'left', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        繪本名稱
        <span style={{ fontSize: '24px', marginRight: '8px' }}>📖</span>
      </h3>
      <img src={book.image} alt={book.title} style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
      <input type="range" style={{ width: '100%' }} />
    </div>
  );
}

export default function SavesPage() {
  const books: Book[] = [
    { id: 1, title: 'Book 1', image: 'book1.jpg' },
    { id: 2, title: 'Book 2', image: 'book2.jpg' },
    { id: 3, title: 'Book 3', image: 'book3.jpg' },
    { id: 4, title: 'Book 4', image: 'book4.jpg' },
    { id: 5, title: 'Book 5', image: 'book5.jpg' },
    { id: 6, title: 'Book 6', image: 'book6.jpg' },
    // ... 其他書籍資料
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center' }}>Saves</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {books.map((book) => (
          <div key={book.id} style={{ flex: '0 0 calc(33.33% - 20px)' }}>
            <Card book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}

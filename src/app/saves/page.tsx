import React from 'react';

interface Book {
  id: number;
  title: string;
  image: string;
}

interface CardProps {
  title: string;
  image: string;
}

function Card({ title, image }: CardProps) {
  return (
    <div style={{ width: '200px', margin: '10px' }}>
      <h3>{title}</h3>
      <img src={image} alt={title} style={{ maxWidth: '100%' }} />
      <input type="range" />
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
  ];

  return (
    <div>
      <h1>Saves</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {books.map((book) => (
          <Card key={book.id} title={book.title} image={book.image} />
        ))}
      </div>
    </div>
  );
}
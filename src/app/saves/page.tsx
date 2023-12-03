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
    <div style={{ flex: '1', width: '250px', height: '325px', margin: '20px 0 20px 0', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <h3 style={{ textAlign: 'left', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',paddingTop:'0px'}}>
        繪本名稱
        <span style={{ fontSize: '20px', marginRight: '14px' }}>📖</span>
      </h3>
      <img src={book.image} alt={book.title} style={{ borderRadius: '0',height: '90%', marginTop: '-10px', transform: 'scale(0.8)' ,boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'}} />
      <div style={{ width: '100%', height: '5px', background: 'linear-gradient(to right, black 50%, #ccc 50%)', borderRadius: '8px' ,marginTop: '-10px'}} />
    </div>
  );
}
export default function SavesPage() {
  const books: Book[] = [
    { id: 1, title: 'Book 1', image: 'book1.jpg' },
    { id: 2, title: 'Book 2', image: 'book1.jpg' },
    { id: 3, title: 'Book 3', image: 'book1.jpg' },
    { id: 4, title: 'Book 4', image: 'book1.jpg' },
    { id: 5, title: 'Book 5', image: 'book1.jpg' },
    { id: 6, title: 'Book 6', image: 'book1.jpg' },
  ];

  return (
    <div>
    <h1 style={{ fontSize: '35px', fontWeight: 'bold', textAlign: 'left', marginBottom: '20px' , paddingLeft: '6%',paddingTop: '4%'}}>Saves</h1>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '8%'}}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'left', gap: '40px' }}>
        {books.map((book) => (
          <div key={book.id} style={{ flex: '0 0 calc(33.33% - 100px)' }}>
            <Card book={book} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
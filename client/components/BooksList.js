import React from 'react';
import Books from '../../collections/books';
import useFind from './mongo-suspense/useFind';

const BooksList = () => {
  const books = useFind(Books);

  return (
    <ul>
      {books.map((book) => (
        <li key={book._id}>{book.name}</li>
      ))}
    </ul>
  );
};

export default BooksList;

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Books = new Mongo.Collection('books');

Meteor.methods({
  'books.add'(name) {
    Books.insert({ name });
  },
});

export default Books;

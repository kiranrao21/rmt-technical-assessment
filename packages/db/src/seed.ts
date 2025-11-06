import { Book, connectDB, disconnectDB } from './index';

const sampleBooks = [
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    publishedYear: 1925,
    isbn: '978-0-7432-7356-5',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    publishedYear: 1960,
    isbn: '978-0-06-112008-4',
  },
  {
    title: '1984',
    author: 'George Orwell',
    publishedYear: 1949,
    isbn: '978-0-452-28423-4',
  },
];

async function seed() {
  try {
    await connectDB();

    // Clear existing books
    await Book.deleteMany({});
    console.log('Cleared existing books');

    // Insert sample books
    await Book.insertMany(sampleBooks);
    console.log('Seeded 3 sample books successfully');

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
}

seed();

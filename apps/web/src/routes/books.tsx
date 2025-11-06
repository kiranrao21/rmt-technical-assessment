import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { trpc } from '@/lib/trpc';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/books')({
  component: BooksPage,
});

interface Book {
  _id: string;
  title: string;
  author: string;
  publishedYear: number;
  isbn: string;
}

function BooksPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = trpc.books.list.useQuery({ page, limit });

  if (isLoading) {
    return <Spinner />;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  const books = data.books as Book[];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Books Collection</h2>
        <p className="text-gray-600 mt-1">Browse through our collection of books</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Published Year</TableHead>
              <TableHead>ISBN</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.publishedYear}</TableCell>
                <TableCell className="font-mono text-sm">{book.isbn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-6 py-4 border-t">
          <div className="text-sm text-gray-600">
            Page {data.page} of {data.totalPages} ({data.total} total books)
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
              disabled={page === data.totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

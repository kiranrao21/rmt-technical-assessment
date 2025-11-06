import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome to Antdtech Books</h2>
      <p className="text-gray-600 mb-6">A simple book management application</p>
      <Link
        to="/books"
        className="inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
      >
        View Books
      </Link>
    </div>
  );
}

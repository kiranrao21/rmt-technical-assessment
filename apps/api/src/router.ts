import { Book, connectDB } from '@antdtech/db';
import { z } from 'zod';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  books: {
    list: publicProcedure
      .input(
        z.object({
          page: z.number().min(1).default(1),
          limit: z.number().min(1).max(100).default(10),
        }),
      )
      .query(async ({ input }) => {
        await connectDB();

        const skip = (input.page - 1) * input.limit;

        const [books, total] = await Promise.all([
          Book.find().skip(skip).limit(input.limit).lean(),
          Book.countDocuments(),
        ]);

        return {
          books,
          total,
          page: input.page,
          limit: input.limit,
          totalPages: Math.ceil(total / input.limit),
        };
      }),
  },
});

export type AppRouter = typeof appRouter;

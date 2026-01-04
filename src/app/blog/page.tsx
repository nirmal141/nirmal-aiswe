import { getAllPosts } from '@/lib/blog';
import Link from 'next/link';
import { format } from 'date-fns';

export const metadata = {
  title: 'Blog | Nirmal Portfolio',
  description: ' thoughts, tutorials, and insights.',
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-black text-white py-32 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">
          Blog
        </h1>
        <div className="grid gap-10">
            {posts.map((post) => (
            <article key={post.slug} className="group border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition-colors bg-neutral-900/50">
              <Link href={`/blog/${post.slug}`}>
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center text-sm text-neutral-400 space-x-2">
                    <time dateTime={post.date}>
                      {format(new Date(post.date), 'MMMM d, yyyy')}
                    </time>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="text-2xl font-semibold group-hover:text-red-500 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-neutral-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <span className="text-sm text-red-500 pt-2 flex items-center group-hover:underline">
                    Read more &rarr;
                  </span>
                </div>
              </Link>
            </article>
            ))}
            {posts.length === 0 && (
                <p className="text-neutral-400">No posts found.</p>
            )}
        </div>
      </div>
    </div>
  );
}

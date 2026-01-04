import { getPostBySlug, getPostSlugs } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = getPostSlugs();
  return posts.map((post) => ({
    slug: post.replace(/\.mdx$/, ''),
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    try {
        const post = getPostBySlug(params.slug);
        return {
            title: `${post.title} | Nirmal Portfolio`,
            description: post.excerpt,
        };
    } catch (e) {
        return {
            title: 'Blog Post Not Found',
        };
    }
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  let post;
  try {
      post = getPostBySlug(params.slug);
  } catch(e) {
      notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white py-32 px-6 md:px-12 lg:px-24">
      <article className="max-w-3xl mx-auto">
        <Link 
            href="/blog" 
            className="text-neutral-400 hover:text-white mb-8 inline-flex items-center text-sm transition-colors"
        >
          &larr; Back to all posts
        </Link>
        
        <header className="mb-10">
            <div className="flex items-center text-sm text-neutral-400 space-x-2 mb-4">
                <time dateTime={post.date}>
                    {format(new Date(post.date), 'MMMM d, yyyy')}
                </time>
                <span>•</span>
                <span>{post.readingTime}</span>
            </div>
            <h1 className="text-3xl  p-4 border border-[#e52905]/50 rounded-r-xl md:text-4xl font-bold tracking-tight leading-tight">
                {post.title}
            </h1>
        </header>

        <div className="prose prose-invert prose-lg max-w-none 
          prose-headings:font-display prose-headings:font-normal prose-headings:tracking-tight prose-headings:text-white
          prose-p:font-display prose-p:text-neutral-300 prose-p:leading-normal prose-p:tracking-wide
          prose-a:text-[#e52905]/50 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-strong:font-semibold
          prose-ul:font-display prose-ul:text-neutral-300 prose-ul:leading-normal prose-ul:tracking-wide
          prose-li:marker:text-[#e52905]/50
          prose-blockquote:border-l-4 prose-blockquote:border-[#e52905]/50 prose-blockquote:pl-6 prose-blockquote:py-1 prose-blockquote:my-4 prose-blockquote:italic prose-blockquote:font-display prose-blockquote:text-md prose-blockquote:text-neutral-200 prose-blockquote:bg-neutral-900/90 prose-blockquote:rounded-r-2xl
          prose-img:rounded-xl prose-img:shadow-2xl prose-img:border prose-img:border-neutral-800
          prose-code:font-mono prose-code:text-[#e52905]/50 prose-code:bg-[#e52905]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </div>
  );
}

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compareDesc } from 'date-fns';

const blogsDirectory = path.join(process.cwd(), 'content/blogs');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    coverImage?: string;
    readingTime?: string;
}

export function getPostSlugs() {
    return fs.readdirSync(blogsDirectory);
}

export function getPostBySlug(slug: string): BlogPost {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(blogsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: realSlug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        coverImage: data.coverImage,
        content,
        readingTime: '3 min read', // You can add a real reading time calculation later
    };
}

export function getAllPosts(): BlogPost[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        // Sort posts by date in descending order
        .sort((post1, post2) => {
            return compareDesc(new Date(post1.date), new Date(post2.date));
        });
    return posts;
}

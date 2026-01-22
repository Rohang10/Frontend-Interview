import { useGetBlog } from '@/hooks/useBlogs';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function BlogDetail({ id }: { id: string }) {
    const { data: blog, isLoading, isError } = useGetBlog(id);

    if (isLoading) {
        return (
            <div className="space-y-8 animate-pulse p-6 max-w-4xl mx-auto">
                <Skeleton className="h-[400px] w-full rounded-xl" />
                <div className="space-y-4">
                    <Skeleton className="h-12 w-3/4" />
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            </div>
        );
    }

    if (isError || !blog) {
        return (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-6">
                <h2 className="text-2xl font-bold mb-2">Blog not found</h2>
                <p className="mb-6">
                    The blog post you're looking for doesn't exist or there was an error loading it.
                </p>
                <Button asChild variant="outline">
                    <Link to="/blogs">Back to list</Link>
                </Button>
            </div>
        );
    }

    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="w-full bg-background">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {/* Hero */}
                <div className="relative h-[40vh] min-h-[300px] w-full shrink-0 overflow-hidden">
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <Link
                        to="/blogs"
                        className="absolute top-4 left-4 z-30 md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20 max-w-5xl mx-auto">
                        <div className="space-y-3">
                            <div className="flex flex-wrap gap-2">
                                {blog.category.map((cat) => (
                                    <span
                                        key={cat}
                                        className="px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white uppercase bg-primary/90 backdrop-blur-md rounded-md shadow-sm border border-white/10"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight drop-shadow-lg">
                                {blog.title}
                            </h1>
                            <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                                <span>Admin Author</span>
                                <span className="text-white/40">•</span>
                                <span className="flex items-center gap-1.5 opacity-80">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {formattedDate}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <article className="relative z-20 bg-background -mt-6 rounded-t-3xl px-5 md:px-10 pt-10 pb-12 shadow-sm">
                    <div className="max-w-4xl mx-auto">
                        <p className="text-lg md:text-xl font-medium text-muted-foreground leading-relaxed border-l-4 border-primary/50 pl-4 mb-6">
                            {blog.description}
                        </p>

                        <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none text-foreground/90 leading-7">
                            {blog.content.split('\n\n').map((paragraph, index) => (
                                <p key={index} className="mb-4 last:mb-0">
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                Share this story
                            </span>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted/50" />
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted/50" />
                            </div>
                        </div>

                        {/* Extended Details UI */}
                        <div className="mt-12 space-y-12">
                            {/* Author Section */}
                            <div className="bg-muted/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left border border-border/40">
                                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 ring-4 ring-background">
                                    <span className="text-2xl font-bold text-white">A</span>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-bold text-lg">Written by Admin Author</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Senior Editor at CaMonk. Passionate about simplifying complex financial concepts and empowering professionals to achieve their career goals.
                                    </p>
                                    <Button variant="link" className="px-0 h-auto text-primary text-xs font-bold uppercase tracking-wider">
                                        View Profile
                                    </Button>
                                </div>
                            </div>

                            {/* Related Posts Placeholder */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                                    <span className="h-6 w-1 rounded bg-primary"></span>
                                    You might also like
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[1, 2].map((i) => (
                                        <div key={i} className="group cursor-pointer rounded-xl border border-border/40 bg-card/50 p-4 hover:bg-card hover:shadow-md transition-all">
                                            <div className="h-32 rounded-lg bg-muted mb-3 overflow-hidden relative">
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                            </div>
                                            <h4 className="font-bold text-sm leading-tight group-hover:text-primary transition-colors">
                                                Top 10 Financial Trends to Watch in {new Date().getFullYear()}
                                            </h4>
                                            <p className="text-xs text-muted-foreground mt-1">5 min read</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </motion.div>
        </div>
    );
}

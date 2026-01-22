import { useParams } from 'react-router-dom';
import { useGetBlogs } from '@/hooks/useBlogs';
import { BlogCard } from '@/components/BlogCard';
import { BlogDetail } from '@/components/BlogDetail';
import { Skeleton } from '@/components/ui/skeleton';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Home() {
    const { id } = useParams();
    const { data: blogs, isLoading, isError } = useGetBlogs();

    return (
        <div className="h-screen w-full flex flex-col bg-background font-sans overflow-hidden">
            <Navbar />

            <main className="flex-1 flex overflow-hidden z-0 w-full relative">
                {/* Left Section */}
                <div
                    className={`flex flex-col border-r border-border/10 bg-muted/5 transition-all duration-300 h-full
                    ${id ? 'hidden md:flex md:w-[30%] min-w-[300px] max-w-[380px] shrink-0' : 'w-full'}`}
                >
                    <div className="flex-1 h-full overflow-y-auto scrollbar-hide">
                        <div className="relative p-6 space-y-2 border-b border-border/40 shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                            <h1 className="text-xl font-black tracking-tight text-foreground">
                                Insights <span className="text-primary">.</span>
                            </h1>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Expert perspectives on finance, tech, and career growth.
                            </p>
                        </div>

                        <div className="p-4 space-y-4">
                            {isLoading ? (
                                <div className="space-y-4">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="flex flex-col space-y-3">
                                            <Skeleton className="h-[140px] w-full rounded-xl" />
                                            <Skeleton className="h-3 w-3/4" />
                                        </div>
                                    ))}
                                </div>
                            ) : isError ? (
                                <div className="text-center py-10">
                                    <p className="text-destructive text-sm">Failed to load content.</p>
                                </div>
                            ) : blogs && blogs.length > 0 ? (
                                <div className="flex flex-col gap-4">
                                    {blogs.map((blog) => (
                                        <div
                                            key={blog.id}
                                            className={id === blog.id ? 'ring-1 ring-primary/50 shadow-sm rounded-xl' : ''}
                                        >
                                            <BlogCard blog={blog} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <p className="text-muted-foreground text-sm">No blogs found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div
                    className={`flex flex-col h-full overflow-y-auto scrollbar-hide bg-background transition-all duration-500
                    ${!id ? 'hidden md:flex md:items-center md:justify-center flex-1' : 'flex-1 w-full'}`}
                >
                    {id ? (
                        <BlogDetail id={id} />
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-50 min-h-[50vh]">
                            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <span className="text-4xl">👋</span>
                            </div>
                            <h2 className="text-2xl font-bold text-foreground">
                                Select a story to start reading
                            </h2>
                            <p className="text-muted-foreground max-w-md">
                                Content updates weekly. Click on any card from the list to view full details here.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

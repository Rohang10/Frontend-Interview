import type { Blog } from '@/types';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const SimpleBadge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20 ${className}`}>
        {children}
    </span>
);

export function BlogCard({ blog }: { blog: Blog }) {
    const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <Link to={`/blogs/${blog.id}`} className="group h-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="relative group rounded-xl z-0"
            >
                {/* Smoother Glowing Edge Effect */}
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-70 blur-md transition-all duration-500"></div>

                <Card className="relative overflow-hidden border-border/40 bg-card/50 hover:bg-card/90 transition-all duration-300 flex flex-row rounded-xl shadow-sm hover:shadow-lg h-auto min-h-[140px]">
                    {/* Image Section */}
                    <div className="relative w-[130px] sm:w-[150px] shrink-0 overflow-hidden min-h-full">
                        <img
                            src={blog.coverImage || "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"}
                            alt={blog.title}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        <div className="absolute top-2 left-2">
                            <SimpleBadge className="bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 border-none h-auto shadow-sm tracking-wide">
                                {blog.category[0]}
                            </SimpleBadge>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col flex-grow p-4 min-w-0">
                        <div className="flex-1 space-y-2">
                            <h3 className="font-bold text-base sm:text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                                {blog.title}
                            </h3>
                            <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3 opacity-90">
                                {blog.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between text-muted-foreground border-t border-border/30 pt-3 mt-3">
                            <div className="flex items-center gap-1.5 text-xs font-medium opacity-80">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{formattedDate}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                READ <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </Link>
    );
}

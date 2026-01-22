
import { Link } from 'react-router-dom';
import { CreateBlogModal } from './CreateBlogModal';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function Navbar() {
    const { theme, setTheme } = useTheme();

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                            <span className="text-xl font-bold text-primary">C</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-foreground/90">
                            CaMonk<span className="text-primary">Blog</span>
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                        <Link to="/blogs" className="hover:text-primary transition-colors">
                            Articles
                        </Link>
                        <Link to="#" className="hover:text-primary transition-colors">
                            Categories
                        </Link>
                        <Link to="#" className="hover:text-primary transition-colors">
                            About
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full w-9 h-9"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <div className="hidden sm:block">
                        <CreateBlogModal />
                    </div>
                </div>
            </div>
        </nav>
    );
}

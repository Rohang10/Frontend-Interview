import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    return (
        <footer className="w-full border-t border-border/40 bg-background/80 backdrop-blur-md py-4 mt-auto z-10">
            <div className="container px-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-md bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">C</span>
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-foreground/90">
                        CaMonk<span className="text-primary">Blog</span>
                    </span>
                    <span className="text-xs text-muted-foreground ml-2 border-l border-border/60 pl-3">
                        © {new Date().getFullYear()}
                    </span>
                </div>

                <div className="flex items-center gap-6 text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                    <Link to="#" className="hover:text-primary transition-colors">Terms</Link>
                    <Link to="#" className="hover:text-primary transition-colors">About Us</Link>
                </div>

                <div className="flex items-center gap-4">
                    <a href="#" className="text-muted-foreground hover:text-blue-600 transition-colors hover:scale-110 transform duration-200">
                        <Facebook className="h-3.5 w-3.5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-sky-500 transition-colors hover:scale-110 transform duration-200">
                        <Twitter className="h-3.5 w-3.5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-pink-600 transition-colors hover:scale-110 transform duration-200">
                        <Instagram className="h-3.5 w-3.5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-blue-700 transition-colors hover:scale-110 transform duration-200">
                        <Linkedin className="h-3.5 w-3.5" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

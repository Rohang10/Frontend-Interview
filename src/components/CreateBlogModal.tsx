
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateBlog } from '@/hooks/useBlogs';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    category: z.string().min(1, 'At least one category is required (comma separated)'),
    description: z.string().min(1, 'Description is required'),
    coverImage: z.string().url('Must be a valid URL'),
    content: z.string().min(10, 'Content must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export function CreateBlogModal() {
    const [open, setOpen] = useState(false);
    const { mutateAsync: createBlog, isPending } = useCreateBlog();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            await createBlog({
                ...data,
                category: data.category.split(',').map((c) => c.trim()),
            });
            toast.success('Blog created successfully!');
            setOpen(false);
            reset();
        } catch (error) {
            toast.error('Failed to create blog');
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all">
                    <Plus className="w-4 h-4" /> New Post
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto custom-scrollbar border-border/40 bg-background/95 backdrop-blur-3xl shadow-2xl p-0 gap-0 rounded-2xl">
                <DialogHeader className="p-6 pb-2 border-b border-border/10">
                    <DialogTitle className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent w-fit">Create New Story</DialogTitle>
                    <DialogDescription className="text-muted-foreground/80">
                        Share your insights with the community.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6 py-6 ring-offset-2 focus-visible:ring-2">
                    <div className="space-y-4">
                        <div className="space-y-1.5 gap-2">
                            <Label htmlFor="title" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter a captivating title..."
                                {...register('title')}
                                className="bg-muted/30 border-border/20 focus:bg-background transition-all font-medium text-lg h-12 rounded-lg"
                            />
                            {errors.title && <p className="text-destructive text-xs">{errors.title.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="category" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</Label>
                                <Input
                                    id="category"
                                    placeholder="e.g. Finance, Tech"
                                    {...register('category')}
                                    className="bg-muted/30 border-border/20 focus:bg-background transition-all rounded-lg"
                                />
                                {errors.category && <p className="text-destructive text-xs">{errors.category.message}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="coverImage" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Image URL</Label>
                                <Input
                                    id="coverImage"
                                    placeholder="https://"
                                    {...register('coverImage')}
                                    className="bg-muted/30 border-border/20 focus:bg-background transition-all rounded-lg"
                                />
                                {errors.coverImage && <p className="text-destructive text-xs">{errors.coverImage.message}</p>}
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="description" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Summary</Label>
                            <Input
                                id="description"
                                placeholder="A brief teaser..."
                                {...register('description')}
                                className="bg-muted/30 border-border/20 focus:bg-background transition-all rounded-lg"
                            />
                            {errors.description && <p className="text-destructive text-xs">{errors.description.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="content" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Content</Label>
                            <Textarea
                                id="content"
                                placeholder="Tell your story..."
                                {...register('content')}
                                className="min-h-[250px] bg-muted/30 border-border/20 focus:bg-background transition-all resize-none font-sans leading-relaxed rounded-xl p-4"
                            />
                            {errors.content && <p className="text-destructive text-xs">{errors.content.message}</p>}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-border/10">
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="hover:bg-muted font-medium text-muted-foreground">Cancel</Button>
                        <Button type="submit" disabled={isPending} className="min-w-[120px] font-semibold bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-md transition-all rounded-lg">
                            {isPending ? 'Publishing...' : 'Publish story'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

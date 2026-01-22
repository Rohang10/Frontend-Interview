import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBlogs, getBlogById, createBlog } from '../api/blogs';
import type { CreateBlogData } from '../types';

export const useGetBlogs = () => {
    return useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs,
    });
};

export const useGetBlog = (id: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ['blog', id],
        queryFn: () => getBlogById(id),
        enabled: !!id && enabled,
    });
};

export const useCreateBlog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateBlogData) => createBlog(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
        },
    });
};

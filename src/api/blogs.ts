import axios from 'axios';
import type { Blog, CreateBlogData } from '../types';

const API_URL = 'http://localhost:3002/blogs';

export const getBlogs = async (): Promise<Blog[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getBlogById = async (id: string): Promise<Blog> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createBlog = async (blogData: CreateBlogData): Promise<Blog> => {
    const newBlog = {
        ...blogData,
        date: new Date().toISOString(),
    };
    const response = await axios.post(API_URL, newBlog);
    return response.data;
};

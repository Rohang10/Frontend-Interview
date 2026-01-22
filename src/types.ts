export interface Blog {
    id: string; // json-server might use string or number, good to handle both or generic
    title: string;
    category: string[];
    description: string;
    date: string;
    coverImage: string;
    content: string;
}

export interface CreateBlogData {
    title: string;
    category: string[];
    description: string;
    coverImage: string;
    content: string;
    // date will be auto-generated or passed
}

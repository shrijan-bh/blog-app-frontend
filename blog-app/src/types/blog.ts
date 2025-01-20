

  export interface BlogResponse{
    success: string;
    data: BlogData[];
  }

  export interface BlogData {
     _id: string;
    title: string;
    content: string;
    tag: string;
    featured: boolean;
    blogImage: string;
  }
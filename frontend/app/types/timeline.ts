export interface TimelinePost {
    id: number;
    name: string;
    email: string;
    content: string;
    created_at: string;
}

export interface CreatePostData {
    name: string;
    email: string;
    content: string;
}

export interface TimelineResponse {
    timeline_posts: TimelinePost[];
}

// More flexible response type to handle different API response structures
export interface CreatePostResponse {
    timeline_post?: TimelinePost;
    post?: TimelinePost;
    message?: string;
    // Allow for direct post data in response
    id?: number;
    name?: string;
    email?: string;
    content?: string;
    created_at?: string;
}
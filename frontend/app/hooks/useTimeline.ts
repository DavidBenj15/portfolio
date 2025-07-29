import { useState, useEffect, useCallback } from 'react';
import { getTimelinePosts, createTimelinePost } from '../api/timeline';
import { TimelinePost, CreatePostData } from '../types/timeline';

export function useTimeline() {
    const [posts, setPosts] = useState<TimelinePost[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch all timeline posts
    const fetchPosts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await getTimelinePosts();
            setPosts(response.timeline_posts || []);
        } catch (err) {
            console.error('Error fetching timeline posts:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    }, []);

    // Create a new timeline post
    const createPost = useCallback(async (postData: CreatePostData) => {
        try {
            setSubmitting(true);
            setError(null);
            const response = await createTimelinePost(postData);
            
            // Try to add the new post to the beginning of the list
            // Handle different possible response structures
            if (response) {
                let newPost: TimelinePost | null = null;
                
                // Check if response has timeline_post property
                if (response.timeline_post) {
                    newPost = response.timeline_post;
                }
                // Check if response has a post property
                else if (response.post) {
                    newPost = response.post;
                }
                // Check if response contains direct post data
                else if (response.id && response.name && response.email && response.content && response.created_at) {
                    newPost = {
                        id: response.id,
                        name: response.name,
                        email: response.email,
                        content: response.content,
                        created_at: response.created_at
                    };
                }
                
                if (newPost) {
                    setPosts(prevPosts => [newPost!, ...prevPosts]);
                } else {
                    // If we can't determine the new post structure, refetch all posts
                    console.log('Could not determine new post structure, refetching posts...');
                    await fetchPosts();
                }
            }
            
            return response;
        } catch (err) {
            console.error('Error creating timeline post:', err);
            setError(err instanceof Error ? err.message : 'Failed to create post');
            throw err;
        } finally {
            setSubmitting(false);
        }
    }, [fetchPosts]);

    // Load posts on mount
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    return {
        posts,
        loading,
        submitting,
        error,
        fetchPosts,
        createPost,
        clearError: () => setError(null)
    };
}
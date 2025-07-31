import { TimelineResponse, CreatePostResponse, CreatePostData } from '../types/timeline';

// lib/api/timeline.js
const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Get all timeline posts from the API
 * @returns {Promise<TimelineResponse>} Response object containing timeline_posts array
 * @throws {Error} If the API request fails
 */
export async function getTimelinePosts(): Promise<TimelineResponse> {
    // Should be fine w/o a baseUrl in prod due to reverse proxy
    // if (!baseUrl) {
    //     throw new Error('API base URL not configured. Please set URL in your .env file.');
    // }

    try {
        const response = await fetch(`${baseUrl}/api/timeline_post`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Validate response structure
        if (!data || !Array.isArray(data.timeline_posts)) {
            throw new Error('Invalid response format: expected timeline_posts array');
        }

        return data;
    } catch (error) {
        console.error('Error fetching timeline posts:', error);
        throw error;
    }
}

/**
 * Create a new timeline post
 * @param {CreatePostData} postData - The post data
 * @returns {Promise<CreatePostResponse>} Response object from the API
 * @throws {Error} If the API request fails
 */
export async function createTimelinePost(postData: CreatePostData): Promise<CreatePostResponse> {
    // Should be fine w/o a baseUrl in prod due to reverse proxy
    // if (!baseUrl) {
    //     throw new Error('API base URL not configured. Please set URL in your .env file.');
    // }

    // Validate input
    if (!postData.name || !postData.email || !postData.content) {
        throw new Error('Missing required fields: name, email, and content are required');
    }

    try {
        // Create FormData object
        const formData = new FormData();
        formData.append('name', postData.name);
        formData.append('email', postData.email);
        formData.append('content', postData.content);

        const response = await fetch(`${baseUrl}/api/timeline_post`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating timeline post:', error);
        throw error;
    }
}
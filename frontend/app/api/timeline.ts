// lib/api/timeline.js
const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

/**
 * Get all timeline posts from the API
 * @returns {Promise<Object>} Response object containing timeline_posts array
 * @throws {Error} If the API request fails
 */
export async function getTimelinePosts() {
    if (!baseUrl) {
        throw new Error('API base URL not configured. Please set NEXT_PUBLIC_API_BASE in your .env file.');
    }

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
 * @param {Object} postData - The post data
 * @param {string} postData.name - Author name
 * @param {string} postData.email - Author email
 * @param {string} postData.content - Post content
 * @returns {Promise<Object>} Response object from the API
 * @throws {Error} If the API request fails
 */
export async function createTimelinePost(postData: { name: string, email: string, content: string }) {
    if (!baseUrl) {
        throw new Error('API base URL not configured. Please set NEXT_PUBLIC_API_BASE in your .env file.');
    }

    // Validate input
    if (!postData.name || !postData.email || !postData.content) {
        throw new Error('Missing required fields: name, email, and content are required');
    }

    try {
        const response = await fetch(`${baseUrl}/api/timeline_post`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
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
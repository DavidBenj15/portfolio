'use client'

import Section from "@/components/ui/section";
import Container from "@/components/ui/container";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import Navigation from "@/components/ui/navigation";
import { useState, useEffect } from "react";

// Mock data for demonstration - replace with actual API calls
const mockPosts = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        content: 'This is a sample timeline post to demonstrate the functionality. Great work on the new design!',
        created_at: '2025-01-20T10:30:00Z'
    },
    {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        content: 'Another example post with some longer content to show how the timeline handles different content lengths. The responsive design looks fantastic across all devices.',
        created_at: '2025-01-19T15:45:00Z'
    }
];

export default function Timeline() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        content: ''
    });

    // Load posts on component mount
    useEffect(() => {
        loadPosts();
    }, []);

    // Mock API call to load posts - replace with actual API endpoint
    const loadPosts = async () => {
        try {
            setLoading(true);
            // Replace this with actual API call: const response = await fetch('/api/timeline_post');
            // const data = await response.json();

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            setPosts(mockPosts);
            setLoading(false);
        } catch (error) {
            console.error('Error loading posts:', error);
            showMessage('Error loading posts. Please refresh the page.', 'error');
            setLoading(false);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.email.trim() || !formData.content.trim()) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        try {
            setSubmitting(true);

            // Replace with actual API call
            // const response = await fetch('/api/timeline_post', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // });

            // Mock successful submission
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newPost = {
                id: Date.now(),
                ...formData,
                created_at: new Date().toISOString()
            };

            setPosts([newPost, ...posts]);
            setFormData({ name: '', email: '', content: '' });
            showMessage('Post created successfully!', 'success');
            setSubmitting(false);
        } catch (error) {
            console.error('Error creating post:', error);
            showMessage('Error creating post. Please try again.', 'error');
            setSubmitting(false);
        }
    };

    // Handle input changes
    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    // Show message with auto-clear
    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 5000);
    };

    // Format date helper
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <main className="relative">
            <Navigation />
            <Section id="timeline" className="bg-background py-16 sm:py-20 lg:py-24 h-full">
                <Container className="max-w-4xl">
                    <div className="space-y-12">
                        {/* Header Section */}
                        <div className="space-y-6">
                            <h1 className="text-4xl sm:text-5xl lg:text-8xl font-bold text-foreground">
                                Timeline
                            </h1>
                        </div>

                        {/* Create Post Form */}
                        <Card className="p-2">
                            <CardHeader>
                                <h2 className="text-2xl font-semibold text-primary">
                                    Create a New Post
                                </h2>
                            </CardHeader>
                            <CardBody className="space-y-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input
                                            label="Name"
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            isRequired
                                            variant="bordered"
                                            labelPlacement="outside"
                                        />
                                        <Input
                                            label="Email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            isRequired
                                            variant="bordered"
                                            labelPlacement="outside"
                                        />
                                    </div>
                                    <Textarea
                                        label="Content"
                                        placeholder="Share your thoughts..."
                                        value={formData.content}
                                        onChange={(e) => handleInputChange('content', e.target.value)}
                                        isRequired
                                        variant="bordered"
                                        labelPlacement="outside"
                                        minRows={4}
                                        maxRows={8}
                                    />
                                    <div className="flex flex-col gap-3">
                                        <Button
                                            type="submit"
                                            color="primary"
                                            size="lg"
                                            isLoading={submitting}
                                            className="font-semibold"
                                        >
                                            {submitting ? 'Creating Post...' : 'Create Post'}
                                        </Button>

                                        {/* Message Display */}
                                        {message.text && (
                                            <div className={`p-3 rounded-lg text-sm font-medium ${message.type === 'success'
                                                    ? 'bg-success/20 text-success border border-success/30'
                                                    : 'bg-danger/20 text-danger border border-danger/30'
                                                }`}>
                                                {message.text}
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </CardBody>
                        </Card>

                        <Divider className="my-8" />

                        {/* Timeline Posts Section */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-semibold text-primary">
                                Timeline Posts
                            </h2>

                            {loading ? (
                                <Card>
                                    <CardBody className="text-center py-12">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                            <p className="text-muted-foreground">Loading posts...</p>
                                        </div>
                                    </CardBody>
                                </Card>
                            ) : posts.length === 0 ? (
                                <Card>
                                    <CardBody className="text-center py-12">
                                        <p className="text-muted-foreground text-lg">
                                            No posts yet. Be the first to share something!
                                        </p>
                                    </CardBody>
                                </Card>
                            ) : (
                                <div className="space-y-4">
                                    {posts.map((post, index) => (
                                        <Card
                                            key={post.id}
                                            className="border-l-4 border-l-primary/50 hover:border-l-primary transition-colors duration-200"
                                        >
                                            <CardHeader className="pb-3">
                                                <div className="flex justify-between items-start flex-wrap gap-2">
                                                    <div className="space-y-1">
                                                        <h3 className="text-lg font-semibold text-foreground">
                                                            {post.name}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {post.email}
                                                        </p>
                                                    </div>
                                                    <Chip
                                                        variant="flat"
                                                        color="primary"
                                                        size="sm"
                                                        className="font-medium"
                                                    >
                                                        {formatDate(post.created_at)}
                                                    </Chip>
                                                </div>
                                            </CardHeader>
                                            <CardBody className="pt-0">
                                                <p className="text-base text-muted-foreground leading-relaxed">
                                                    {post.content}
                                                </p>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </Section>
        </main>
    );
}
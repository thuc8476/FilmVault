import React from 'react';
import { Container, AppBar, Toolbar, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff',
        },
        secondary: {
            main: '#ff4081',
        },
    },
});

const posts = [
    {
        title: 'Blog Post 1',
        excerpt: 'This is a short summary of blog post 1.',
        image: 'https://via.placeholder.com/300',
    },
    {
        title: 'Blog Post 2',
        excerpt: 'This is a short summary of blog post 2.',
        image: 'https://via.placeholder.com/300',
    },
    {
        title: 'Blog Post 3',
        excerpt: 'This is a short summary of blog post 3.',
        image: 'https://via.placeholder.com/300',
    },
];

const Blog = () => {
    return (
        <div className='mb-4'>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg" className="mt-8">
                    <Typography variant="h4" gutterBottom className="text-center my-8">
                        Welcome to My Blog
                    </Typography>

                    <Grid container spacing={4}>
                        {posts.map((post, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card className="shadow-lg">
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={post.image}
                                        alt={post.title}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            {post.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {post.excerpt}
                                        </Typography>
                                    </CardContent>
                                    <Button size="small" color="primary" className="ml-4 mb-4">
                                        Read More
                                    </Button>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>

    );
};

export default Blog;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import api from './api'; // Axios instance for API calls

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/blogs')  // Fetch blogs from the API
      .then(response => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching blogs", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Container>Loading blogs...</Container>;
  }

  return (
    <section id="team" className="team section mt-5">
    <div className="container section-title" data-aos="fade-up">
      <span>Blog List</span>
      <h2>Blogs</h2>
      <p>Explore the blogs we have</p>
    </div>
    <Container>
      <Typography variant="h3" gutterBottom>Latest Blogs</Typography>
      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <Card>
              {blog.images && blog.images.length > 0 && (
                <CardMedia
                  component="img"
                  height="140"
                  image={`http://127.0.0.1:8000${blog.images[0]}`} // Adjust API image URL
                  alt={blog.title}
                />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.content.substring(0, 100)}...  {/* Show a preview of the content */}
                </Typography>
                <Button variant="contained" color="primary" component={Link} to={`/blogs/${blog.id}`}>
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </section>
  );
};

export default BlogList;

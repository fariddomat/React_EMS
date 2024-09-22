import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, Grid } from '@mui/material';
import api from './api'; // Axios instance for API calls

const BlogDetails = () => {
  const { id } = useParams();  // Get the blog ID from the route
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/blogs/${id}`)  // Fetch single blog by ID from the API
      .then(response => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching blog", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Container>Loading blog...</Container>;
  }

  if (!blog) {
    return <Container>Blog not found.</Container>;
  }

  return (
    <section id="team" className="team section mt-5">
    <div className="container section-title" data-aos="fade-up">
      <span>Blog</span>
      <h2>Blog</h2>
      <p>Explore the blogs we have</p>
    </div>
    <Container>
      <Card>
        {blog.images && blog.images.length > 0 && (
          <CardMedia
            component="img"
            height="400"
            image={`http://127.0.0.1:8000${blog.images[0]}`} // Adjust based on your API
            alt={blog.title}
          />
        )}
        <CardContent>
          <Typography variant="h3" gutterBottom>{blog.title}</Typography>
          <Typography variant="body1" paragraph>{blog.content}</Typography>
        </CardContent>
      </Card>

      {blog.images && blog.images.length > 0 && (
  <Grid container spacing={2} className="mt-3">
    {blog.images.map((image, index) => (
      <Grid item xs={12} md={6} key={index}>
        <Card>
          <CardMedia
            component="img"  // Set component to 'img' to load images
            height="315"
            image={`http://127.0.0.1:8000${image}`}  // Assuming images are stored in the same API location
            alt={`Blog image ${index + 1}`}
          />
        </Card>
      </Grid>
    ))}
  </Grid>
)}

      {blog.videos && blog.videos.length > 0 && (
        <Grid container spacing={2} className="mt-3">
          {blog.videos.map((video, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardMedia
                  component="iframe"
                  height="315"
                  src={`http://127.0.0.1:8000${video}`}  // Assuming the videos are hosted in the same server
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
    </section>
  );
};

export default BlogDetails;

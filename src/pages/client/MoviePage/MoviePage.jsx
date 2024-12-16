import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";

function MoviePage() {
  const rankings = [
    {
      title: "Gặp Lại Chị Bầu",
      description: "Gặp Lại Chị Bầu là một bộ phim đầy ấn tượng...",
      likes: 99,
      image: "https://via.placeholder.com/50", // Thay link bằng ảnh thật
    },
    {
      title: "Gintama",
      description: "Gintama, là một bộ manga do Sorachi Hideaki...",
      likes: 23,
      image: "https://via.placeholder.com/50",
    },
    {
      title: "Yu-Gi-Oh",
      description: "Yu-Gi-Oh là một trò chơi bài đầy tính chiến thuật...",
      likes: 24,
      image: "https://via.placeholder.com/50",
    },
    {
      title: "Fairy Tail",
      description: "Fairy Tail là một câu chuyện xoay quanh...",
      likes: 20,
      image: "https://via.placeholder.com/50",
    },
    {
      title: "Naruto",
      description: "Naruto là một loạt manga Nhật Bản do Kishimoto Masashi...",
      likes: 18,
      image: "https://via.placeholder.com/50",
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#121212", color: "#fff", minHeight: "100vh", p: 2 }}>
      {/* Banner */}
      <Box sx={{ position: "relative", mb: 4 }}>
        <img
          src="https://via.placeholder.com/800x400" // Thay link bằng hình ảnh thật
          alt="Banner"
          style={{ width: "100%", borderRadius: "8px" }}
        />
        <Button
          variant="contained"
          color="error"
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          Full HD
        </Button>
      </Box>

      {/* Nội dung */}
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Phần bình luận */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Bình luận
          </Typography>
          <TextField
            placeholder="Add a comment..."
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            sx={{ mb: 2, backgroundColor: "#fff", borderRadius: "8px" }}
          />
          <Button variant="contained" color="primary">
            Add Comment
          </Button>
        </Box>

        {/* Top bảng xếp hạng */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom sx={{ color: "#ff0" }}>
            ⭐ TOP BẢNG XẾP HẠNG
          </Typography>
          <List>
            {rankings.map((item, index) => (
              <ListItem key={index} sx={{ backgroundColor: "#1c1c1c", borderRadius: "8px", mb: 1 }}>
                <ListItemAvatar>
                  <Avatar src={item.image} alt={item.title} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={
                    <>
                      <Typography variant="body2" sx={{ color: "#bbb" }}>
                        {item.description}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#ff0", mt: 0.5 }}>
                        {item.likes} Lượt thích
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default MoviePage;

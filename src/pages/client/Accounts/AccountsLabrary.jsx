import React from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";

const AccountsLibrary = () => {
    // Example data to simulate movies (replace with actual data from your backend)
    const rentedMovies = [
        {
            image: "https://via.placeholder.com/50",
            title: "Inception",
            rentedDate: "2024-12-01",
            daysRemaining: 5,
            status: "Active",
        },
        {
            image: "https://via.placeholder.com/50",
            title: "The Matrix",
            rentedDate: "2024-12-05",
            daysRemaining: 10,
            status: "Active",
        },
    ];

    const handleDelete = (movieTitle) => {
        console.log(`Deleting movie: ${movieTitle}`);
        // Add delete functionality here
    };

    return (
        <div className="flex-1">
            <Box sx={{ padding: "20px" }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Rented Movies
                </Typography>
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>

                                <TableCell>Image</TableCell>
                                <TableCell>Movie Title</TableCell>
                                <TableCell>Rented Date</TableCell>
                                <TableCell>Days Remaining</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rentedMovies.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        <Box className="flex flex-col items-center py-3 text-gray-500">
                                            <ImageIcon sx={{ fontSize: 40, mb: 1 }} />
                                            <Typography>No movies rented yet.</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Browse the library and rent your favorite movies!
                                            </Typography>
                                            <Button variant="contained" sx={{ mt: 2 }}>
                                                Go to Library
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                rentedMovies.map((movie, index) => (
                                    <TableRow key={index}>

                                        <TableCell>
                                            <img
                                                src={movie.image}
                                                alt={movie.title}
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    objectFit: "cover",
                                                    borderRadius: "4px",
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>{movie.title}</TableCell>
                                        <TableCell>{movie.rentedDate}</TableCell>
                                        <TableCell>{movie.daysRemaining} days</TableCell>
                                        <TableCell>{movie.status}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="error"
                                                aria-label="delete"
                                                onClick={() => handleDelete(movie.title)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>

    );
};

export default AccountsLibrary;

import React, { useState } from 'react';
import { MdLocalMovies, MdCategory } from 'react-icons/md';
import { FaPlus, FaUserAlt, FaTimes, FaMask, FaImage } from 'react-icons/fa';
import { Avatar, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Grid, Paper, IconButton, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';


const data = [
    { id: 1, img: "path/to/image1.jpg", name: "Film A", description: "Description A", author: "Author A", duration: "120 min", plan: "Premium" },
    { id: 2, img: "path/to/image2.jpg", name: "Film B", description: "Description B", author: "Author B", duration: "150 min", plan: "Basic" },
];
function Movie(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        mb: { xs: 4, md: 0 },
                        mr: { md: 4 },
                    }}
                >
                    Movie
                </Typography>
                <div className='flex items-center mb-4 md:mb-0'>
                    <TextField
                        variant="outlined"
                        placeholder="Enter keywords..."


                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon style={{ color: '#999' }} />
                                </InputAdornment>
                            ),
                            style: { height: '40px' }
                        }}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '4px 0 0 4px',
                            width: '100%',
                            maxWidth: '250px',
                            height: '40px'
                        }}
                    />
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#4186E0',
                            color: '#fff',
                            minWidth: '50px',
                            borderRadius: '0 4px 4px 0',
                            height: '40px',
                        }}
                    >
                        <SearchIcon />
                    </Button>
                </div>
                <div>
                    <Button variant="contained" color="primary" startIcon={<FaPlus />} endIcon={<MdLocalMovies />} onClick={handleOpen}></Button>
                    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '80%', maxWidth: 'none' } }}>
                        <DialogTitle>ADD NEW MOVIE</DialogTitle>

                        <DialogContent>
                            <Grid container spacing={2} className='px-3' alignItems="stretch">
                                {/* Ô đầu tiên - 50% chiều rộng */}
                                <Grid item xs={12} md={6}>
                                    <Paper sx={{ p: 2 }}>
                                        {/* Name Input */}
                                        <TextField
                                            label="Name"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                        />

                                        {/* Description Input */}
                                        <TextField
                                            label="Description"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            multiline
                                            rows={1}
                                        />

                                        {/* Duration Input */}
                                        <TextField
                                            label="Duration (in minutes)"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                        />

                                        {/* Author ID Select */}
                                        <FormControl sx={{ mt: 2 }} fullWidth>
                                            <InputLabel id="author-id-select">Author ID</InputLabel>
                                            <Select
                                                labelId="author-id-select"
                                                label="Chọn giá trị"
                                            >
                                                <MenuItem value={10}>Mục 1</MenuItem>
                                                <MenuItem value={20}>Mục 2</MenuItem>
                                                <MenuItem value={30}>Mục 3</MenuItem>
                                            </Select>
                                        </FormControl>

                                        {/* Plan ID Select */}
                                        <FormControl sx={{ mt: 2 }} fullWidth>
                                            <InputLabel id="plan-id-select">Plan ID</InputLabel>
                                            <Select
                                                labelId="plan-id-select"
                                                label="Chọn giá trị"
                                            >
                                                <MenuItem value={10}>Mục 1</MenuItem>
                                                <MenuItem value={20}>Mục 2</MenuItem>
                                                <MenuItem value={30}>Mục 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            label="Duration (in minutes)"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Paper>
                                </Grid>
                            
                                <Grid item xs={12} md={6} className='flex'>
                                    <Paper sx={{ p: 3 }} className='flex-1'>
                                        <Stack direction="column" spacing={2}>
                                          
                                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                                Categories
                                                <IconButton sx={{
                                                    ml: 1,  
                                                    backgroundColor: 'primary.main',  
                                                    color: 'white',  
                                                    padding: '6px',  
                                                    '&:hover': {
                                                        backgroundColor: 'primary.dark',  
                                                        boxShadow: 3,  
                                                    },
                                                }}>
                                                    <MdCategory size={15} />
                                                </IconButton>

                                            </Typography>
                                            <Stack direction="row" spacing={1}>
                                                <Box position="relative">
                                                    <Button variant="outlined" color="primary">
                                                        Hành động
                                                    </Button>
                                                    <Box
                                                        position="absolute"
                                                        top={-8} 
                                                        left={-8}
                                                        sx={{
                                                            backgroundColor: 'white', 
                                                            borderRadius: '50%', 
                                                            padding: '2px', 
                                                            color: 'red', 
                                                            boxShadow: 1, 
                                                            cursor: 'pointer', 
                                                            '&:hover': {
                                                                backgroundColor: 'lightgray', 
                                                            },
                                                        }}
                                                    >
                                                        <FaTimes size={14} />
                                                    </Box>
                                                </Box>
                                                <Box position="relative">
                                                    <Button variant="outlined" color="primary">
                                                        Hành động
                                                    </Button>
                                                    <Box
                                                        position="absolute"
                                                        top={-8} 
                                                        left={-8} 
                                                        sx={{
                                                            backgroundColor: 'white', 
                                                            borderRadius: '50%', 
                                                            padding: '2px', 
                                                            color: 'red', 
                                                            boxShadow: 1, 
                                                            cursor: 'pointer', 
                                                            '&:hover': {
                                                                backgroundColor: 'lightgray',
                                                            },
                                                        }}
                                                    >
                                                        <FaTimes size={14} />
                                                    </Box>
                                                </Box>
                                                <Box position="relative">
                                                    <Button variant="outlined" color="primary">
                                                        Hành động
                                                    </Button>
                                                    <Box
                                                        position="absolute"
                                                        top={-8} 
                                                        left={-8} 
                                                        sx={{
                                                            backgroundColor: 'white', 
                                                            borderRadius: '50%', 
                                                            padding: '2px', 
                                                            color: 'red', 
                                                            boxShadow: 1, 
                                                            cursor: 'pointer', 
                                                            '&:hover': {
                                                                backgroundColor: 'lightgray', 
                                                            },
                                                        }}
                                                    >
                                                        <FaTimes size={14} />
                                                    </Box>
                                                </Box>
                                            </Stack>

                                          
                                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                                Actor
                                                <IconButton sx={{
                                                    ml: 1,
                                                    backgroundColor: 'primary.main',
                                                    color: 'white',
                                                    padding: '6px',
                                                    '&:hover': {
                                                        backgroundColor: 'primary.dark',
                                                        boxShadow: 3,
                                                    },
                                                }}>
                                                    <FaUserAlt size={15} />
                                                </IconButton>

                                            </Typography>
                                            <Stack direction="row" spacing={2} mt={1}>
                                                <Box
                                                    position="relative"
                                                    sx={{
                                                        borderRadius: '50%',
                                                        padding: '2px',
                                                        backgroundColor: 'white', 
                                                        boxShadow: 1, 
                                                        cursor: 'pointer', 
                                                        '&:hover': {
                                                            backgroundColor: 'lightgray', 
                                                        },
                                                    }}
                                                >
                                                    <img
                                                        src="https://i.pinimg.com/originals/3c/b5/14/3cb514b0be85da4b31b8092361b7c948.jpg"
                                                        alt="actor"
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                   
                                                    <Box
                                                        position="absolute"
                                                        top={-8} 
                                                        left={-8} 
                                                        sx={{
                                                            backgroundColor: 'white',
                                                            borderRadius: '50%', 
                                                            padding: '2px',
                                                            color: 'red',
                                                            boxShadow: 1, 
                                                            cursor: 'pointer',
                                                            '&:hover': {
                                                                backgroundColor: 'lightgray', 
                                                            },
                                                        }}
                                                    >
                                                        <FaTimes size={14} />
                                                    </Box>
                                                </Box>

                                                <Box
                                                    position="relative"
                                                    sx={{
                                                        borderRadius: '50%',
                                                        padding: '2px',
                                                        backgroundColor: 'white',
                                                        boxShadow: 1,
                                                        cursor: 'pointer', 
                                                        '&:hover': {
                                                            backgroundColor: 'lightgray',
                                                        },
                                                    }}
                                                >
                                                    <img
                                                        src="https://i.pinimg.com/originals/3c/b5/14/3cb514b0be85da4b31b8092361b7c948.jpg"
                                                        alt="actor"
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                  
                                                    <Box
                                                        position="absolute"
                                                        top={-8} 
                                                        left={-8}
                                                        sx={{
                                                            backgroundColor: 'white', 
                                                            borderRadius: '50%', 
                                                            padding: '2px', 
                                                            color: 'red', 
                                                            boxShadow: 1, 
                                                            cursor: 'pointer', 
                                                            '&:hover': {
                                                                backgroundColor: 'lightgray', 
                                                            },
                                                        }}
                                                    >
                                                        <FaTimes size={14} />
                                                    </Box>
                                                </Box>

                                                <Box
                                                    position="relative"
                                                    sx={{
                                                        borderRadius: '50%',
                                                        padding: '2px',
                                                        backgroundColor: 'white', 
                                                        boxShadow: 1,
                                                        cursor: 'pointer', 
                                                        '&:hover': {
                                                            backgroundColor: 'lightgray', 
                                                        },
                                                    }}
                                                >
                                                    <img
                                                        src="https://i.pinimg.com/originals/3c/b5/14/3cb514b0be85da4b31b8092361b7c948.jpg"
                                                        alt="actor"
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                   
                                                    <Box
                                                        position="absolute"
                                                        top={-8} 
                                                        left={-8} 
                                                        sx={{
                                                            backgroundColor: 'white', 
                                                            borderRadius: '50%', 
                                                            padding: '2px', 
                                                            color: 'red', 
                                                            boxShadow: 1, 
                                                            cursor: 'pointer', 
                                                            '&:hover': {
                                                                backgroundColor: 'lightgray',
                                                            },
                                                        }}
                                                    >
                                                        <FaTimes size={14} />
                                                    </Box>
                                                </Box>
                                            </Stack>

                                         
                                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                                Character
                                                <IconButton
                                                    sx={{
                                                        ml: 1,
                                                        backgroundColor: 'primary.main',
                                                        color: 'white',
                                                        padding: '6px',
                                                        '&:hover': {
                                                            backgroundColor: 'primary.dark',
                                                            boxShadow: 3,
                                                        },
                                                    }}>
                                                    <FaMask size={15} />
                                                </IconButton>


                                            </Typography>
                                            <Stack direction="row" spacing={2} mt={1}>
                                                <Box
                                                    position="relative"
                                                    sx={{
                                                        borderRadius: '50%',
                                                        padding: '2px',
                                                        backgroundColor: 'white', 
                                                        boxShadow: 1, 
                                                        cursor: 'pointer', 
                                                        '&:hover': {
                                                            backgroundColor: 'lightgray', 
                                                        },
                                                    }}
                                                >
                                                    <img
                                                        src="https://i.pinimg.com/originals/3c/b5/14/3cb514b0be85da4b31b8092361b7c948.jpg"
                                                        alt="actor"
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                  
                                                    <Box
                                                        position="absolute"
                                                        top={-8}
                                                        left={-8} 
                                                        sx={{
                                                            backgroundColor: 'white', 
                                                            borderRadius: '50%',
                                                            padding: '2px', 
                                                            color: 'red', 
                                                            boxShadow: 1, 
                                                            cursor: 'pointer', 
                                                            '&:hover': {
                                                                backgroundColor: 'lightgray', 
                                                            },
                                                        }}
                                                    >
                                                        <FaTimes size={14} />
                                                    </Box>
                                                </Box>

                                                <Box
                                                    position="relative"
                                                    sx={{
                                                        borderRadius: '50%',
                                                        padding: '2px',
                                                        backgroundColor: 'white', 
                                                        boxShadow: 1, 
                                                        cursor: 'pointer', 
                                                        '&:hover': {
                                                            backgroundColor: 'lightgray', 
                                                        },
                                                    }}
                                                >
                                                    <img
                                                        src="https://i.pinimg.com/originals/3c/b5/14/3cb514b0be85da4b31b8092361b7c948.jpg"
                                                        alt="actor"
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                  
                                                    <Box
                                                        position="absolute"
                                                        top={-8} 
                                                        left={-8} 
                                                        sx={{
                                                            backgroundColor: 'white',
                                                            borderRadius: '50%',
                                                            padding: '2px',
                                                            color: 'red', 
                                                            boxShadow: 1, 
                                                            cursor: 'pointer', 
                                                            '&:hover': {
                                                                backgroundColor: 'lightgray',
                                                            },
                                                        }}
                                                    >
                                                        <FaTimes size={14} />
                                                    </Box>
                                                </Box>

                                                <Box
                                                    position="relative"
                                                    sx={{
                                                        borderRadius: '50%',
                                                        padding: '2px',
                                                        backgroundColor: 'white',
                                                        boxShadow: 1, 
                                                        cursor: 'pointer', 
                                                        '&:hover': {
                                                            backgroundColor: 'lightgray',
                                                        },
                                                    }}
                                                >
                                                    <img
                                                        src="https://i.pinimg.com/originals/3c/b5/14/3cb514b0be85da4b31b8092361b7c948.jpg"
                                                        alt="actor"
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                  
                                                    <Box
                                                        position="absolute"
                                                        top={-8} 
                                                        left={-8} 
                                                        sx={{
                                                            backgroundColor: 'white',
                                                            borderRadius: '50%', 
                                                            padding: '2px',
                                                            color: 'red',
                                                            boxShadow: 1, 
                                                            cursor: 'pointer', 
                                                            '&:hover': {
                                                                backgroundColor: 'lightgray',
                                                            },
                                                        }}
                                                    >
                                                        <FaTimes size={14} />
                                                    </Box>
                                                </Box>
                                            </Stack>
                                            <Box className="mt-3" display="flex" alignItems="center">
                                                <input
                                                    accept="image/*" 
                                                    style={{ display: 'none' }}
                                                    id="file-upload"
                                                    type="file"
                                                />
                                                <label htmlFor="file-upload">
                                                    <Button variant="contained" component="span">
                                                        <FaImage />
                                                    </Button>
                                                </label>
                                            </Box>
                                            <div>
                                                <Avatar
                                                    src={'https://img.pikbest.com/origin/09/30/68/73fpIkbEsTd6Z.png!sw800'}
                                                    alt="Actor Image"
                                                    sx={{ width: 120, height: 120 }} />
                                            </div>

                                        </Stack>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                cancel
                            </Button>
                            <Button variant="contained" color="primary">
                                yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>

            
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Plan</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell><img src={row.img} alt={row.name} style={{ width: 50, height: 50 }} /></TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.author}</TableCell>
                                <TableCell>{row.duration}</TableCell>
                                <TableCell>{row.plan}</TableCell>
                                <TableCell>
                                    <IconButton color="primary"><EditIcon /></IconButton>
                                    <IconButton color="secondary"><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
}

export default Movie;
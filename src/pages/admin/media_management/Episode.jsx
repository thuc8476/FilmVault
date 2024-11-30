import React, { useState, useContext } from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography,Box, Modal, TextField, Button, InputAdornment, TablePagination,Autocomplete} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { addDocument, deleteDocument, updateDocument } from '../../../services/firebaseService';
import { ContextEpisodes } from "../../../context/EpisodeProvider";
import ModalDelete from '../../../components/Modaldetele';
import { useNotification } from "../../../context/NotificationProvider";
import { ContextMovies } from "../../../context/MovieProvider"
import { getObjectById } from '../../../services/repository';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Episodes() {
    const initialEpisode = { episodesNumber: '', episodeURL: '', idMovie: '' };
    const [open, setOpen] = useState(false);
    const [episode, setEpisode] = useState(initialEpisode);
    const [errors, setErrors] = useState(initialEpisode);
    const episodes = useContext(ContextEpisodes);
    const [openDelete, setOpenDelete] = useState(false);
    const [episodeToDelete, setEpisodeToDelete] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const showNotification = useNotification();
    const movies = useContext(ContextMovies);

    const filteredEpisodes = episodes.filter(ep =>
        (ep.episodesNumber && ep.episodesNumber.toString().includes(searchTerm)) ||
        (ep.idMovie && ep.idMovie.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleDeleteOpen = (ep) => {
        setEpisodeToDelete(ep);
        setOpenDelete(true);
    };

    const handleDeleteConfirm = async () => {
        if (episodeToDelete) {
            try {
                await deleteDocument("Episodes", episodeToDelete.id);
                showNotification('Episode deleted successfully!', "error");
                setOpenDelete(false);
                setEpisodeToDelete(null);
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        }
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        try {
            if (episode.id) {
                await updateDocument("Episodes", episode);
                showNotification('Episode updated successfully!', "info");
            } else {
                await addDocument("Episodes", episode);
                showNotification('Episode added successfully!', "success");
            }
            handleClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const validate = () => {
        const newErrors = { ...errors };
        newErrors.episodesNumber = episode.episodesNumber ? '' : 'Episode number is required';
        newErrors.episodeURL = episode.episodeURL ? '' : 'Episode URL is required';
        newErrors.idMovie = episode.idMovie ? '' : 'Movie ID is required';
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setEpisode({ ...episode, [name]: value });
    };

    const handleOpenAdd = () => {
        setEpisode(initialEpisode);
        setErrors(initialEpisode);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleEditOpen = (ep) => {
        setEpisode(ep);
        setOpen(true);
    };

    const currentRows = filteredEpisodes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main', mb: { xs: 4, md: 0 }, mr: { md: 4 } }}>
                    Episodes
                </Typography>
                <div className='flex items-center mb-4 md:mb-0'>
                    <TextField
                        variant="outlined"
                        placeholder="Search episodes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
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
                <Button onClick={handleOpenAdd} variant="contained" color="primary" startIcon={<AddIcon />}>
                    Add Episode
                </Button>
                <Modal open={open} onClose={handleClose}>
                    <Box sx={style}>
                        <Typography variant="h6">{episode.id ? 'Edit Episode' : 'Add Episode'}</Typography>
                        <TextField
                            label="Episode Number"
                            fullWidth
                            margin="normal"
                            name="episodesNumber"
                            value={episode.episodesNumber}
                            onChange={handleInput}
                            error={!!errors.episodesNumber}
                            helperText={errors.episodesNumber}
                        />
                        <TextField
                            label="Episode URL"
                            fullWidth
                            margin="normal"
                            name="episodeURL"
                            value={episode.episodeURL}
                            onChange={handleInput}
                            error={!!errors.episodeURL}
                            helperText={errors.episodeURL}
                        />   
                        <Autocomplete
                            options={movies} // Danh sách các bộ phim
                            getOptionLabel={(option) => option.nameMovie} // Hiển thị tên phim
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tìm kiếm hoặc chọn phim"
                                />
                            )}
                            value={
                                movies.find((movie) => movie.id === episode.idMovie) || null // Hiển thị phim đã chọn
                            }
                            onChange={(event, newValue) => {
                                // Cập nhật giá trị khi người dùng chọn
                                handleInput({
                                    target: { name: "idMovie", value: newValue ? newValue.id : "" },
                                });
                            }}
                            isOptionEqualToValue={(option, value) => option.id === value.id} // So sánh giá trị
                            noOptionsText="Không tìm thấy phim"
                            fullWidth
                        />
                        <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '16px' }}>
                            {episode.id ? 'Edit Episode' : 'Add Episode'}
                        </Button>
                    </Box>
                </Modal>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Episode Number</TableCell>
                            <TableCell>Episode URL</TableCell>
                            <TableCell>Movie ID</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.episodesNumber}</TableCell>
                                <TableCell>{row.episodeURL}</TableCell>
                                <TableCell>{getObjectById(row.idMovie, movies)?.nameMovie}r</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditOpen(row)} color="primary"><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDeleteOpen(row)} color="secondary"><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={episodes.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} onDeleteConfirm={handleDeleteConfirm} categoryName={`Episode ${episodeToDelete?.episodesNumber}`} />
        </div>
    );
}

export default Episodes;

import React, { useState, useContext } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, IconButton, Typography, TextField, Button,
    InputAdornment, TablePagination, Avatar, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { IoMdPhotos } from 'react-icons/io';
import { addDocument, deleteDocument, updateDocument } from '../../../services/firebaseService';
import ModalDelete from '../../../components/Modaldetele';
import { ContextActors } from "../../../context/ActorsProvider";
import { useNotification } from "../../../context/NotificationProvider";

const logo = "https://media.istockphoto.com/id/1313644269/vector/gold-and-silver-circle-star-logo-template.jpg?s=612x612&w=0&k=20&c=hDqCI9qTkNqNcKa6XS7aBim7xKz8cZbnm80Z_xiU2DI=";
const initialActor = { name: '', description: '', imgUrl: logo };
function Actor() {
    const [open, setOpen] = useState(false);
    const [actor, setActor] = useState(initialActor);
    const [errors, setErrors] = useState({});
    const [openDelete, setOpenDelete] = useState(false);
    const [actorToDelete, setActorToDelete] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const actors = useContext(ContextActors);
    const showNotification = useNotification();
    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            if (actor.id) {
                await updateDocument("Actors", actor);
                showNotification('Actor has been updated successfully!', "info");
            } else {
                await addDocument("Actors", actor);
                showNotification('Actor added successfully!', "success");
            }
            setActor(initialActor);
            setErrors({});
            handleClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleEditOpen = (actor) => {
        setActor(actor);
        setOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteDocument('Actors', actorToDelete.id, actorToDelete.imgUrl);
            setOpenDelete(false);
        } catch (error) {
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setActor({ ...actor, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors = { ...errors };
        newErrors.name = actor.name ? '' : 'Name is required';
        newErrors.description = actor.description ? '' : 'Description is required';
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setActor({ ...actor, [name]: value });
    };

    const filteredActors = actors.filter(actor =>
        actor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentRows = filteredActors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleClose = () => setOpen(false);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
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
                    Actor
                </Typography>
                <div className='flex items-center mb-4 md:mb-0'>
                    <TextField
                        variant="outlined"
                        placeholder="Enter keywords..."
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
                <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                    Add Actor
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">No actors found</TableCell>
                            </TableRow>
                        ) : (
                            currentRows.map((actor, index) => (
                                <TableRow key={actor.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Avatar src={actor.imgUrl || 'https://via.placeholder.com/150'} alt={actor.name} />
                                    </TableCell>
                                    <TableCell>{actor.name}</TableCell>
                                    <TableCell>
                                        {actor.description.split(" ").length > 10
                                            ? actor.description.split(" ").slice(0, 10).join(" ") + "..."
                                            : actor.description}
                                    </TableCell>

                                    <TableCell>
                                        <IconButton onClick={() => handleEditOpen(actor)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => { setActorToDelete(actor); setOpenDelete(true); }} color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>

                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={actors.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{actor.id ? 'Edit Actor' : 'Add Actor'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name Actor"
                        type="text"
                        fullWidth
                        value={actor.name}
                        name="name"
                        onChange={handleInputChange}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={3}
                        value={actor.description}
                        name="description"
                        onChange={handleInputChange}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                    <Typography variant="subtitle1" style={{ marginTop: '15px' }}>Avatar</Typography>
                    <Avatar
                        src={actor.imgUrl || 'https://via.placeholder.com/150'}
                        alt="Actor Image"
                        sx={{ width: 150, height: 150, margin: '10px auto' }}
                    />
                    <label htmlFor="upload-photo">
                        <input
                            style={{ display: 'none' }}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <IconButton color="primary" component="span">
                            <IoMdPhotos />
                        </IconButton>
                    </label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">
                        {actor.id ? 'Edit Actor' : 'Add Actor'}
                    </Button>
                </DialogActions>
            </Dialog>

            <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} onDeleteConfirm={handleDeleteConfirm} actorName={actorToDelete?.name} />
        </div>
    );
}

export default Actor;

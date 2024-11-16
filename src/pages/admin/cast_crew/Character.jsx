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
import { ContextCharacters } from '../../../context/Characters'
import { useNotification } from "../../../context/NotificationContext";



const initialCharacter = { name: '', description: '', imgUrl: '' };
function Character(props) {
    const [open, setOpen] = useState(false);
    const [character, setCharacter] = useState(initialCharacter);
    const [errors, setErrors] = useState({});
    const [openDelete, setOpenDelete] = useState(false);
    const [characterToDelete, setCharacterToDelete] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const characters = useContext(ContextCharacters);
    const showNotification = useNotification();


    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            if (character.id) {
                await updateDocument("Characters", character);
                showNotification('Actor has been updated successfully!', "info");
            } else {
                await addDocument("Characters", character);
                showNotification('Actor added successfully!', "success");
            }
            setCharacter(initialCharacter);
            setErrors({});
            handleClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleEditOpen = (character) => {
        setCharacter(character);
        setOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteDocument('Characters', characterToDelete.id , characterToDelete.imgUrl);
            showNotification('Actor added successfully!', "success");
            setOpenDelete(false);
        } catch (error) {
            console.error("Error deleting document: ", error);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setCharacter({ ...character, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const validate = () => {
        const newErrors = { ...errors };
        newErrors.name = character.name ? '' : 'Name is required';
        newErrors.description = character.description ? '' : 'Description is required';
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCharacter({ ...character, [name]: value });
    };

    const filteredcharacter = characters.filter(character =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const currentRows = filteredcharacter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleClose = () => setOpen(false);
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
                    Character
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
                    Add character
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
                                <TableCell colSpan={5} align="center">No characters found</TableCell>
                            </TableRow>
                        ) : (
                            currentRows.map((character, index) => (
                                <TableRow key={character.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <Avatar src={character.imgUrl || 'https://via.placeholder.com/150'} alt={character.name} />
                                    </TableCell>
                                    <TableCell>{character.name}</TableCell>
                                    <TableCell>{character.description}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditOpen(character)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => { setCharacterToDelete(character); setOpenDelete(true); }} color="secondary">
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
                count={characters.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
            />

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{character.id ? 'Edit character' : 'Add character'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name character"
                        type="text"
                        fullWidth
                        value={character.name}
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
                        value={character.description}
                        name="description"
                        onChange={handleInputChange}
                        error={!!errors.description}
                        helperText={errors.description}
                    />
                    <Typography variant="subtitle1" style={{ marginTop: '15px' }}>Avatar</Typography>
                    <Avatar
                        src={character.imgUrl || 'https://via.placeholder.com/150'}
                        alt="Charater Image"
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
                        {character.id ? 'Edit character' : 'Add character'}
                    </Button>
                </DialogActions>
            </Dialog>

            <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} onDeleteConfirm={handleDeleteConfirm} characterName={characterToDelete?.name} />
        </div>
    );
}

export default Character;
import React, { useState, useContext, } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, Modal, TextField, Button, InputAdornment, TablePagination } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { addDocument, deleteDocument, updateDocument } from '../../../services/firebaseService';
import { useNotification } from "../../../context/NotificationProvider";
import ModalDelete from '../../../components/Modaldetele';
import { ContextAuthors } from '../../../context/AuthorsProvider'
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

const internAuthor = { nameAuthor: '', description: '' };
function Author(props) {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [author, setAuthor] = useState(internAuthor);
    const [errors, setErrors] = useState(internAuthor);
    const authors = useContext(ContextAuthors);
    const [openDelete, setOpenDelete] = useState(false);
    const showNotification = useNotification();
    const [authorToDelete, setAuthorToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const filteredAuthors = authors.filter(category =>
        (category.nameCategory && category.nameCategory.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const handleSubmit = async () => {
        if (!validate()) return;
        try {
            if (author.id) {
                await updateDocument("Authors", author);
                showNotification('Category updated successfully!', "info");
            } else {
                await addDocument("Authors", author);
                showNotification('Category added successfully!', "success");
            }
            handleClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const validate = () => {
        const newErrors = { ...errors };
        newErrors.nameAuthor = author.nameAuthor ? '' : ' name is reguired';
        newErrors.description = author.description ? '' : ' description name is reguired'
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => error === '')
    }
    const handleInput = (event) => {
        const { name, value } = event.target
        setAuthor({ ...author, [name]: value });
    }
    const handleOpenAdd = () => {
        setAuthor(internAuthor);
        setErrors(internAuthor);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false)
    }
    const handleEditOpen = (author) => {
        setAuthor(author);
        setOpen(true);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleDeleteConfirm = async () => {
        if (authorToDelete) {
            try {
                await deleteDocument("Authors", authorToDelete.id);
                showNotification('Category deleted successfully!', "error");
                setOpenDelete(false);
                setAuthorToDelete(null);
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        }
    };
    const handleDeleteOpen = (author) => {
        setAuthorToDelete(author);
        setOpenDelete(true);
    };
    const currentRows = filteredAuthors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
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
                    Author
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
                <div>
                    <Button onClick={handleOpenAdd} variant="contained" color="primary" startIcon={<AddIcon />}>
                        Add Category
                    </Button>
                    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
                        <Box sx={style}>
                            <Typography id="modal-title" variant="h6" component="h2">
                                {author?.id ? 'Edit Category' : 'Add Category'}
                            </Typography>
                            <TextField
                                label="Name"
                                fullWidth
                                margin="normal"
                                name="nameAuthor"
                                value={author.nameAuthor}
                                onChange={handleInput}
                                error={!!errors.nameAuthor}
                                helperText={errors.nameAuthor}
                            />
                            <TextField
                                label="Description"
                                fullWidth
                                margin="normal"
                                name="description"
                                value={author.description}
                                onChange={handleInput}
                                error={!!errors.description}
                                helperText={errors.description}
                            />
                            <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '16px' }}>
                                {author?.id ? 'Edit Category' : 'Add Category'}
                            </Button>
                        </Box>
                    </Modal>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name Author</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.nameAuthor}</TableCell>
                                <TableCell>{row.description}</TableCell>
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
                count={authors.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} onDeleteConfirm={handleDeleteConfirm} authorName={authorToDelete?.nameAuthor} />
        </div>
    );
}

export default Author;
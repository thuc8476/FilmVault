import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, Button, InputAdornment } from '@mui/material';

const rows = [
    { nameCategories: 'Category 33ádfasdf', description: 'Description 1ádfasdf' },
    { nameCategories: 'Category ádfasdf2', description: 'Description 2ádfasdf' },
    { nameCategories: 'Category 3ádfasdf', description: 'Description 3ádfasdf' },
];

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
function Categories(props) {
    const [open, setOpen] = useState(false);
    const [editRow, setEditRow] = useState({ nameCategories: '', description: '' });
    const [editMode, setEditMode] = useState(false);
    const handleOpenAdd = () => {
        setEditMode(false); // Đặt modal ở chế độ thêm mới
        setEditRow({ nameCategories: '', description: '' }); // Xóa nội dung cũ
        setOpen(true);
    };

    const handleOpenEdit = (row) => {
        setEditMode(true); // Đặt modal ở chế độ chỉnh sửa
        setEditRow(row); // Gán giá trị danh mục cần sửa
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        if (editMode) {
            console.log("Updating existing category:", editRow);
            // Logic cập nhật danh mục hiện có
        } else {
            console.log("Adding new category:", editRow);
            // Logic thêm danh mục mới
        }
        handleClose();
    };


    return (

        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                <Typography variant="h4" component="h1" className="mb-4 md:mb-0 md:mr-4">
                    Categories
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
                        }}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '4px 0 0 4px',
                            width: '100%',
                            maxWidth: '400px', // Giảm chiều rộng tối đa để vừa với màn hình
                        }}
                    />
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#4186E0',
                            color: '#fff',
                            minWidth: '50px',
                            borderRadius: '0 4px 4px 0',
                            height: '56px',
                        }}
                    >
                        <SearchIcon />
                    </Button>
                </div>
                <div>
                    <Button onClick={handleOpenAdd} variant="contained" color="primary" startIcon={<AddIcon />}>
                        Add Categories
                    </Button>
                    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
                        <Box sx={style}>
                            <Typography id="modal-title" variant="h6" component="h2">
                                {editMode ? "Edit Category" : "Add Category"}
                            </Typography>
                            <TextField
                                label="Name"
                                fullWidth
                                margin="normal"
                                value={editRow.nameCategories}
                                onChange={(e) => setEditRow({ ...editRow, nameCategories: e.target.value })}
                            />
                            <TextField
                                label="Description"
                                fullWidth
                                margin="normal"
                                value={editRow.description}
                                onChange={(e) => setEditRow({ ...editRow, description: e.target.value })}
                            />
                            <Button onClick={handleSave} variant="contained" color="primary" style={{ marginTop: '16px' }}>
                                {editMode ? "Save Changes" : "Add Category"}
                            </Button>
                        </Box>
                    </Modal>
                </div>
            </div>

            <TableContainer component={Paper}>
                <Table
                    sx={{
                        minWidth: 650,
                        '@media (max-width: 1024px)': {
                            minWidth: 400, // Reduce width for tablets
                            fontSize: '0.875rem', // Smaller font size for compact look
                        },
                        '@media (max-width: 600px)': {
                            display: 'block', // Stack layout on mobile
                            overflowX: 'auto',
                        }
                    }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name Categories</TableCell>
                            <TableCell
                                sx={{
                                    display: { xs: 'none', sm: 'table-cell' }, // Hide on very small screens
                                }}
                            >
                                Description
                            </TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{row.nameCategories}</TableCell>
                                <TableCell
                                    sx={{
                                        display: { xs: 'none', sm: 'table-cell' }, // Hide on very small screens
                                    }}
                                >
                                    {row.description}
                                </TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleOpenEdit(row)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => console.log("Delete", row.nameCategories)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}

export default Categories;
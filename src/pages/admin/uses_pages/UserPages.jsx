import React, { useState, useContext } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import ModalDelete from '../../../components/Modaldetele';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNotification } from "../../../context/NotificationProvider";
import { TablePagination, IconButton, } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from '@mui/material';
import { ContextAccounts } from "../../../context/AccountProvider";
import { addDocument, deleteDocument, updateDocument } from '../../../services/firebaseService';
import UserDialog from './UserDialog';
function UserPages() {
    const inner = { email: "", username: "", imgUrl: "", password: "", gender: "", phone: "", roleId: "" };
    const [open, setOpen] = useState(false);
    const [account, setAccount] = useState(inner);
    const accounts = useContext(ContextAccounts);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const showNotification = useNotification();
    const [openDelete, setOpenDelete] = useState(false);
    const [accountToDelete, setAccountToDelete] = useState(null);
    const filteredCategories = accounts.filter(account =>
        (account.username && account.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const currentRows = filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleEditOpen = (account) => {
        setAccount(account);
        setOpen(true);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleInput = (event) => {
        const { name, value } = event.target
        setAccount({ ...account, [name]: value });
    }

    const handleSubmit = async () => {
        try {
            if (account.id) {
                await updateDocument("Accounts", account);
                showNotification('accounts has been updated successfully!', "info");
            } else {
                await addDocument("Accounts", account);
                showNotification('Accounts added successfully!', "success");
            }
            setAccount(inner);
            handleClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAccount({ ...account, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    const handleDeleteConfirm = async () => {
        try {
            await deleteDocument('Accounts', accountToDelete.id, accountToDelete.imgUrl);
            showNotification('Account deleted successfully!', 'success');
            setOpenDelete(false);
        } catch (error) {
            showNotification('Failed to delete the account. Please try again.', 'error');
        }
    };
    return (
        <div>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main', mb: { xs: 4, md: 0 }, mr: { md: 4 } }}>
                    Accounts
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
                <div>

                    <UserDialog
                        open={open}
                        handleClose={handleClose}
                        handleInput={handleInput}
                        account={account}
                        handleSubmit={handleSubmit}
                        handleImageChange={handleImageChange}

                    />
                </div>

            </div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>fullName</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>UserName</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Role ID</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <img
                                        src={row.imgUrl}
                                        alt={row.userName}
                                        style={{ width: 50, height: 50, borderRadius: '50%' }}
                                    />
                                </TableCell>
                                <TableCell>{row.fullName}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.password ? '••••••' : 'Google Account'}</TableCell>
                                <TableCell>{row.gender}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.roleId}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditOpen(row)} color="primary"><EditIcon /></IconButton>
                                    <IconButton onClick={() => { setAccountToDelete(row); setOpenDelete(true); }} color="secondary"><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={accounts.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} onDeleteConfirm={handleDeleteConfirm} accountToDelete={accountToDelete?.username} />
        </div>
    );
}

export default UserPages;

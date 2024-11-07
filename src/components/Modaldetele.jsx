import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const ModalDelete = ({ openDelete, setOpenDelete, onDeleteConfirm, categoryName }) => {
    const handleClose = () => setOpenDelete(false);

    return (
        <Dialog open={openDelete} onClose={handleClose}>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogContent>
                <Typography>Bạn có chắc chắn muốn xóa danh mục "{categoryName}"?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Hủy
                </Button>
                <Button onClick={onDeleteConfirm} color="secondary">
                    Xóa
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalDelete;

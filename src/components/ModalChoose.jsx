import React, { useState } from 'react';
import { Movie, Search as SearchIcon } from '@mui/icons-material';
import {
    Button,
    Stack,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    InputAdornment,
} from '@mui/material';

function ModalChoose({ openChoose, dataChoose, setOpenChoose, chooseType, onSelect, selectedItems }) {
    const [searchTerm, setSearchTerm] = useState('');
   
    const handleClose = () => {
        setOpenChoose(false);
    };

    const handleSelect = (item) => {
        onSelect(item, chooseType);
    };

    const isSelected = (item) => selectedItems.includes(item);

   
    const filteredData = dataChoose?.filter((item) =>  item.nameCategory?.toLowerCase().includes(searchTerm.toLowerCase())
      || item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Dialog open={openChoose} onClose={handleClose}>
            <DialogTitle className="flex justify-between">
                <h1>Choose {chooseType}</h1>
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
                        style: { height: '40px' },
                    }}
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '4px 0 0 4px',
                        width: '100%',
                        maxWidth: '250px',
                        height: '40px',
                    }}
                />
            </DialogTitle>

            <DialogContent>
                <Stack direction="row" spacing={1}>
                    <div className="flex flex-wrap gap-2">
                        {chooseType === 'Categories' &&
                            filteredData?.map((item) => (
                                <Button
                                    key={item.id}
                                    variant="outlined"
                                    color="primary"
                                    style={{
                                        color: '#4caf50',
                                        borderColor: '#4caf50',
                                        backgroundColor: isSelected(item.id) ? '#81c784' : '',
                                        width: `${item.nameCategory.length * 10}px`,
                                        minWidth: '100px',
                                        fontSize: '15px',
                                        textTransform: 'none',
                                    }}
                                    onClick={() => handleSelect(item.id)}
                                >
                                    {item.nameCategory}
                                </Button>
                            ))}
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {chooseType !== 'Categories' &&
                            filteredData?.map((item) => (
                                <div key={item.id} className="flex flex-col items-center">
                                    <img
                                        src={item.imgUrl}
                                        alt="actor"
                                        className={`w-24 h-24 rounded-full object-cover border-2 
                                        ${isSelected(item.id) ? 'border-green-500' : 'border-transparent'}`}
                                        onClick={() => handleSelect(item.id)}
                                    />
                                    <span
                                        className={`mt-2 text-center text-sm 
                                        ${isSelected(item.id) ? 'text-green-500' : 'text-gray-700'}`}
                                    >
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                    </div>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalChoose;

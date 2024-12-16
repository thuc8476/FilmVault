import React, { useState, useContext } from 'react';
import { Box, TextField, MenuItem, DialogTitle, DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { FaImage } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { InputAdornment, IconButton } from '@mui/material';
import { ROLES } from '../../../utils/Constants';
import { FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { FormControl, InputLabel, Select } from '@mui/material';
function UserDialog({ open, handleClose, account, handleInput, handleSubmit, handleImageChange, }) {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>  </DialogTitle>
            <DialogContent>
                <h2 className="text-2xl font-bold text-center mb-4">Edit user information</h2>
                <form className="space-y-4">
                    <Box className="mt-3" display="flex" alignItems="center">
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="file-upload"
                            type="file"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="file-upload">
                            <Button variant="contained" component="span">
                                <FaImage />
                            </Button>
                        </label>
                    </Box>
                    <div>
                        <Avatar
                            src={account.imgUrl}
                            alt="Actor Image"
                            sx={{
                                width: 120,
                                height: 120,
                                margin: '10px auto',
                                borderRadius: '50%'
                            }}
                        />
                    </div>
                    <TextField
                        fullWidth
                        label="FullName"
                        name="fullName"
                        value={account.fullName}
                        onChange={handleInput}
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={account.email}
                        onChange={handleInput}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        fullWidth
                        label="UserName"
                        name="username"
                        value={account.username}
                        onChange={handleInput}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <Box display="flex" alignItems="center">
                        <TextField
                            fullWidth
                            required
                            label="PassWord"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            value={account.password}
                            onChange={handleInput}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={toggleShowPassword} edge="end">
                                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <FormControl fullWidth>
                        <FormLabel>Giới tính</FormLabel>
                        <RadioGroup
                            name="gender"
                            value={account.gender}
                            onChange={handleInput}
                            row
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Nam" />
                            <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                            <FormControlLabel value="other" control={<Radio />} label="Khác" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Phone number"
                        name="phone"
                        value={account.phone}
                        onChange={handleInput}
                    />
                    <FormControl
                        fullWidth
                        margin="dense"
                    >
                        <InputLabel id="roleId">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            value={account.roleId}
                            onChange={handleInput}
                            name="roleId"
                        >
                            {Object.values(ROLES).map((role, index) => (
                                <MenuItem value={role} key={index} >
                                    {role}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full flex justify-center items-center px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    >
                        confirm edit user
                    </button>
                </form>
            </DialogContent>
        </Dialog >
    );
}

export default UserDialog;

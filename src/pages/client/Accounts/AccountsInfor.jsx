import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { updateDocument } from '../../../services/firebaseService';
import { TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import  { useAccount } from "../../../context/ProfileProvider";
import { useNotification } from "../../../context/NotificationProvider";
function AccountsInfor() {

    const showNotification = useNotification();
    const [showPassword, setShowPassword] = useState(false);
    const { account ,setAccount } = useAccount();
    
    const handleInput = (event) => {
        const { name, value } = event.target;
        setAccount((prevUsers) => ({ ...prevUsers, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page reload
        try {
            if (account.id) {
                await updateDocument("Accounts",account);
                showNotification('User has been updated successfully!', "info");
            } else {
                showNotification('No user ID found, unable to update.', "error");
            }
        } catch (error) {
            console.error("Error:", error);
            showNotification('An error occurred while updating the user.', "error");
        }
    };
    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="flex-1">
            <div className="bg-white p-6">
                <h2 className="text-2xl font-semibold mb-6">Account Information</h2>
                <form className="grid gap-6" onSubmit={handleSubmit}>
                    <TextField
                        label="Full Name"
                        name="fullName"
                        value={account?.fullName || ""}
                        onChange={handleInput}
                        variant="outlined"
                        className="bg-gray-50 rounded-md"
                        InputProps={{
                            style: { borderRadius: "8px" },
                        }}
                        fullWidth
                    />
                    <div className="flex gap-4">
                        <TextField
                            label="Username"
                            name="username"
                            value={account?.username || ""}
                            onChange={handleInput}
                            variant="outlined"
                            className="bg-gray-50 rounded-md"
                            InputProps={{
                                style: { borderRadius: "8px" },
                            }}

                            fullWidth
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={account?.email || ""}
                            onChange={handleInput}
                            variant="outlined"
                            className="bg-gray-50 rounded-md"
                            InputProps={{
                                style: { borderRadius: "8px" },
                            }}

                            fullWidth
                        />
                    </div>
                    <FormControl>
                        <FormLabel className="text-gray-600 font-medium">Gender</FormLabel>
                        <RadioGroup
                            row
                            name="gender"
                            value={account?.gender || ""}
                            onChange={handleInput}
                        >
                            <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Male"
                            />
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                            <FormControlLabel
                                value="other"
                                control={<Radio />}
                                label="Other"
                            />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        label="Phone"
                        name="phone"
                        value={account?.phone || ""}
                        onChange={handleInput}
                        variant="outlined"
                        className="bg-gray-50 rounded-md"
                        InputProps={{
                            style: { borderRadius: "8px" },
                        }}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={account?.password || ""}
                        onChange={handleInput}
                        variant="outlined"
                        className="bg-gray-50 rounded-md"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={toggleShowPassword} edge="end">
                                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            style: { borderRadius: "8px" },
                        }}
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-32 bg-blue-500 text-white hover:bg-blue-600 text-sm rounded-md"
                        onClick={handleSubmit}
                    >
                        Update
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AccountsInfor;

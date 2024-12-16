import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Pagination,
    Box,
    Chip,
} from "@mui/material";

function SubscriptionTable() {
    const rows = [
        {
            id: 1,
            plan: "Di Động",
            startDate: "17/11/2024",
            expiryDate: "17/5/2025",
            price: "432.000 ₫",
            paymentMethod: "Credit Card",
            status: "Active",
        },
    ];

    return (
        <div className="flex-1">
            <Box>
                {/* Tiêu đề */}
                <Typography variant="h5" align="center" gutterBottom>
                    User Subscription Management
                </Typography>

                {/* Bảng */}
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Plan</TableCell>
                                <TableCell>Start Date</TableCell>
                                <TableCell>Expiry Date</TableCell>
                                <TableCell>Price (VND)</TableCell>
                                <TableCell>Payment Method</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.plan}</TableCell>
                                    <TableCell>{row.startDate}</TableCell>
                                    <TableCell>{row.expiryDate}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>{row.paymentMethod}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status}
                                            color="success"
                                            size="small"
                                            sx={{
                                                backgroundColor: row.status === "Active" ? "#d4edda" : "",
                                                color: row.status === "Active" ? "#155724" : "",
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Phân trang */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Pagination count={1} page={1} />
                </Box>
            </Box>
        </div>

    );
}

export default SubscriptionTable;

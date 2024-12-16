import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  Grid,
  Button,
  TextField,
  Divider,
} from "@mui/material";

function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState("1 Tháng");
  const [selectedPayment, setSelectedPayment] = useState("");

  const plans = [
    { name: "1 Tháng", price: "180,000VND", discount: "Giảm 10%", originalPrice: "200,000VND" },
    { name: "6 Tháng", price: "1,020,000VND", discount: "Giảm 15%", originalPrice: "1,200,000VND" },
    { name: "12 Tháng", price: "1,680,000VND", discount: "Giảm 30%", originalPrice: "2,400,000VND" },
  ];

  const paymentMethods = [
    "Thẻ tín dụng",
    "Thẻ ATM",
    "Ví MoMo",
    "Ví ZaloPay",
    "Ví ShopeePay",
    "VNPAY",
  ];

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
  };

  return (
    <Box sx={{ p: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Grid container spacing={2}>
        {/* Chọn Gói Đăng Ký */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Chọn Gói Đăng Ký
              </Typography>
              <RadioGroup value={selectedPlan} onChange={handlePlanChange}>
                {plans.map((plan, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                      p: 2,
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                    }}
                  >
                    <FormControlLabel
                      value={plan.name}
                      control={<Radio />}
                      label={plan.name}
                    />
                    <Box>
                      <Typography color="error">{plan.discount}</Typography>
                      <Typography sx={{ textDecoration: "line-through", color: "#888" }}>
                        {plan.originalPrice}
                      </Typography>
                      <Typography fontWeight="bold">{plan.price}</Typography>
                    </Box>
                  </Box>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        </Grid>

        {/* Chọn Phương Thức Thanh Toán */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Chọn phương thức thanh toán
              </Typography>
              <Grid container spacing={2}>
                {paymentMethods.map((method, index) => (
                  <Grid item xs={6} key={index}>
                    <Button
                      variant={selectedPayment === method ? "contained" : "outlined"}
                      fullWidth
                      sx={{
                        textTransform: "none",
                        p: 2,
                        border: selectedPayment === method ? "2px solid #1976d2" : "1px solid #ddd",
                      }}
                      onClick={() => handlePaymentChange(method)}
                    >
                      {method}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#ffc107", color: "#000", mb: 1 }}
              >
                PayPal
              </Button>
              <Button
                variant="contained"
                fullWidth
                sx={{ backgroundColor: "#000", color: "#fff" }}
              >
                Thẻ ghi nợ hoặc tín dụng
              </Button>
              <Typography variant="caption" sx={{ mt: 1, display: "block", textAlign: "center" }}>
                Được hỗ trợ bởi PayPal
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Thông Tin Thanh Toán */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                THÔNG TIN THANH TOÁN
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography>Tài khoản: laimanh@gmail.com</Typography>
                <Typography>Tên gói: Siêu Việt</Typography>
                <Typography>Ngày hiệu lực: 12/12/2024</Typography>
                <Typography>Ngày hết hạn: 12/1/2025</Typography>
                <Typography>Khuyến mãi: 10%</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Typography variant="h6">Tổng cộng:</Typography>
                <Typography variant="h6" color="error">
                  180,000đ
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PaymentPage;

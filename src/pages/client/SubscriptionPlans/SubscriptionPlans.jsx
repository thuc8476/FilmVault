import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      name: "Di Động",
      price: "80,000/month",
      features: [
        { text: "Có quảng cáo", included: false },
        { text: "Xem trên thiết bị di động", included: true },
        { text: "Kho phim có sẵn với hơn 10,000 giờ nội dung đặc sắc", included: true },
      ],
    },
    {
      id: 2,
      name: "Cao Cấp",
      price: "120,000/month",
      features: [
        { text: "Hỗ trợ đa nền tảng", included: true },
        { text: "Không có quảng cáo", included: true },
        { text: "Kho phim có sẵn với hơn 10,000 giờ nội dung đặc sắc", included: true },
      ],
    },
    {
      id: 3,
      name: "Siêu Việt",
      price: "200,000/month",
      features: [
        { text: "Hỗ trợ đa nền tảng", included: true },
        { text: "Kho phim thuê Việt Nam và Châu Á với nhiều siêu phẩm độc quyền", included: true },
        { text: "Không có quảng cáo", included: true },
        { text: "Toàn bộ đặc quyền gói Cao Cấp", included: true },
      ],
    },
    {
      id: 4,
      name: "Galaxy VIP",
      price: "300,000/month",
      features: [
        { text: "Không có quảng cáo", included: true },
        { text: "Hỗ trợ đa nền tảng", included: true },
        { text: "Xem không giới hạn kho phim thuê Việt Nam, Châu Á và Hollywood", included: true },
        { text: "Toàn bộ đặc quyền gói Siêu Việt", included: true },
      ],
    },
  ];

  return (
    <div>
         <Box sx={{ backgroundColor: "#f5f5f5", p: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Chọn gói Galaxy Play
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {plans.map((plan) => (
          <Card
            key={plan.id}
            sx={{
              width: 280,
              border: selectedPlan === plan.id ? "2px solid #1976d2" : "1px solid #ddd",
              boxShadow: selectedPlan === plan.id ? "0px 4px 20px rgba(25, 118, 210, 0.2)" : "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onClick={() => setSelectedPlan(plan.id)}
          >
            <CardContent>
              <Typography variant="h6" align="center" gutterBottom>
                {plan.name}
              </Typography>
              <Typography variant="subtitle1" align="center" color="text.secondary" gutterBottom>
                {plan.price}
              </Typography>
              <List>
                {plan.features.map((feature, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemIcon>
                      {feature.included ? (
                        <CheckIcon sx={{ color: "green" }} />
                      ) : (
                        <CloseIcon sx={{ color: "red" }} />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={feature.text} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={selectedPlan === null}
          onClick={() => alert(`Bạn đã chọn gói: ${plans.find((p) => p.id === selectedPlan).name}`)}
        >
          Tiếp tục
        </Button>
      </Box>
    </Box>
    </div>
   
  );
}

export default SubscriptionPlans;

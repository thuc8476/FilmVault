import React from 'react';
import { Container, Typography, Grid, Box, Link } from '@mui/material';

const Support = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Khách hàng cần chúng tôi hỗ trợ?
        </Typography>
        <Typography variant="body1">
          Hỗ trợ giải đáp các vấn đề trong quá trình sử dụng dịch vụ Galaxy Play.
        </Typography>
        <Typography variant="body1">
          📧 Email: <Link href="mailto:play@galaxy.com.vn">play@galaxy.com.vn</Link> | 📞 Hotline: 19008675
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            PHƯƠNG THỨC THANH TOÁN
          </Typography>
          <ul>
            <li>Galaxy Play có dịch vụ thanh toán qua thẻ cào không?</li>
            <li>Những phương thức thanh toán nào đang áp dụng?</li>
            <li>Đăng ký gói F10 có bị trừ cước không?</li>
            <li>Gói F10 có tự động gia hạn không?</li>
            <li>Làm sao để hủy gói F10?</li>
          </ul>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            THÔNG TIN GALAXY PLAY
          </Typography>
          <ul>
            <li>Galaxy Play là gì?</li>
            <li>Những danh mục sản phẩm nào?</li>
            <li>Galaxy Play có thể xem trên thiết bị nào?</li>
            <li>Phim Thuê là gì?</li>
            <li>Phim Theo Gói là gì?</li>
          </ul>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            CÂU HỎI THƯỜNG GẶP
          </Typography>
          <ul>
            <li>Tài khoản Galaxy Play có thể đăng nhập trên bao nhiêu thiết bị?</li>
            <li>Có giới hạn số lượng phim tải về không?</li>
            <li>Làm thế nào để hủy tài khoản?</li>
            <li>Xem lại phim thuê có được không?</li>
          </ul>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            GÓI DỊCH VỤ
          </Typography>
          <ul>
            <li>Gói FIM30 là gì?</li>
            <li>Đăng ký gói FIM30 như thế nào?</li>
            <li>Gói FIM30 có sử dụng được gói data khác không?</li>
            <li>Gói FIM2 là gì?</li>
          </ul>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Support;

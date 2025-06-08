import React, { useState } from "react";
import {
  // Imports từ khung footer gốc
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Link,
  IconButton,
  // Imports cần thiết cho form
  TextField,
  Button,
  Snackbar,
  Alert,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { Facebook, YouTube, Send } from "@mui/icons-material";
import Logo from "/MomUni.svg"; // Đảm bảo đường dẫn đến logo là chính xác
import axios from 'axios'; // Giả định bạn đã cài đặt axios

export default function Footer() {
  // === LOGIC CỦA FORM (Đã chính xác, giữ nguyên) ===
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    question: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Thay thế bằng API thật của bạn
      await axios.post("expert-form/create", formData);
      setSnackbar({
        open: true,
        message: "Câu hỏi của bạn đã được gửi thành công!",
        severity: "success",
      });
      setFormData({ name: "", email: "", topic: "", question: "", phone: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setSnackbar({
        open: true,
        message: "Gửi câu hỏi thất bại. Vui lòng thử lại sau.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Style cho các ô trong bảng của form (trên nền trắng)
  const formTableCellSx = {
    border: 0,
    py: 0.75,
    color: "text.secondary",
    paddingLeft: 0,
    paddingRight: 1,
  };

  return (
    <Box sx={{ backgroundColor: "#A0C4B8", color: "#fff", py: 6, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Column 1: Thông tin */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: 2 }}>
              <Box
                component="img"
                src={Logo}
                alt="MomUni Logo"
                sx={{ height: 40 }}
              />
            </Box>
            <Typography variant="subtitle1" fontWeight="bold">
              MomUni
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Mã số thuế : 0123456789
            </Typography>
            <Typography variant="body2">Địa chỉ : uwu</Typography>
            <Typography variant="body2">Hotline : 0000000000</Typography>
            <Typography variant="body2">
              Website :{" "}
              <Link href="#" color="inherit">
                http://momuni.vn
              </Link>
            </Typography>
            <Typography variant="body2">
              Email :{" "}
              <Link href="mailto:admin@momuni.vn" color="inherit">
                admin@momuni.vn
              </Link>
            </Typography>
          </Grid>

          {/* Column 2: Chính sách */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
              CHÍNH SÁCH
            </Typography>
            <Stack spacing={1}>
              <Link href="#" color="inherit" underline="hover">
                Về chúng tôi
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Câu hỏi thường gặp
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Chính sách bảo mật
              </Link>
              <Link href="#" color="inherit" underline="hover">
                Chính sách bảo hành
              </Link>
            </Stack>

            <Stack style={{ marginTop: '16px' }} spacing={1}>
              <Grid item xs={12} sm={6} md={2}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                  MẠNG XÃ HỘI
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <IconButton color="inherit">
                    <Facebook />
                  </IconButton>
                  <IconButton color="inherit">
                    <YouTube />
                  </IconButton>
                </Stack>
                <Typography variant="body2">
                  © 2025 Momuni.vn. Designed by{" "}
                  <Link
                    href="https://nina.vn"
                    target="_blank"
                    rel="noopener"
                    color="inherit"
                  >
                    Nina.vn
                  </Link>
                </Typography>
              </Grid>

            </Stack>
          </Grid>

          {/* Column 4: Form */}
          <Grid item xs={12} sm={6} md={5}>
            <Box
              sx={{
                bgcolor: "white",
                color: "text.primary",
                p: { xs: 2, md: 3 },
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                GỬI CÂU HỎI CHO CHUYÊN GIA
              </Typography>
              <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Table size="small">
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ ...formTableCellSx, width: '100px' }}>Họ tên</TableCell>
                      <TableCell sx={{ ...formTableCellSx, p: 0 }}>
                        <TextField variant="outlined" size="small" fullWidth placeholder="Tên của bạn" name="name" value={formData.name} onChange={handleChange} required />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ ...formTableCellSx }}>Email</TableCell>
                      <TableCell sx={{ ...formTableCellSx, p: 0 }}>
                        <TextField variant="outlined" size="small" fullWidth placeholder="Email để nhận phản hồi" name="email" type="email" value={formData.email} onChange={handleChange} required />
                      </TableCell>
                    </TableRow>

                    {/* === TRƯỜNG MỚI: SỐ ĐIỆN THOẠI === */}
                    <TableRow>
                      <TableCell sx={{ ...formTableCellSx }}>Điện thoại</TableCell>
                      <TableCell sx={{ ...formTableCellSx, p: 0 }}>
                        <TextField variant="outlined" size="small" fullWidth placeholder="Số điện thoại (tùy chọn)" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                      </TableCell>
                    </TableRow>

                    {/* === TRƯỜNG MỚI: CHỦ ĐỀ === */}
                    <TableRow>
                      <TableCell sx={{ ...formTableCellSx }}>Chủ đề</TableCell>
                      <TableCell sx={{ ...formTableCellSx, p: 0 }}>
                        <TextField variant="outlined" size="small" fullWidth placeholder="Chủ đề bạn quan tâm" name="topic" value={formData.topic} onChange={handleChange} required />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell sx={{ ...formTableCellSx, verticalAlign: 'top', pt: 1.5 }}>Câu hỏi</TableCell>
                      <TableCell sx={{ ...formTableCellSx, p: 0 }}>
                        <TextField variant="outlined" fullWidth placeholder="Nội dung câu hỏi của bạn..." name="question" multiline rows={3} value={formData.question} onChange={handleChange} required />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  endIcon={<Send />}
                  sx={{ mt: 2, fontWeight: 'bold' }}
                >
                  {loading ? "Đang gửi..." : "Gửi câu hỏi"}
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar để hiển thị thông báo */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
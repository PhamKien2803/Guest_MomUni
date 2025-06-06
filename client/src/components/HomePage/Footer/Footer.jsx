import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Link,
  IconButton,
} from "@mui/material";
import { Facebook, YouTube } from "@mui/icons-material";
import Logo from "/MomUni.svg";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#A0C4B8", color: "#fff", py: 6, mt: 8 }}>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          {/* Column 1 */}
          <Grid item xs={12} md={3.5}>
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

          {/* Column 2 */}
          <Grid item xs={12} md={3}>
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
          </Grid>

          {/* Column 3 */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
              MẠNG XÃ HỘI
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
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
        </Grid>
      </Container>
    </Box>
  );
}

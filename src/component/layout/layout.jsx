import Navbar from "../navbar/navbar";
import Header from "../header/header";
import Message from "../message/message";
import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <>
      <Message />
      <Navbar />
      <Box component="main" sx={{}}>
        {children}
      </Box>
      <Header />
    </>
  );
}

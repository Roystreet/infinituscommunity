import { Box } from "@mui/material";
import { useState } from "react";

export default function Header() {
  const [route, setRoute] = useState("");

  return (
    <Box
      component="header"
      sx={{
        background:
          "linear-gradient(262.41deg, #690879 -10.12%, #50BADB 62.5%)",
        height: 50,
      }}
    ></Box>
  );
}

import styles from "./header.modules.css";
import { Box } from "@mui/material";
import { useState } from "react";

export default function Header() {
  const [route, setRoute] = useState("");

  return <Box component="header"></Box>;
}

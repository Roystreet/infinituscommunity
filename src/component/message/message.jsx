import { Box } from "@mui/material";

export default function Message() {
  return (
    <Box className="hidden-message" component="div">
      <Box component="div" className="container-message center">
        <Box component="p">
          Hola! Estamos felices de verte aqui. Para tener una mejor experiencia,
          abre la app en tu celular ;D
        </Box>
      </Box>
    </Box>
  );
}

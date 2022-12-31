import { Box } from "@mui/material";

export default function Message() {
	return (
		<Box className="hidden-message" component="div">
			<Box component="div" className="container-message center">
				<Box component="p">Hi! We are glad to see you here. To get the best experience, open the app in your smartphone ;D</Box>
			</Box>
		</Box>
	);
}

import { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
import { Box, Container, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { DarkModeOutlined, ExpandMore, LightModeOutlined } from "@mui/icons-material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const options = ['AR', 'EN'];

const Home = () => {
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => { setAnchorEl(event.currentTarget); };
    const handleMenuItemClick = (event, index) => { setSelectedIndex(index); setAnchorEl(null); };
    const handleClose = () => { setAnchorEl(null); };

    return (
        <Box sx={{ bgcolor: "#283445", gap: "5px", borderRadius: "7px" }}>
            <Container>
                <Stack direction={"row"} alignItems={"center"}>

                    <Typography
                        sx={{
                            mr: 2,

                            p: "3px 10px",

                            bgcolor: "#D23F57",

                            borderRadius: "12px",

                            fontSize: "10px",
                            fontWeight: "bold",
                            color: "#fff",
                        }}
                        variant="body2"
                    >
                        HOT

                    </Typography>

                    <Typography
                        sx={{
                            fontSize: "12px",
                            fontweight: 300,
                            color: "#fff",
                        }}

                        variant="body2"

                    >
                        Free Express Shipping

                    </Typography>

                    {/* box for spacing */}
                    <Box flexGrow={0.9} />


                    {/* start of light && dark themes button */}
                    <div>

                        {theme.palette.mode === "light" ? (
                            <IconButton
                                sx={{ color: "#fff" }}
                                onClick={() => {
                                    localStorage.setItem(
                                        "mode",
                                        theme.palette.mode === "dark" ? "light" : "dark"
                                    );
                                    colorMode.toggleColorMode();
                                }}
                                color="inherit"
                            >
                                <LightModeOutlined fontSize="small" />
                            </IconButton>
                        ) : (
                            <IconButton
                                onClick={() => {
                                    localStorage.setItem(
                                        "mode",
                                        theme.palette.mode === "dark" ? "light" : "dark"
                                    );
                                    colorMode.toggleColorMode();
                                }}
                                color="inherit"
                            >
                                <DarkModeOutlined fontSize="small" />
                            </IconButton>)}
                    </div>
                    {/* end of light && dark themes button */}

                    <List
                        component="nav"
                        aria-label="Device settings"
                        sx={{ "$:hover": { cursor: "pointer" }, borderRadius: "5px", bgcolor: "reverse" }}
                    >
                        <ListItemButton
                            id="lock-button"
                            aria-haspopup="listbox"
                            aria-controls="lock-menu"
                            aria-label="when device is locked"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClickListItem}
                            sx={{ "$:hover": { cursor: "pointer" }, borderRadius: "5px" }}

                        >
                            <ListItemText
                                secondary={options[selectedIndex]}
                                sx={{ ".MuiTypography-root": { fontSize: "14px", color: "#fff" } }}
                            />
                            <ExpandMore sx={{ fontSize: "14px", color: "#fff" }} />
                        </ListItemButton>
                    </List>
                    <Menu
                        sx={{ alignItems: "center", fontSize: "11px" }}

                        id="lock-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'lock-button',
                            role: 'listbox',
                        }}
                    >
                        {options.map((option, index) => (
                            <MenuItem
                                sx={{ fontSize: "11px", p: "3px , 10px", minHeight: "10px", bgcolor: "#abc", borderRadius: "5px" }}
                                key={option}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>

                    <IconButton href="https://www.linkedin.com/in/abderrahman-magdy-238891226" target="_blank">
                        <LinkedInIcon sx={{ fontSize: "16px", color: "#fff", "&:hover": { cursor: "pointer" }, margin: "5px" }} />
                    </IconButton>
                    <IconButton href="https://twitter.com/3bdelra67501443" target="_blank">
                        <XIcon sx={{ fontSize: "16px", color: "#fff", "&:hover": { cursor: "pointer" }, margin: "5px" }} />
                    </IconButton>
                    <IconButton href="https://www.facebook.com/3bdo.mgdi" target="_blank">
                        <FacebookIcon sx={{ fontSize: "16px", color: "#fff", "&:hover": { cursor: "pointer" }, margin: "5px" }} />
                    </IconButton>
                    <IconButton href="https://www.instagram.com/3bdo.mgdii" target="_blank">
                        <InstagramIcon sx={{ fontSize: "16px", color: "#fff", "&:hover": { cursor: "pointer" }, margin: "5px" }} />
                    </IconButton>


                </Stack>

            </Container>
        </Box >
    );
};

export default Home;
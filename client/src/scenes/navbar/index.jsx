import { useState, useEffect, useRef } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    // Select,
    Menu as FloatingMenu,
    MenuItem,
    // FormControl,
    useTheme,
    useMediaQuery
} from "@mui/material";
import {
    Search,
    DarkMode,
    LightMode,
    Menu,
    Close,
    // EditIcon,
} from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from "react-redux";
import {
    setMode,
    setLogout
} from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { setIpAddress } from "state";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const [anchorEl, setAnchorEl] = useState(undefined);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const anchorRef = useRef(null);

    const theme = useTheme();
    // const neutralDark = theme.palette.neutral.dark;
    const neutralMain = theme.palette.neutral.main;
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    // const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    // const bgPath = "bg1.jpg";

    // const [imgHeight, setImgHeight] = useState('auto');
    const [ip, setIp] = useState("");

    const getIpAddress = async () => {
        try {
            const response = await fetch(`http://localhost:3001/posts/ip`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-type": "application/json"
                },
            });
            const ipResponse = await response.json();
            dispatch(setIpAddress({ ip: ipResponse }));
            setIp(ipResponse);
            // console.log(`ip address >> ${ip}`);
        } catch (err) {
            console.err(`err >> ${err}`);
        }

    };

    const handleAdminMenuOpen = (event) => {
        try {
            anchorRef.current = event.currentTarget
            setAnchorEl(event.currentTarget);
        } catch (err) {
            console.log(`err >> ${err}`);
        }
    }

    const handleAdminMenuClose = () => {
        setAnchorEl(null);
    };

    // what is this for? find out
    // useEffect(() => {
    //     const handleResize = () => {
    //         const heightVal = window.innerHeight * (isNonMobileScreens ? 0.4 : 0.3)
    //         // setImgHeight(heightVal + 'px');
    //     };

    //     handleResize(); // Set initial height
    //     window.addEventListener('resize', handleResize); // Update height on resize

    //     return () => {
    //         window.removeEventListener('resize', handleResize); // Clean up event listener
    //     };
    // }, []);

    useEffect(() => {
        getIpAddress();
    }, [ip]); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <FlexBetween padding="1rem 6%" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color={neutralMain}
                    onClick={() => navigate("/")}
                    sx={{
                        "&:hover": {
                            color: neutralLight,
                            cursor: "pointer",
                        },
                    }}
                >
                    Home
                </Typography>
                {isNonMobileScreens && (
                    <FlexBetween
                        backgroundColor={neutralLight}
                        borderRadius="9px"
                        gap="3rem"
                        padding="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )}
            </FlexBetween>

            {/* DESKTOP NAV */}
            {isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px" }} />
                        ) : (
                            <LightMode sx={{ color: dark, fontSize: "25px" }} />
                        )}
                    </IconButton>
                    <IconButton onClick={handleAdminMenuOpen}>
                        <AccountCircleIcon />
                    </IconButton>
                    <FloatingMenu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleAdminMenuClose}
                    >
                        {!user ? (
                            <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
                        ) : (
                            <MenuItem onClick={() => {
                                handleAdminMenuClose();
                                dispatch(setLogout());
                            }}>Logout</MenuItem>
                        )}
                        {/* <MenuItem onClick={handleAdminMenuClose}>Placeholder</MenuItem> */}
                    </FloatingMenu>

                </FlexBetween>
            ) : (
                <IconButton
                    onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu />
                </IconButton>
            )}

            {/** MOBILE NAV */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    zIndex="10"
                    maxWidth="500px"
                    minWidth="300px"
                    backgroundColor={background}
                >
                    {/** CLOSE ICON */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                        >
                            <Close />
                        </IconButton>
                    </Box>
                    {/** MENU IETMS */}
                    <FlexBetween
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        gap="3rem"
                    >
                        <IconButton
                            onClick={() => dispatch(setMode())}
                            sx={{ fontSize: "25px" }}
                        >
                            {theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightMode sx={{ color: dark, fontSize: "25px" }} />
                            )}
                        </IconButton>
                        <IconButton onClick={handleAdminMenuOpen}>
                            <AccountCircleIcon />
                        </IconButton>
                    </FlexBetween>
                </Box>
            )}
        </FlexBetween>
    );
};

export default Navbar;
import { useState, useEffect } from "react";
import {
    IconButton,
    Box,
    Divider,
    // IconButton,
    InputBase,
    Typography,
    // Select,
    // MenuItem,
    // FormControl,
    useTheme,
    useMediaQuery,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import EditIcon from '@mui/icons-material/Edit';
import {
    EditOutlined,
    // DeleteOutlined,
    // AttachFileOutlined,
    // GifBoxOutlined,
    ImageOutlined,
    // MicOutlined,
    // MoreHorizOutlined,
} from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { setTitleState } from "state";

const TitleImageWidget = ({
    title,
    imagePath,
}) => {

    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const [uploadImage, setUploadImage] = useState(false);
    const [imageEdit, setImageEdit] = useState(null);
    const [titleEdit, setTitleEdit] = useState("");
    const [refreshCounter, setRefreshCounter] = useState(0);

    const stateTitle = useSelector((state) => state.title);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const theme = useTheme();
    const { palette } = useTheme();
    const dark = theme.palette.neutral.dark;
    const alt = theme.palette.background.alt;

    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const [imgHeight, setImgHeight] = useState('auto');
    const [openDialog, setOpenDialog] = useState(false);

    const getTitle = async () => {
        try {
            const response = await fetch("http://localhost:3001/title/get", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const newTitle = await response.json();
            dispatch(setTitleState({ newTitle }));
        } catch (err) {
            console.error(`err >> ${err}`);
        }
    };

    const handleTitleEdit = async () => {
        try {
            const formData = new FormData();
            if (titleEdit) {
                formData.append("title", titleEdit);
            }
            if (imageEdit) {
                formData.append("picture", imageEdit);
                formData.append("picturePath", imageEdit.name);
            }

            const response = await fetch(`http://localhost:3001/title/update`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const newTitle = await response.json();
            dispatch(setTitleState({ newTitle }));
            setImageEdit(null);
            setTitleEdit("");
            handleDialogClose();
            setRefreshCounter(refreshCounter + 1);
        } catch (err) {
            console.error(`err >> ${err}`);
        }
    };

    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    useEffect(() => {
        const handleResize = () => {
            const heightVal = window.innerHeight * (isNonMobileScreens ? 0.4 : 0.3)
            setImgHeight(heightVal + 'px');
        };

        handleResize(); // Set initial height
        window.addEventListener('resize', handleResize); // Update height on resize

        return () => {
            window.removeEventListener('resize', handleResize); // Clean up event listener
        };
    }, [isNonMobileScreens]);

    useEffect(() => {
        getTitle();
    }, [refreshCounter]); //eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box
            display="flex"
            justifyContent="center"
            backgroundColor={alt}

        >
            <FlexBetween
                overflow="hidden"
                sx={{ maxHeight: `${imgHeight}` }}
                position="relative"
            >
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    src={`http://localhost:3001/assets/${imagePath ?? stateTitle.picturePath}`}
                />
                <Typography
                    position="absolute"
                    height="100%"
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    flex-direction="column"
                    alignItems="center"
                    color="#fff" /* text color */
                    fontSize={isNonMobileScreens ? "50px" : "24px"}
                    style={{
                        textShadow: "2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000"
                    }}
                >
                    {title ? stateTitle.title : ""}
                </Typography>
                {user && (
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: theme.spacing(1),
                            right: theme.spacing(1),
                        }}
                        color={dark}
                        onClick={handleDialogOpen}
                    >
                        <EditIcon />
                    </IconButton>
                )}

            </FlexBetween>

            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Edit Header and Image</DialogTitle>
                <DialogContent>
                    <FlexBetween gap="1.5rem">
                        <InputBase
                            placeholder="Header goes here..."
                            onChange={(e) => setTitleEdit(e.target.value)}
                            value={titleEdit}
                            sx={{
                                width: "100%",
                                backgroundColor: palette.neutral.light,
                                borderRadius: "2rem",
                                padding: "1rem 2rem"
                            }}
                        />
                    </FlexBetween>
                    {uploadImage && (
                        <Box
                            border={`1px solid ${medium}`}
                            borderRadius="5px"
                            mt="1rem"
                            p="1rem"
                        >
                            <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) =>
                                    setImageEdit(acceptedFiles[0])
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <FlexBetween>
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            width="100%"
                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!imageEdit ? (
                                                <p>Add Image Here</p>
                                            ) : (
                                                <FlexBetween>
                                                    <Typography>{imageEdit.name}</Typography>
                                                    <EditOutlined />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                        {imageEdit && (
                                            <IconButton
                                                onClick={() => setImageEdit(null)}
                                                sx={{ width: "15%" }}
                                            >

                                            </IconButton>
                                        )}
                                    </FlexBetween>
                                )}

                            </Dropzone>

                        </Box>
                    )}

                    <Divider sx={{ margin: "1.25rem 0" }} />
                    <FlexBetween>
                        <FlexBetween gap="0.25rem" onClick={() => setUploadImage(!uploadImage)}>
                            <ImageOutlined sx={{ color: mediumMain }} />
                            <Typography
                                color={mediumMain}
                                sx={{ "&:hover": { cursor: "pointer", color: medium } }}
                            >
                                Image
                            </Typography>
                        </FlexBetween>

                        {/* {isNonMobileScreens ? (
                            <>
                                <FlexBetween gap="0.25rem">
                                    <GifBoxOutlined sx={{ color: mediumMain }} />
                                    <Typography color={mediumMain}>Clip</Typography>
                                </FlexBetween>

                                <FlexBetween gap="0.25rem">
                                    <AttachFileOutlined sx={{ color: mediumMain }} />
                                    <Typography color={mediumMain}>Attachment</Typography>
                                </FlexBetween>

                                <FlexBetween gap="0.25rem">
                                    <MicOutlined sx={{ color: mediumMain }} />
                                    <Typography color={mediumMain}>Audio</Typography>
                                </FlexBetween>

                            </>
                        ) : (<FlexBetween gap="0.25rem">
                            <MoreHorizOutlined sx={{ color: mediumMain }} />
                        </FlexBetween>)} */}

                    </FlexBetween>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        disabled={!(titleEdit || imageEdit)}
                        onClick={handleTitleEdit}
                        color="primary"
                    >
                        Save
                    </Button>
                    <Button
                        disabled={!(titleEdit || imageEdit)}
                        onClick={handleTitleEdit}
                        sx={{
                            color: palette.background.alt,
                            backgroundColor: palette.primary.main,
                            borderRadius: "3rem"
                        }}
                    >
                        SAVE
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default TitleImageWidget;
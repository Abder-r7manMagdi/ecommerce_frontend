import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, InputBase, Badge, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { ImageSearch as ImageSearchIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {
  setImageSearchQuery,
  setImageFile,
  setSelectedImage,
  removeImage,
} from '../../redux/imageSearchSlice';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const ImageSearchDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // @ts-ignore
  const { imageSearchQuery, imageFile, selectedImage } = useSelector((state) => state.imageSearch);

  const handleImageSearchInputChange = (event) => {
    dispatch(setImageSearchQuery(event.target.value));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setSelectedImage(reader.result));
      };
      reader.readAsDataURL(file);
      dispatch(setImageFile(file));
    }
  };

  const handleRemoveImage = () => {
    dispatch(removeImage());
  };

  const handleSearchSubmit = () => {
    if (imageSearchQuery.trim() !== '' || imageFile) {
      if (imageFile) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Image = reader.result;
          navigate(`/imagesearchresults?image=${base64Image}`);
        };
        reader.readAsDataURL(imageFile);
      } else {
        navigate(`/imagesearchresults?query=${imageSearchQuery}`);
      }
      onClose();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  return (
    <Box sx={{ width: '80vw', padding: 2 }}>
      <ImageSearchIcon />
      <Typography variant="h6" gutterBottom>
        Image Search
      </Typography>
      <StyledInputBase
        placeholder="Enter search query…"
        inputProps={{ 'aria-label': 'image search' }}
        value={imageSearchQuery}
        onChange={handleImageSearchInputChange}
        onKeyDown={handleKeyDown}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="image-input"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="image-input">
        <Button variant="outlined" component="span" fullWidth>
          Upload Image
        </Button>
      </label>
      <Button onClick={handleSearchSubmit} sx={{ marginTop: 2 }} variant="contained" color="primary" fullWidth>
        Search
      </Button>
      {selectedImage && (
        <Box mt={2} position="relative" display="inline-block">
          <Badge
            badgeContent={
              <IconButton onClick={handleRemoveImage} sx={{ bgcolor: 'rgba(255, 255, 255, 0.7)' }}>
                <DeleteIcon />
              </IconButton>
            }
            overlap="circular"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <img
              src={selectedImage}
              alt="Selected"
              style={{ width: '100%', maxWidth: '150px', maxHeight: '200px' }}
            />
          </Badge>
        </Box>
      )}
    </Box>
  );
};

export default ImageSearchDrawer;

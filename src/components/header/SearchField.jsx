import { styled } from "@mui/material/styles";
import {
  InputBase,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
  useTheme,
} from "@mui/material";
import { Search as SearchIcon, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { setQuery, setCategory, searchItems } from "../../redux/searchSlice";

const Search = styled("div")(({ theme }) => ({
  flexGrow: 0.4,
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #777",
  "&:hover": {
    border: "1px solid #333",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "266px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "330px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#777",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const options = [
  'All Categories',
  "Men",
  "Women",
  "Kids"
];

const SearchField = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate instead of useHistory
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    dispatch(setQuery(event.target.value)); // Set query in Redux state
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim() !== "") {
      dispatch(searchItems()); // Perform search
      // Navigate to search results page
      navigate(`/src/scenes/SearchResults.jsx ?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    dispatch(setCategory(options[index])); // Set category in Redux state
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Search
      sx={{
        display: "flex",
        borderRadius: "22px",
        justifyContent: "space-between",
      }}
    >
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={searchQuery}
        onChange={handleSearchInputChange}
        onKeyDown={handleKeyDown}
      />

      <div>
        <List
          component="nav"
          aria-label="Device settings"
          sx={{
            // @ts-ignore
            bgcolor: theme.palette.myColor.main,
            borderBottomRightRadius: 22,
            borderTopRightRadius: 22,
            p: "0",
          }}
        >
          <ListItem
            id="lock-button"
            aria-haspopup="listbox"
            aria-controls="lock-menu"
            aria-label="when device is locked"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClickListItem}
          >
            <ListItemText
              sx={{
                width: 93,
                textAlign: "center",
                "&:hover": { cursor: "pointer" },
              }}
              secondary={options[selectedIndex]}
            />
            <ExpandMore sx={{ fontSize: "16px" }} />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "lock-button",
            role: "listbox",
          }}
        >
          {options.map((option, index) => (
            <MenuItem
              sx={{ fontSize: "13px" }}
              key={option}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Search>
  );
};

export default SearchField;

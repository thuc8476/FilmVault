import React, { useContext, useState } from 'react';
import { addDocument, deleteDocument, updateDocument } from '../../../../services/firebaseService';
import ModalDelete from '../../../../components/Modaldetele';
import { BiSolidCategory } from "react-icons/bi";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MdLocalMovies, } from 'react-icons/md';
import Tooltip from '@mui/material/Tooltip';
import { LiaUsersSolid } from "react-icons/lia";
import { FaPlus, } from 'react-icons/fa';
import { TextField, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, InputAdornment, TablePagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ModalChoose from '../../../../components/ModalChoose';
import { ContextCategories } from '../../../../context/CategoriesProvider';
import { ContextCharacters } from '../../../../context/CharactersProvider';
import { ContextActors } from '../../../../context/ActorsProvider';
import { ContextMovies } from '../../../../context/MovieProvider';
import { useNotification } from "../../../../context/NotificationProvider";
import { getObjectById } from '../../../../services/repository';
import { ContextAuthors } from '../../../../context/AuthorsProvider'
import { ContextPlans } from '../../../../context/PlansProvider';
import MovieDialog from './MovieDialog';
const inner = {
    nameMovie: "",
    description: "",
    duration: "",
    authorID: "",
    plan: "",
    rent: 0,
    imgUrl: "",
    likesCount: 0,
    viewsCount: 0,
    listCate: [],
    listActor: [],
    listCharacter: []
};
function Movie(props) {
    const [open, setOpen] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openChoose, setOpenChoose] = useState(false);
    const [dataChoose, setDataChoose] = useState([]);
    const [chooseType, setChooseType] = useState("");
    const categories = useContext(ContextCategories);
    const characters = useContext(ContextCharacters);
    const actors = useContext(ContextActors);
    const [movie, setMovie] = useState(inner);
    const movies = useContext(ContextMovies);
    const showNotification = useNotification();
    const authors = useContext(ContextAuthors);
    const plans = useContext(ContextPlans);
    const [openDelete, setOpenDelete] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const filteredCategories = movies.filter(movie =>
        (movie.nameMovie && movie.nameMovie.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setMovie({ ...movie, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async () => {
        try {
            if (movie.id) {
                await updateDocument("Movies", movie);
                showNotification('Movies has been updated successfully!', "info");
            } else {
                await addDocument("Movies", movie);
                showNotification('Movies added successfully!', "success");
            }
            setMovie(inner);
            handleClose();
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleDeleteConfirm = async () => {
        try {
            await deleteDocument('Movies', movieToDelete.id, movieToDelete.imgUrl);
            showNotification('Movie deleted successfully!', 'success');
            setOpenDelete(false);
        } catch (error) {
            showNotification('Failed to delete the movie. Please try again.', 'error');
        }
    };


    const handleInput = (event) => {
        const { name, value } = event.target
        setMovie({ ...movie, [name]: value });
    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleEditOpen = (movie) => {
        setMovie(movie);
        setOpen(true);
    };
    const handleChoose = (type) => {
        setChooseType(type);
        switch (type) {
            case "Categories":
                setDataChoose(categories);
                break;
            case "Actors":
                setDataChoose(actors);
                break;
            case "Characters":
                setDataChoose(characters);
                break;
            default:
                setDataChoose([]);
        }
        setOpenChoose(true);
    };

    const handleSelect = (item, type) => {
        setMovie(prevData => {
            let updatedList;

            switch (type) {
                case "Categories":
                    updatedList = toggleSelection(prevData.listCate, item);
                    return { ...prevData, listCate: updatedList };
                case "Actors":
                    updatedList = toggleSelection(prevData.listActor, item);
                    return { ...prevData, listActor: updatedList };
                case "Characters":
                    updatedList = toggleSelection(prevData.listCharacter, item);
                    return { ...prevData, listCharacter: updatedList };
                default:
                    return prevData;
            }
        });
    };

    const toggleSelection = (list, item) => {
        return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    };

    const getSelectedItems = () => {
        console.log(chooseType);
        switch (chooseType) {
            case "Categories":
                return movie.listCate;
            case "Actors":
                return movie.listActor;
            case "Characters":
                return movie.listCharacter;
            default:
                return [];
        }
    };
    const currentRows = filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return (
        <div>
            <div className='flex flex-col md:flex-row justify-between items-center mb-4'>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        mb: { xs: 4, md: 0 },
                        mr: { md: 4 },
                    }}
                >
                    Movie
                </Typography>
                <div className='flex items-center mb-4 md:mb-0'>
                    <TextField
                        variant="outlined"
                        placeholder="Enter keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon style={{ color: '#999' }} />
                                </InputAdornment>
                            ),
                            style: { height: '40px' }
                        }}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '4px 0 0 4px',
                            width: '100%',
                            maxWidth: '250px',
                            height: '40px'
                        }}
                    />
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#4186E0',
                            color: '#fff',
                            minWidth: '50px',
                            borderRadius: '0 4px 4px 0',
                            height: '40px',
                        }}
                    >
                        <SearchIcon />
                    </Button>
                </div>
                <div>
                    <Button variant="contained" color="primary" startIcon={<FaPlus />} endIcon={<MdLocalMovies />} onClick={handleOpen}></Button>
                    <MovieDialog
                        open={open}
                        handleClose={handleClose}
                        handleChoose={handleChoose}
                        handleInput={handleInput}
                        dataChoose={dataChoose}
                        chooseType={chooseType}
                        movie={movie}
                        handleSelect={handleSelect}
                        setChooseType={setChooseType}
                        handleImageChange={handleImageChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Plan</TableCell>
                            <TableCell>Categories</TableCell>
                            <TableCell>Entitils</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell><img src={row.imgUrl} alt={row.nameMovie} style={{ width: 50, height: 50 }} /></TableCell>
                                <TableCell>{row.nameMovie}</TableCell>
                                <TableCell>
                                    {row.description.split(" ").length > 10
                                        ? row.description.split(" ").slice(0, 10).join(" ") + "..."
                                        : row.description}
                                </TableCell>
                                <TableCell>{row.duration}</TableCell>
                                <TableCell>{getObjectById(row.authorID, authors)?.nameAuthor}</TableCell>
                                <TableCell>{getObjectById(row.plan, plans)?.title}</TableCell>
                                <TableCell>
                                    <Tooltip title={
                                        row.listCate.length > 0
                                            ? row.listCate
                                                .map(row => getObjectById(row, categories)?.nameCategory || "Unknown")
                                                .join(",")
                                            : "No categories"
                                    }>
                                        <IconButton color="primary" >
                                            <BiSolidCategory />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title={
                                        <div className="grid grid-cols-4 gap-2">
                                            {row.listActor.map(row => (
                                                <>
                                                    <img className='w-10 h-10 rounded-full' src={getObjectById(row, actors)?.imgUrl} alt="" />
                                                </>
                                            )
                                            )}
                                        </div>
                                    }>
                                        <IconButton color="primary" >
                                            <LiaUsersSolid />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditOpen(row)} color="primary"><EditIcon /></IconButton>
                                    <IconButton onClick={() => { setMovieToDelete(row); setOpenDelete(true); }} color="secondary"><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={movies.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <ModalChoose selectedItems={getSelectedItems()} onSelect={handleSelect} chooseType={chooseType} openChoose={openChoose} dataChoose={dataChoose} setOpenChoose={setOpenChoose} />
            <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} onDeleteConfirm={handleDeleteConfirm} movieToDelete={movieToDelete?.nameMovie} />
        </div >
    );
}

export default Movie;
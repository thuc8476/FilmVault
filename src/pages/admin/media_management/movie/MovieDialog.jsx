
import React, { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MdCategory from '@mui/icons-material/Category';
import { FaUserAlt, FaImage } from 'react-icons/fa';
import Avatar from '@mui/material/Avatar';
import { Dialog, DialogTitle, Autocomplete, DialogContent, DialogActions, Grid, Paper, TextField, FormControl, InputLabel, Select, MenuItem, Button, Stack } from '@mui/material';
import { ContextAuthors } from '../../../../context/AuthorsProvider';
import { ContextPlans } from '../../../../context/PlansProvider';
import { ContextCategories } from '../../../../context/CategoriesProvider';
import { ContextActors } from '../../../../context/ActorsProvider';
import { ContextCharacters } from '../../../../context/CharactersProvider';
import { getObjectById } from '../../../../services/repository';
function MovieDialog({ open, handleClose, handleChoose, movie, handleSelect, handleInput, handleImageChange, handleSubmit }) {
  const authors = useContext(ContextAuthors);
  const plans = useContext(ContextPlans);
  const categories = useContext(ContextCategories);
  const characters = useContext(ContextCharacters);
  const actors = useContext(ContextActors);
  const handleDelete = (item, type) => {
    handleSelect(item, type);
  }
  return (
    < Dialog open={open} onClose={handleClose} sx={{ '& .MuiDialog-paper': { width: '80%', maxWidth: 'none' } }}>
      <DialogTitle>{movie.id ? 'Edit Moive' : 'Add Movie'}</DialogTitle>
      <DialogContent >
        <Grid container spacing={2} className='px-3' alignItems="stretch">
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 1 }}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name='nameMovie'
                value={movie.nameMovie}
                onChange={handleInput}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                margin="normal"
                name='description'
                value={movie.description}
                onChange={handleInput}
              />
              <TextField
                label="Duration (in minutes)"
                variant="outlined"
                fullWidth
                margin="normal"
                name='duration'
                value={movie.duration}
                onChange={handleInput}
              />
              <Autocomplete
                options={authors} // Danh sách các tác giả
                getOptionLabel={(option) => option.nameAuthor} // Hiển thị tên của tác giả
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tìm kiếm hoặc chọn tác giả"
                  />
                )}
                value={
                  authors.find((author) => author.id === movie.authorID) || null // Hiển thị giá trị đã chọn
                }
                onChange={(event, newValue) => {
                  // Cập nhật giá trị khi người dùng chọn
                  handleInput({
                    target: { name: "authorID", value: newValue ? newValue.id : "" },
                  });
                }}
                isOptionEqualToValue={(option, value) => option.id === value.id} // So sánh giá trị
                noOptionsText="Không tìm thấy kết quả" // Thông báo khi không có kết quả
                fullWidth
              />
              <FormControl sx={{ mt: 2 }} fullWidth>
                <InputLabel id="plan-id-select">Plan ID</InputLabel>
                <Select
                  labelId="plan-id-select"
                  label="Chọn giá trị"
                  name='plan'
                  onChange={handleInput}
                >
                  {plans.sort((a, b) => a.level - b.level).map((plan) => (
                    <MenuItem value={plan.id}>{plan.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              {
                getObjectById(movie?.plan, plans)?.level > 2 && <TextField
                  label="Rent"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name='rent'
                  value={movie.rent}
                  onChange={handleInput}
                />
              }

            </Paper>
          </Grid>
          <Grid item xs={12} md={6} className='flex'  >
            <Paper sx={{ p: 2 }} className='flex-1'>
              <Stack direction="column" spacing={0}>
                <Typography onClick={() => handleChoose("Categories")} className="flex items-center cursor-pointer">
                  Categories
                  <MdCategory className="ml-2" />
                </Typography>
                <div className="flex flex-wrap gap-2 mt-2">
                  {movie?.listCate.map((element) => (
                    <div key={element} className="relative inline-block group">
                      <button
                        className="text-sm font-semibold border-2 border-primary rounded-lg py-2 px-4 hover:bg-gray-100 hover:border-blue-500 hover:shadow-md transition duration-300"
                      >
                        {getObjectById(element, categories)?.nameCategory}
                      </button>
                      <div
                        className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-white rounded-full text-red-500 shadow-md cursor-pointer opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300"
                        onClick={() => handleDelete(element, "Categories")}
                      >
                        <FaTimes size={14} />
                      </div>
                    </div>
                  ))}
                </div>
                <Typography onClick={() => handleChoose("Actors")} className="flex items-center">
                  Actor
                  <FaUserAlt className="ml-2" />
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  mt={1}
                  className="flex flex-wrap gap-2 justify-start"
                >
                  <div className="grid grid-cols-7 gap-2">
                    {movie.listActor.map((element) => (
                      <div
                        key={element}
                        className="group relative flex flex-col items-center cursor-pointer mb-2"
                      >
                        <img
                          src={getObjectById(element, actors)?.imgUrl}
                          alt="actor"
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div
                          className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1 shadow hidden group-hover:flex items-center justify-center cursor-pointer"
                          onClick={() => handleDelete(element, "Actors")}
                        >
                          <FaTimes size={14} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Stack>
                <Typography onClick={() => handleChoose("Characters")} className="flex items-center">
                  Character
                  <FaUserAlt className="ml-2" />
                </Typography>
                <Stack
                  direction="row"
                  spacing={2}
                  mt={1}
                  className="flex flex-wrap gap-2 justify-start"
                >
                  <div className="grid grid-cols-6 gap-2">
                    {movie.listCharacter.map((element) => (
                      <div
                        key={element}
                        className="group relative flex flex-col items-center cursor-pointer mb-2"
                      >
                        <img
                          src={getObjectById(element, characters)?.imgUrl}
                          alt="actor"
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div
                          className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full p-1 shadow hidden group-hover:flex items-center justify-center cursor-pointer"
                          onClick={() => handleDelete(element, "Characters")}
                        >
                          <FaTimes size={14} />
                        </div>
                      </div>
                    ))}
                  </div>
                </Stack>
                <Box className="mt-3" display="flex" alignItems="center">
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="file-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="file-upload">
                    <Button variant="contained" component="span">
                      <FaImage />
                    </Button>
                  </label>
                </Box>
                <div>
                  <Avatar
                    src={movie.imgUrl}
                    alt="Actor Image"
                    sx={{ width: 120, height: 200, margin: '10px auto', borderRadius: 2 }}
                  />
                </div>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary"></Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {movie.id ? 'Edit movie' : 'Add movie'}
        </Button>

      </DialogActions>
    </Dialog>
  );
}

export default MovieDialog;

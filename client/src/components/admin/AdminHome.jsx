import React, { useState, useEffect } from 'react';
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import {
  Box,
  Typography,
  TextField,
  Autocomplete,
  Chip,
  Fab,
  Grid,
  Paper,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
import Main from './Main';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminHeader from '../Header/AdminHeader';

const RoundedTopicList = ({ tags, selectedTopics, onTopicClick }) => {
  const [searchedTag, setSearchedTag] = useState('');

  const handleTopicClick = (topic) => {
    onTopicClick(topic);
    setSearchedTag(topic); // Set the searched tag to the clicked tag
  };

  // Filter the tags based on the searched tag name
  const filteredTags = searchedTag ? tags.filter((tag) => tag.tagName.toLowerCase().includes(searchedTag.toLowerCase())) : tags;

  return (
    <Box display="flex" alignItems="center" flexWrap="wrap">
      {filteredTags.map((tag) => (
        <Chip
          key={tag._id}
          label={tag.tagName}
          variant="outlined"
          style={{ margin: '5px', borderRadius: '15px', cursor: 'pointer' }}
          onClick={() => handleTopicClick(tag.tagName)} // Call the handleTopicClick function with the clicked tag name
          color={selectedTopics.includes(tag.tagName) ? 'primary' : 'default'}
        />
      ))}
    </Box>
  );
};

const TagSection = ({ tag, onUpdateTag, onDeleteTag }) => {
  const [modules, setModules] = useState(tag.modules);
  const [openDialog, setOpenDialog] = useState(false);
  const [tagName, setTagName] = useState(tag.tagName);
  const [description, setDescription] = useState(tag.description);

  const handleModuleChange = (index, value) => {
    const updatedModules = [...modules];
    updatedModules[index].moduleName = value;
    setModules(updatedModules);
  };

  const handleAddModule = () => {
    setModules([...modules, { moduleName: '' }]);
  };

  const handleDeleteTag = async () => {
    try {
      const response = await fetch(`http://localhost:4010/tags/${tag._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Tag deleted successfully!');
        onDeleteTag(tag._id);
        toast.success('Tag deleted successfully!');
      } else {
        console.error('Error deleting tag');
        toast.error('Error deleting tag');
      }
    } catch (error) {
      console.error('Error deleting tag', error);
      toast.error('Error deleting tag');
    }
  };

  const handleUpdateTag = async () => {
    const updatedTag = { ...tag, tagName, description, modules };
    try {
      const response = await fetch(`http://localhost:4010/tags/${tag._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTag),
      });

      if (response.ok) {
        console.log('Tag updated successfully!');
        onUpdateTag(updatedTag);
        setOpenDialog(false);
        toast.success('Tag updated successfully!');
      } else {
        console.error('Error updating tag');
        toast.error('Error updating tag');
      }
    } catch (error) {
      console.error('Error updating tag', error);
      toast.error('Error updating tag');
    }
  };

  const handleDeleteModule = (index) => {
    const updatedModules = [...modules];
    updatedModules.splice(index, 1);
    setModules(updatedModules);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {tag.tagName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {tag.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Date Created: {new Date(tag.dateCreated).toLocaleDateString()}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Modules:
      </Typography>
      <Grid container spacing={2} style={{ paddingLeft: '100px' }}>
        {modules.map((module, index) => (
          <Grid item key={index}>
            <Card style={{ width: '200px', margin: '10px', padding: '20px' }}>
              <CardContent>
                <TextField
                  label={`Module ${index + 1}`}
                  fullWidth
                  style={{ padding: '12px' }}
                  value={module.moduleName}
                  onChange={(e) => handleModuleChange(index, e.target.value)}
                />
                <Button onClick={() => handleDeleteModule(index)}>Delete Module</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid style={{ padding: '10px' }}>
        <IconButton onClick={handleAddModule} color="primary" aria-label="Add Module">
          <AddIcon />
        </IconButton>
        <Button onClick={() => setOpenDialog(true)} color="primary" aria-label="Edit Tag">
          Save chnages
        </Button>
        <IconButton onClick={handleDeleteTag} color="secondary" aria-label="Delete Tag">
          <DeleteIcon />
        </IconButton>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Tag</DialogTitle>
        <DialogContent>
          <TextField label="Tag Name" fullWidth style={{ padding: '12px' }} value={tagName} onChange={(e) => setTagName(e.target.value)} />
          <TextField label="Description" multiline rows={4} fullWidth style={{ padding: '12px' }} value={description} onChange={(e) => setDescription(e.target.value)} />
          {modules.map((module, index) => (
            <TextField key={index} label={`Module ${index + 1}`} fullWidth style={{ padding: '12px' }} value={module.moduleName} onChange={(e) => handleModuleChange(index, e.target.value)} />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button color="primary" variant="contained" onClick={handleUpdateTag}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const CardComponent = ({ tags, onUpdateTag, onDeleteTag, searchedTag }) => {
  // Filter the tags based on the searched tag name
  const filteredTags = searchedTag ? tags.filter((tag) => tag.tagName.toLowerCase().includes(searchedTag.toLowerCase())) : tags;

  return (
    <Grid container spacing={2} style={{ paddingLeft: '350px', paddingTop: '80px' }}>
      {filteredTags.map((tag) => (
        <Grid item key={tag._id}>
          <Card>
            <CardContent>
              {/* Pass the tag._id to onDeleteTag function */}
              <TagSection tag={tag} onUpdateTag={onUpdateTag} onDeleteTag={() => onDeleteTag(tag._id)} />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const TeachingPage = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [tagName, setTagName] = useState('');
  const [description, setDescription] = useState('');
  const [modules, setModules] = useState([]);
  const [tags, setTags] = useState([]);
  const [searchedTag, setSearchedTag] = useState('');

  const handleTopicClick = (topic) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics((prevSelected) => prevSelected.filter((item) => item !== topic));
    } else {
      setSelectedTopics((prevSelected) => [...prevSelected, topic]);
    }
  };

  const handleAddTagClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddModule = () => {
    setModules([...modules, { moduleName: '' }]);
  };

  const handleModuleChange = (index, value) => {
    const updatedModules = [...modules];
    updatedModules[index].moduleName = value;
    setModules(updatedModules);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const currentDate = new Date().toISOString();

      const response = await fetch('http://localhost:4010/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tagName,
          description,
          dateCreated: currentDate,
          modules,
        }),
      });

      if (response.ok) {
        console.log('Tag saved successfully!');
        setOpenDialog(false);
        setTagName('');
        setDescription('');
        setModules([]);
        // Show successful message in a toast notification
        toast.success('Tag saved successfully!');

        // Fetch the updated tags from the server and update the state
        const updatedTagsResponse = await fetch('http://localhost:4010/tags');
        if (updatedTagsResponse.ok) {
          const tagsData = await updatedTagsResponse.json();
          setTags(tagsData);
        }
      } else {
        console.error('Error saving tag');
        toast.error('Error saving tag');
      }
    } catch (error) {
      console.error('Error saving tag', error);
      toast.error('Error saving tag');
    }
  };

  const handleDeleteTag = async (deletedTagId) => {
    try {
      const response = await fetch(`http://localhost:4010/tags/${deletedTagId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Tag deleted successfully!');
        // Remove the deleted tag from the state
        setTags((prevTags) => prevTags.filter((tag) => tag._id !== deletedTagId));
        toast.success('Tag deleted successfully!');
      } else {
        console.error('Error deleting tag');
        toast.error('Error deleting tag');
      }
    } catch (error) {
      console.error('Error deleting tag', error);
      toast.error('Error deleting tag');
    }
  };

  const handleUpdateTag = async (updatedTag) => {
    try {
      const response = await fetch(`http://localhost:4010/tags/${updatedTag._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTag),
      });

      if (response.ok) {
        console.log('Tag updated successfully!');
        // Update the state with the updated tag
        setTags((prevTags) => prevTags.map((tag) => (tag._id === updatedTag._id ? updatedTag : tag)));
        toast.success('Tag updated successfully!');
      } else {
        console.error('Error updating tag');
        toast.error('Error updating tag');
      }
    } catch (error) {
      console.error('Error updating tag', error);
      toast.error('Error updating tag');
    }
  };

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:4010/tags');
        if (response.ok) {
          const tagsData = await response.json();
          setTags(tagsData);
        } else {
          console.error('Error fetching tags data');
        }
      } catch (error) {
        console.error('Error fetching tags data', error);
      }
    };

    fetchTags();
  }, []);

  return (
    <>
      <div>
        <AdminHeader />
        <Main />
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          What will you teach today?
        </Typography>
        <Autocomplete
          options={tags.map((tag) => tag.tagName)}
          freeSolo
          sx={{ width: '400px', marginBottom: '20px' }}
          value={searchedTag}
          onInputChange={(event, newInputValue) => setSearchedTag(newInputValue)}
          renderInput={(params) => <TextField {...params} label="Search for quizzes on any tag" variant="outlined" />}
        />
        <RoundedTopicList tags={tags} selectedTopics={selectedTopics} onTopicClick={handleTopicClick} />
        <Fab color="primary" aria-label="add" style={{ marginTop: '10px' }} onClick={handleAddTagClick}>
          <AddIcon />
        </Fab>
        <CardComponent tags={tags} onUpdateTag={handleUpdateTag} onDeleteTag={handleDeleteTag} searchedTag={searchedTag} />
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Create a New Tag</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField label="Tag Name" fullWidth style={{ padding: '12px' }} value={tagName} onChange={(e) => setTagName(e.target.value)} />
              <TextField
                label="Description"
                multiline
                rows={4}
                fullWidth
                style={{ padding: '12px' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {modules.map((module, index) => (
                <TextField
                  key={index}
                  label={`Module ${index + 1}`}
                  fullWidth
                  style={{ padding: '12px' }}
                  value={module.moduleName}
                  onChange={(e) => handleModuleChange(index, e.target.value)}
                />
              ))}
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit" color="primary" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar pauseOnHover />
      </div>
    </>
  );
};

export default TeachingPage;

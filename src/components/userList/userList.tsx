import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { User,  Album, Photo } from '../../types/types'
import { BASE_URL } from '../../api/service'
import { TextField, Pagination} from '@mui/material';
import Stack from '@mui/material/Stack';
import axios from 'axios';


export const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selected, setSelected] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [photos, setPhotos] = useState<Photo[]>([]); 
    const [page, setPage] = useState<number>(1);
    const [filter, setFilter] = useState<string>('');
    const [paginatedUsers, setPaginatedUsers]= useState<User[]>([]);
    const [filteredUsers, setFilteredUsers]= useState<User[]>([]);
    // Initialied itemsPerPage hardcoded as 10 as given in the task
    // eslint-disable-next-line
    const [itemsPerPage, setItemsPerPage] = useState<number>(10); 
    const [newAlbumTitle, setNewAlbumTitle] = useState('');

    // Fetch users during the onload of page
    useEffect( () => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
      try {
          const response = await fetch(`${BASE_URL}/users`);
          if(!response.ok) {
              throw new Error("Failed to fetch data");
          } 
          const data: User[] = await response.json();
          setUsers(data);
          }                
          catch (error: any) {
              console.log('Error', error.message)
          }
  };

  // function to fetch albums from url
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${BASE_URL}/albums`)
        if(!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        const data: Album[] = await response.json();
        setAlbums(data);
      } catch (error: any) {
        console.log('Error fetching albums:', error.message);
      }
    }

    // function to fetch photos from url
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`${BASE_URL}/photos`);
        if(!response.ok) {
          throw new Error('Failed to fetch albums');
        }
        const data: Photo[] = await response.json();
        setPhotos(data);
      } catch (error: any) {
        console.log('Error fetching albums:', error.message);
      }
    }

    // Function to handle user selection on clicking the user name
    const handleUserSelection = (user: User) => {
      if(selectedUser?.id !== user.id) {
        setSelected(true);
        setSelectedUser(user);
      } else{
        setSelected(!selected);
      }
      
    }

    // When a user is selected, it automatically fetchs the album and photos of that particular user
    useEffect(() => {
      fetchAlbums();
      fetchPhotos();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selected === true])

   
    // Function to set filter when Text input is given to filter
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {value} = event.target;
      setFilter(value);
    }
    //  Effect to filter users upon filter value
    useEffect(() => {
      setFilteredUsers((users).filter(user => user.name.toLowerCase().includes(filter.toLowerCase())))
      
    },[filter, users])
    
    // Effect to set  pagination for the filtered users
    useEffect(() => {
      if (filteredUsers.length > itemsPerPage) {
        setPaginatedUsers(filteredUsers.slice(
          (page - 1) * itemsPerPage,
          ((page - 1) * itemsPerPage) + itemsPerPage)
          )
      } else {
        setPaginatedUsers(filteredUsers)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page, filteredUsers])

    // Function to handle Page change from Pagination component
    const handlePageChange = (event: React.ChangeEvent<unknown>, value:number) => {
      setPage(value);
    }
    // function to craete ne album for a users
    const handleCreateAlbum = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/albums`, {
          userId: selectedUser?.id,
          title: newAlbumTitle
        });
        setAlbums([...albums, response.data]);
        setNewAlbumTitle('');
      } catch (error: any) {
        console.log('Error creating albums:', error.message);
      }
    };

    return (
      <>
          <div className="container">
          <TextField
          label="Filter by name"
          variant='outlined'
          fullWidth
          value={filter}
          onChange={handleFilterChange}
          style={{marginTop: 20, marginBottom:20,  marginLeft:20, marginRight: 20}}
          />
          {paginatedUsers.map((user) => (
             <Box
             ml={4}
             my={4}
             display="flex"
             alignItems="left"
             gap={4}
             p={2}
             sx={{ border: '2px solid grey', borderRadius: 2 }}
             key={user.id}
             id={"user-list-block"}
           >
              <li id={"user-list-item"} key={user.id} data-testid="user-list"  >
              <div className="user">
                <Tooltip title="Select user for more details">
                <Box id={"user-list-name"} onClick={() => handleUserSelection(user)}  sx={{  display: 'flex', flexDirection: 'row', bgcolor: (selected && selectedUser && user.id === selectedUser.id  ? "#00ff5e" : "#007FFF") }}><header><h2>{user.name}</h2></header></Box></Tooltip>
                <div id={"user-list-address"} className="address"><h4>Address :
                  {user.address.suite}<br/>
                  {user.address.street}<br/>s
                  {user.address.city}<br/>
                  {user.address.zipcode}<br/>
                </h4></div>
                {selectedUser && selected && user.id === selectedUser.id && (
                  <div id={"album-list"}> 
                    <h2>{selectedUser.name}'s Albums</h2>
                    <ul>
                      {
                        albums.filter(item => item.id === selectedUser.id).map(album => (
                          <li key={album.id} >{album.title}</li>
                        ))
                      }
                    </ul>
                    <h2>Create New Album</h2>
                    <input
                      type='text'
                      value={newAlbumTitle}
                      onChange={(e) => setNewAlbumTitle(e.target.value)}
                      placeholder='Enter title for album' 
                      />
                      <button
                      onClick={handleCreateAlbum}
                      > Create</button>
                  </div>
                )}
                { selectedUser && selected && user.id === selectedUser.id && photos.length > 0 && (
                    <div id={"photo-list"}>
                      <h2>Photos</h2>
                      <ul>
                        {photos.filter(item => item.id === selectedUser.id).map(photo => (
                          <li key={photo.id}>
                            <h4>{photo.title}</h4>
                            <img src={photo.url} alt={photo.title} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                }
              </div>
             
              </li> 
            </Box>
            )
          )}        
        </div>
        <Box
             ml={4}
             my={4}
             display="flex"
             alignItems="right"
             gap={4}
             p={2}
             id={"pagination"}
           >
            <Stack spacing={5} alignItems="center" width="100%" >
          <Pagination
          count={Math.ceil(filteredUsers.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          style={{marginTop: 20, display:"flex"}}
          // shape="rounded"
          // color='primary'
          /></Stack></Box> 
        </>
        
      );
}
import { useState, useEffect } from 'react';
import './App.css';
import { Button, Container, Paper, Grid, AppBar, Toolbar, Typography, IconButton, Menu, MenuItem} from '@mui/material';
import AddBook from "./AddBook"
import BookRow from './BookRow';
import RetrieveBook from './RetrieveBook';
import { call, signout } from './ApiService'
import DeleteBook from './DeleteBook';
import UpdateBook from './UpdateBook';

import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  
  useEffect(()=> {
    call("/book", "GET", null).then((response) => {
      setItems(response.data);
      setLoading(false);
    });
  }, []);

  // 추가
  const addItem = (item) => {
    call("/book", "POST", item)
    .then((response) => setItems(response.data));
  };

  // 수정
  const editItem = (item) => {
    call("/book", "PUT", item)
    .then((response) => setItems(response.data));
  };

  // 삭제
  const deleteItem = (item) => {
    call("/book", "DELETE", item)
    .then((response) => setItems(response.data));
  }

  // // 메뉴
  // const handleMenuClick = (menu) => {
  //   setActiveMenu(menu);
  // }

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const addBookUI = <AddBook addItem={addItem} />;
  const retrieveBookUI = <RetrieveBook items={items} />;
  const updateBookUI = <UpdateBook items={items} editItem={editItem} />;
  const deleteBookUI = <DeleteBook items={items} deleteItem={deleteItem} />;

  let content;
  if (loading) {
    content = <h1> 로딩중.. </h1>;
  }
  else {
    switch(activeMenu) {
      case 'add':
        content = addBookUI;
        break;
      case 'retrieve':
        content = retrieveBookUI;
        break;
      case 'update':
        content = updateBookUI;
        break;
      case 'delete':
        content = deleteBookUI;
        break;
      default:
        content = <div>메뉴를 선택하세요.</div>;
    }
  }

  let bookRows =
    items.length > 0 && (
      <tbody>
        {items.map((item) => (
          <BookRow
            item={item}
            key={item.id}
            editItem={editItem}
            deleteItem={deleteItem}
          />
        ))}
      </tbody>
    );

    // navigationBar 추가
    // let navigationBar = (
    //   <AppBar position="static">
    //     <Toolbar>
    //       <Grid justifyContent="space-between" container>
    //         <Grid item>
    //           <Typography variant="h6">BOOK STORE</Typography>
    //         </Grid>
    //         <Grid item>
    //           <Button color="inherit" raised onClick={signout}>
    //             로그아웃
    //           </Button>
    //         </Grid>
    //       </Grid>
    //     </Toolbar>
    //   </AppBar>
    // );

      // navigationBar 추가
  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">도서 목록</Typography>
          </Grid>
          <Grid item>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleMenuClick('add')}>
                <AddIcon style={{ marginRight: 10 }} /> 제품 추가
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick('retrieve')}>
                <SearchIcon style={{ marginRight: 10 }} /> 제품 검색
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick('update')}>
                <EditIcon style={{ marginRight: 10 }} /> 제품 수정
              </MenuItem>
              <MenuItem onClick={() => handleMenuClick('delete')}>
                <DeleteIcon style={{ marginRight: 10 }} /> 제품 삭제
              </MenuItem>
            </Menu>
            <IconButton color="inherit" onClick={signout}>
              <ExitToAppIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

    return (
      <div className="App">
        {navigationBar}
        <Container maxWidth="md">
          <Paper elevation={3} style={{ padding: 20, margin: 10 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleMenuClick('add')}
              >
                제품 추가
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => handleMenuClick('retrieve')}
              >
                제품 검색
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => handleMenuClick('update')}
              >
                제품 수정
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={() => handleMenuClick('delete')}
              >
                제품 삭제
              </Button>
            </Grid>
          </Grid>

          <div style={{ marginTop: 20 }}>
            {content}
          </div>
  
            <table
              border="1"
              cellspacing="3"
              style={{ marginTop: 20, width: '100%' }}
            >
              <caption>Book item table</caption>
              <thead>
                <tr>
                  <th>id</th>
                  <th>userId</th>
                  <th>title</th>
                  <th>author</th>
                  <th>publisher</th>
                </tr>
              </thead>
              {bookRows}
            </table>
          </Paper>
        </Container>
      </div>
    );


    // let todoListPage = (
    // <div className="App">
    //   {navigationBar}
    //   <Container maxWidth="md">
    //     <Paper elevation={3} style={{ padding: 20, margin: 10 }}>
    //       <table
    //         border="1"
    //         cellspacing="3">
    //         <caption>Book item table</caption>
    //         <thead>
    //           <tr>
    //               <th>id</th>
    //               <th>userId</th>
    //               <th>title</th>
    //               <th>author</th>
    //               <th>publisher</th>
    //           </tr>
    //         </thead>
    //         {bookRows}
    //       </table>
    //     </Paper>
    //     <AddBook addItem={addItem} />
    //     <RetrieveBook items={items} />
    //     <UpdateBook items={items} editItem={editItem} />
    //     <DeleteBook items={items} deleteItem={deleteItem} />
    //   </Container>
    // </div>
    // );

    // /* 로딩중일 때 렌더링 할 부분 */
    // let loadingPage = <h1> Loading... </h1>;
    // let content = loadingPage;

    // if (!loading) {
    //   /* 로딩중이 아니면 todoListPage를 선택*/
    //   content = todoListPage;
    // }

    // /* 선택한 content 렌더링 */
    // return <div className="App">{content}</div>;
}

export default App;

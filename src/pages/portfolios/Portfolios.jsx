import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PlanList from './PlanList';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../context/AuthContext'
import useGetApi from '../../hooks/useGetApi'
import { serializeUrl } from '../../helpers'
import AddPlan from './AddPlan'
import { Avatar, Button, TextField } from '@mui/material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const [open, setOpen] = useState(true);
  const { token, onLogout } = useAuth()
  const [limit, setLimit] = useState(5)
  const [page, setPage] = useState(1)
  const [name, setName] = useState('')
  const [open1, setOpen1] = useState(false)
  const [{ isLoading, isError, data }, setUrl] =
    useGetApi(serializeUrl(process.env.REACT_APP_PLAN_API, { limit, page }), [])

  const fetchPlan = () => {
    setUrl(serializeUrl(process.env.REACT_APP_PLAN_API, { limit, page, name }))
  }
  useEffect(() => {
    fetchPlan()
  }, [limit, page])

  useEffect(() => {
    let timer = setTimeout(() => {
      fetchPlan()
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [name])

  const handleDrawerOpen = () => {
    // setOpen(true);
  };

  const handleDrawerClose = () => {
    // setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ justifyContent: 'end' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar alt="abc" />
          <Typography mr={2} ml={2}>{token}</Typography>
          <IconButton aria-label="logout" onClick={onLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton> */}
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard', 'Portfolios'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Grid container mb={2}>
          <Grid item xs={12}>
            <Grid container justifyContent='space-between'>
              <Grid item>
                <TextField
                  placeholder='Search'
                  size='small'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setOpen1(true)}
                >Add plan</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <div>
          {isError && <h3>Something went wrong</h3>}
          <PlanList
            list={data}
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
            loading={isLoading}
          />

        </div>
        <div>
          <AddPlan open={open1} closeDialog={() => setOpen1(false)} />
        </div>
      </Main>
    </Box>
  );
}
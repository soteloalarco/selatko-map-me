/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Edit from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { Redirect, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import DeleteUser from './DeleteUser';
import auth from '../auth/auth-helper';
import { read } from './api-user';
import MapEntryForm from '../map/MapEntryForm';

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 1290,
    margin: 'auto',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    flexGrow: 1,
  }),
  title: {
    marginLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    color: theme.palette.protectedTitle,
  },
  card: {
    maxWidth: 800,
    margin: 'auto',
    backgroundColor: '#EEDA9A',
  },
  titlemap: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  profilepaper: {
    minWidth: 350,
    margin: 'auto',
    backgroundColor: '#EEDA9A',
  },
  visitpaper: {
    minWidth: 350,
    margin: 'auto',
  },
  profileitem: {
    maxWidth: 400,
    margin: 'auto',
  },
}));

export default function Profile({ match }) {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const [addEntryLocation, setAddEntryLocation] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 23.50,
    longitude: -89.87,
    zoom: 3.9,
  });
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    read({
      userId: match.params.userId,
    }, { t: jwt.token }, signal).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true);
      } else {
        setUser(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.userId]);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <Grid container justify="space-between" direction="row" spacing={1} className={classes.root}>
      <Grid item className={classes.profileitem} key={0}>
        <Grid container justify="space-between" direction="column" spacing={1}>
          <Grid item key={0}>
            <Paper className={classes.profilepaper} elevation={4}>
              <Typography variant="h6" className={classes.title}>
                Profile
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      {user.name ? user.name.charAt(0) : ':)'}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.name} secondary={user.email} />
                  { auth.isAuthenticated().user && auth.isAuthenticated().user._id === user._id
    && (
    <ListItemSecondaryAction>
      <Link to={`/user/edit/${user._id}`}>
        <IconButton aria-label="Edit" color="primary">
          <Edit />
        </IconButton>
      </Link>
      <DeleteUser userId={user._id} />
    </ListItemSecondaryAction>
    )}
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary={`Joined: ${(
                    new Date(user.createdAt)).toDateString()}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`About Me: ${user.aboutMe}`} />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item key={1}>
            <Paper className={classes.visitpaper} elevation={4}>
              <Typography variant="h6" className={classes.title}>
                Visit Info
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item key={1}>
        <Card className={classes.card}>
          <Typography className={classes.titlemap}>
            <i>&quot;Not All Those Who Wander Are Lost&quot;</i>
            {' '}
            J. R. R. Tolkien
          </Typography>

          <ReactMapGL
            {...viewport}
            width="100vw"
            height="60vh"
            mapStyle="mapbox://styles/soteloalarco/ckgfu81286ioh19pgv8isi8w0"
            ReactMapGL
            mapboxApiAccessToken="pk.eyJ1Ijoic290ZWxvYWxhcmNvIiwiYSI6ImNrZ2ZzZHp6OTByNnkydm1pZ3Q2MG4xczcifQ.VNQ50Dl7d1Aqe-Ne_W8w8Q"
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
            onDblClick={showAddMarkerPopup}
          >
            {
        addEntryLocation ? (
          <>
            <Marker
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
            >

              <div>
                <SvgIcon
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="256"
                  height="256"
                  viewBox="0 0 128 128"
                >
                  <path fill="#FFEEA6" d="M64 9A20 50 0 1 0 64 109A20 50 0 1 0 64 9Z" />
                  <path fill="#FFD110" d="M67.8 32A3 3 0 1 0 67.8 38 3 3 0 1 0 67.8 32zM57.8 65A3 3 0 1 0 57.8 71 3 3 0 1 0 57.8 65zM67.8 43A3 3 0 1 0 67.8 49 3 3 0 1 0 67.8 43z" />
                  <path fill="#FFD110" d="M67.8 47A3 3 0 1 0 67.8 53 3 3 0 1 0 67.8 47zM67.8 35A3 3 0 1 0 67.8 41 3 3 0 1 0 67.8 35z" />
                  <path fill="#FFD110" d="M67.8 39A3 3 0 1 0 67.8 45 3 3 0 1 0 67.8 39zM67.8 51A3 3 0 1 0 67.8 57 3 3 0 1 0 67.8 51z" />
                  <path fill="#FFD110" d="M67.8 55A3 3 0 1 0 67.8 61A3 3 0 1 0 67.8 55Z" />
                  <path fill="#FFD110" d="M67.8 59A3 3 0 1 0 67.8 65A3 3 0 1 0 67.8 59Z" />
                  <path fill="#FFD110" d="M67.8 63A3 3 0 1 0 67.8 69A3 3 0 1 0 67.8 63Z" />
                  <path fill="#FFD110" d="M78.7,25.2c-2.1-5.8-10.8-3.9-10.3,2.3C68.8,31.2,69,35,69,39c0,27.6-9,50-20,50c-0.3,0-0.7,0-1-0.1c3.6,12.2,9.5,20.1,16,20.1c11,0,20-22.4,20-50C84,46,82,34.1,78.7,25.2z" />
                  <path fill="#444B54" d="M84,62c-1.7,0-3-1.3-3-3c0-27.7-9-47-17-47c-6.9,0-15,14.4-16.7,38.5c-0.1,1.7-1.6,2.9-3.2,2.8c-1.7-0.1-2.9-1.6-2.8-3.2C43.1,24.1,52.5,6,64,6c13.1,0,23,22.8,23,53C87,60.7,85.7,62,84,62z" />
                  <path fill="#52DDB2" d="M94,49c-8.2,15-4.9,39.7-6.6,50.3C84.4,118.7,69.6,119,64,119s-24.5-2.3-23.4-21.9C41.8,73.8,39.8,71,34,59h0c11.6,0,21.6,8.2,23.9,19.6L61,94.2c0.5,2.7,4.5,2.6,4.9-0.1l4.1-25.5C72.4,57.2,82.4,49,94,49L94,49z" />
                  <path fill="#FFF" d="M34.1,59L34,59c5.8,12,7.8,14.8,6.6,38.1c-0.4,6.5,1.5,11,4.3,14.3c4.1-4.1,5.1-7.7,5.1-17.9c0-5.6-1.3-15.3-2.6-22.9C46.3,64,40.8,59,34.1,59z" />
                  <path fill="#2B9E7D" d="M84.6,61.3c-2.3,0.2-4.2,1.9-4.5,4.2c-1.7,12.8-1.6,26.6-2.7,33.8c-0.9,5.7-2.8,9.8-5.3,12.7c-2.1,2.5,0.5,6.2,3.5,4.9c0,0,0.1,0,0.1-0.1c5.1-2.3,10-7.3,11.6-17.5c1.1-7,0.1-20.1,1.5-32.5C89.4,63.7,87.8,61,84.6,61.3L84.6,61.3z" />
                  <path fill="#444B54" d="M57.9,81.6c-1.4,0-2.7-1-2.9-2.4C53,69.2,44.2,62,34,62c-1.7,0-3-1.3-3-3s1.3-3,3-3c13,0,24.3,9.3,26.9,22c0.3,1.6-0.7,3.2-2.4,3.5C58.3,81.6,58.1,81.6,57.9,81.6z" />
                  <path fill="#444B54" d="M53.4 118.7c-.3 0-.6 0-.9-.1-4.4-1.4-13.5-4.3-14.9-19.2-.3-3-.1-6.5.1-10.3.4-7.1.8-15.1-2-19.4-.9-1.4-.5-3.2.9-4.2 1.4-.9 3.2-.5 4.2.9 3.9 5.9 3.4 15 3 23-.2 3.5-.4 6.9-.1 9.4 1 10.9 6.9 12.8 10.8 14.1 1.6.5 2.4 2.2 1.9 3.8C55.9 117.9 54.7 118.7 53.4 118.7zM64 127c-1.7 0-3-1.3-3-3 0-4 2.7-7.5 6.6-8.4 7-1.7 16.3-5.4 16.9-17.6.1-2.9.2-5.8.3-8.6.5-14.6 1-27.6 4.5-37.2-11.7 1.1-17.5 6.4-18.2 16.6l-1.3 24.1c-.1 1.7-1.5 2.9-3.2 2.8-1.7-.1-2.9-1.5-2.8-3.2l1.3-24.1C66.3 49.9 81.5 46 94 46c1.1 0 2 .6 2.6 1.5.5.9.6 2 0 3-4.8 8.6-5.3 22.8-5.9 39.1-.1 2.8-.2 5.7-.3 8.6-.5 12.1-7.7 19.9-21.4 23.2-1.2.3-2 1.4-2 2.6C67 125.7 65.7 127 64 127z" />
                  <path fill="#FFF" d="M53.1 35.9c-.3 0-.5 0-.8-.1-1.6-.4-2.6-2.1-2.1-3.7 2-7.6 4.9-13.7 8.1-17.1 1.1-1.2 3-1.3 4.2-.1 1.2 1.1 1.3 3 .1 4.2-2.5 2.7-5 8.1-6.7 14.5C55.6 35 54.4 35.9 53.1 35.9zM50.8 48c-.2 0-.4 0-.6-.1s-.4-.1-.6-.2c-.2-.1-.4-.2-.5-.3-.2-.1-.3-.2-.5-.4-.1-.1-.3-.3-.4-.5-.1-.2-.2-.3-.3-.5-.1-.2-.1-.4-.2-.6 0-.2-.1-.4-.1-.6 0-.2 0-.4.1-.6 0-.2.1-.4.2-.6.1-.2.2-.4.3-.5.1-.2.2-.3.4-.5.1-.1.3-.3.5-.4.2-.1.3-.2.5-.3.2-.1.4-.1.6-.2.4-.1.8-.1 1.2 0 .2 0 .4.1.6.2.2.1.4.2.5.3.2.1.3.2.5.4.1.1.3.3.4.5.1.2.2.3.3.5.1.2.1.4.2.6 0 .2.1.4.1.6 0 .2 0 .4-.1.6 0 .2-.1.4-.2.6-.1.2-.2.4-.3.5-.1.2-.2.3-.4.5-.1.1-.3.3-.5.4-.2.1-.3.2-.5.3-.2.1-.4.1-.6.2S51 48 50.8 48z" />
                </SvgIcon>
              </div>
            </Marker>
            <Popup
              latitude={addEntryLocation.latitude}
              longitude={addEntryLocation.longitude}
              closeButton
              closeOnClick={false}
              dynamicPosition
              sortByDepth
              onClose={() => setAddEntryLocation(null)}
              anchor="top"
            >
              <div className="popup">
                <MapEntryForm
                  onClose={() => {
                    setAddEntryLocation(null);
                  }}
                  location={addEntryLocation}
                  createdBy={user.email}
                />
              </div>
            </Popup>
          </>
        ) : null
      }
          </ReactMapGL>
          <CardContent>
            <Typography variant="body2" component="p">
              Created by Rolando Sotelo,
              <Link href="https://soteloalarco.github.io/"> Contact Me.</Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

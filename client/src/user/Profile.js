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
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Edit from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import Person from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import { Redirect, Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import ReactMapGL from 'react-map-gl';
import DeleteUser from './DeleteUser';
import auth from '../auth/auth-helper';
import { read } from './api-user';

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
                      <Person />
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
            <i>&quot;Not All Those Who Wonder Are Lost&quot;</i>
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
          />
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

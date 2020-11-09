/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Link from '@material-ui/core/Link';
import selatkoPortada from '../assets/images/portada-s.png';

require('dotenv').config();

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 800,
    margin: 'auto',
    marginTop: theme.spacing(4),
    backgroundColor: '#EEDA9A',
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 380,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography className={classes.title}>
        <i> &quot;All the stories and songs and myths and legends start somewhere... with a seed. As they&apos;re told and re-told and passed around, they grow and change to become the stories we know&quot; </i>
        (WTWTLW).
      </Typography>
      <CardMedia className={classes.media} image={selatkoPortada} title="Selatko Map-Me" />
      <CardContent>
        <Typography variant="body2" component="p">
          Created by Rolando Sotelo,
<Link href="https://soteloalarco.github.io/"> Contact Me.</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}

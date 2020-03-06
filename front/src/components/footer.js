import Grid from "@material-ui/core/Grid";
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import Typography from "@material-ui/core/Typography";
import * as PropTypes from "prop-types";
import React from "react";

import {makeStyles} from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  footer: {
    marginTop: theme.spacing(4),
    backgroundColor: grey[900],
    padding: theme.spacing(1),
    color: grey[700]
  },
  socialMedia: {
    display: 'grid',
    gridAutoFlow: 'column',
    gridColumnGap: '4px',
    marginRight: '16px',
    verticalAlign: 'middle'
  }
}));

export default function Footer() {
  const classes = useStyles();
  const is_small_screen = useMediaQuery('(max-width: 500px)');

  function renderMobile() {
    return (
      <Grid container justify={"center"} className={classes.footer}>
          <FacebookIcon  style={{marginRight: '16px'}}/>
          <InstagramIcon />
      </Grid>
    );
  }

  function renderLargeScreen() {
    return (
      <Grid container justify={"flex-end"} alignItems={'center'} className={classes.footer}>
        <div className={classes.socialMedia}>
          <FacebookIcon  />
          <InstagramIcon  />
        </div>

        <Typography variant={"caption"}>© 2020 Hugo Espinelli. All rights reserved. </Typography>
      </Grid>
    );
  }
  return (
    <>
      { is_small_screen ? renderMobile() : renderLargeScreen() }
    </>
  );
}

Footer.propTypes = {classes: PropTypes.any};

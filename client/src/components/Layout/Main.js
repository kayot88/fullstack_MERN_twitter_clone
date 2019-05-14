import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './Header';

const Main = ({ children }) => (
  
  <div>
    <Header />
    <Grid container justify="center">
      <Grid item style={{marginTop: 30}} xs={12} sm={6}>{children}</Grid>
    </Grid>
  </div>
);

export default Main;

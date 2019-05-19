import React from 'react';
import MadeWithLove from 'react-made-with-love';
import {withStyles} from '@material-ui/core/styles';

const styles = {
  emojiStyle:{
    textAlign: "center",
    marginTop: 20
  }
}

const Footer = ({ classes }) => (
  <div className={classes.emojiStyle}>
    <MadeWithLove
      by="Gromov"
      emoji
      link="http://github.com/kayot88"
    />
  </div>
);

export default withStyles(styles)(Footer);

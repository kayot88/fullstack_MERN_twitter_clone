import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authAction';
import { connect } from 'react-redux';

const styles = {
  textField: {
    width: '100%',
    marginBottom: 5
  },
  btnBlock: {
    textAlign: 'center'
  }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      login: '',
      password: '',
      password2: ''
    };
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  handlerChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handlerSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      login: this.state.login,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(userData, this.props.history);
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper style={{ padding: 15 }}>
        <form onSubmit={this.handlerSubmit}>
          <TextField
            type="email"
            label="Email"
            name="email"
            value={this.state.email}
            onChange={this.handlerChange}
            className={classes.textField}
          />
          <TextField
            label="Login"
            name="login"
            value={this.state.login}
            placeholder="Enter login"
            type="text"
            onChange={this.handlerChange}
            className={classes.textField}
          />
          <TextField
            label="Password"
            name="password"
            value={this.state.password}
            type="password"
            onChange={this.handlerChange}
            className={classes.textField}
          />
          <TextField
            label="Repeat password"
            name="password2"
            value={this.state.password2}
            type="password"
            onChange={this.handlerChange}
            className={classes.textField}
          />
          <div className={classes.btnBlock}>
            <Button variant="outlined" style={{ marginTop: 8 }} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(withStyles(styles)(Register)));



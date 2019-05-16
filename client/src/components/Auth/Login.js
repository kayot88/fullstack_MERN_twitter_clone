import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { loginUser } from '../../actions/authAction';
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    console.log(this.props);
    this.handlerChange = this.handlerChange.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }
  componentDidMount(){
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/')
    }
  }
  handlerChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handlerSubmit(e) {

    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
      errors: {}
    };

    this.props.loginUser(userData);
    console.log(this.props);
  }

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    console.log(this.state.auth);
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
            helperText={errors.email ? errors.email : ''}
            error={errors.email ? true : false}
          />
          <TextField
            label="Password"
            name="password"
            value={this.state.password}
            type="password"
            onChange={this.handlerChange}
            className={classes.textField}
            helperText={errors.password ? errors.password : ''}
            error={errors.password ? true : false}
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

const mapStateToProps = (state)=>({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(withStyles(styles)(Login)));

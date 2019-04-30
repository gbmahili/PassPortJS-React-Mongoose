import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
const log = console.log;
export default class Login extends Component {
	state = {
		email: '',
		password: '',
		errorMessage: ''
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState({ [name]: value })
	};
	handleSubmit = async e => {
		e.preventDefault();
		const { email, password } = this.state;
		const signInInfo = { email, password }
		try {
			let { data } = await axios.post("/authentication/signin", signInInfo);
			localStorage.setItem('@User', JSON.stringify(data));
			const isAuthenticated = data.user.isAuthenticated;
			if (isAuthenticated !== null && isAuthenticated !== undefined) {
				localStorage.setItem('isAuthenticated', isAuthenticated);
			}

			//log('UserData', data);
			this.props.history.push('/profile');// Redirect with react to the profile
		} catch (error) {
			log('Sign In Error:', error);
			//this.setState({errorMessage: error.response.data.error.errorMessage})
		}
	};
	render() {
		const isAuthenticated = localStorage.getItem('isAuthenticated');
		if (isAuthenticated) {
			return <Redirect to="/profile" />
		}
		return (
			<div>
				<h2>Login</h2>
				<form>
					<input style={styles.inputForms} placeholder="Email" type="text" name="email" value={this.state.email} onChange={this.handleChange} />
					<br />
					<input style={styles.inputForms} placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
					<br />
					<button style={styles.submitBtn} onClick={this.handleSubmit}>Login</button>
				</form>
				<p style={{ color: 'red' }}>{this.state.errorMessage}</p>
			</div>
		)
	};
};
const styles = {
	inputForms: {
		padding: 10,
		width: 290,
		border: '1px solid teal',
		margin: 10
	},
	submitBtn: {
		padding: 10,
		width: 320,
		backgroundColor: 'teal',
		margin: 10,
		color: 'white',
		fontSize: 18,
	}
};
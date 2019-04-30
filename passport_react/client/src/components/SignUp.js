import React, { Component } from 'react';
import axios from 'axios';
const log = console.log;
export default class SignUp extends Component {
	state = {
		email: '',
		password: '',
		name: '',
		bio: ''
	};
	handleChange = ({ target: { name, value } }) => {
		this.setState({ [name]: value })
	}
	handleSubmit = async e => {
		e.preventDefault();
		const { email, password, name, bio } = this.state;
		const signUpInfo = { email, password, name, bio }
		try {
			let { data } = await axios.post("/authentication/signup",signUpInfo);
			localStorage.setItem('@User',JSON.stringify(data));
			//log('UserData', data);
			this.props.history.push('/profile');// Redirect with react to the profile
		} catch (error) {
			log('Sign Up Error:', error);
			this.setState({errorMessage: error.response.data.error.errorMessage})
		}
	}
	render() {
		return (
			<div>
				<h2>Sign Up</h2>
				<form>
					<input style={styles.inputForms} placeholder="Full Name" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
					<br />
					<input style={styles.inputForms} placeholder="Email" type="text" name="email" value={this.state.email} onChange={this.handleChange} />
					<br />
					<input style={styles.inputForms} placeholder="Password" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
					<br />
					<input style={styles.inputForms} placeholder="Bio" type="text" name="bio" value={this.state.bio} onChange={this.handleChange} />
					<br />
					<button style={styles.submitBtn} onClick={this.handleSubmit}>Sign Up</button>
				</form>
			</div>
		)
	}
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
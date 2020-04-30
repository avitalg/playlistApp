import React, { Component } from 'react';

class Contact extends Component {
  constructor() {
    this.state = {
      name: '',
      message: '',
      email: '',
      sent: false,
      buttonText: 'Send Message'
    }
  }

  formSubmit = (e) => {
    e.preventDefault();
    let data = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message
    };

    this.setState({
      buttonText: '...sending'
    });

    axios.post(`${process.env.REACT_APP_API_URL}/contactus`, data)
      .then(() => {
        this.setState({ sent: true }, this.resetForm());
      })
      .catch(() => {
        console.log('Message not sent');
      })
  }

  resetForm = () => {
    this.setState({
      name: '',
      message: '',
      email: '',
      buttonText: 'Message Sent'
    });
  }

  render() {
    return (
      <div className='contact'>
        <h2>Contact Us</h2>
        <div className='contact-content'>
          <form className='contact-form' onSubmit={(e) => this.formSubmit(e)}>
            <label class='message' htmlFor='message-input'>Your Message</label>
            <textarea onChange={e => this.setState({ message: e.target.value })} name='message' className='message-input' type='text' placeholder='Please write your message here' value={this.state.message} required />

            <label class='message-name' htmlFor='message-name'>Your Name</label>
            <input onChange={e => this.setState({ name: e.target.value })} name='name' className='message-name' type='text' placeholder='Your Name' value={this.state.name} />

            <label className='message-email' htmlFor='message-email'>Your Email</label>
            <input onChange={(e) => this.setState({ email: e.target.value })} name='email' class='message-email' type='email' placeholder='your@email.com' required value={this.state.email} />

            <div className='button--container'>
              <button type='submit' className='button button-primary'>{this.state.buttonText}</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;

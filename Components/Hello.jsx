import React from 'react';

export default class Hello extends React.Component {

    constructor() {
        super();
        this.state = {
            isReactive: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({isReactive: !this.state.isReactive});
    }
    
    render() {
        const message = this.state.isReactive ? 'Yes! I am reactive!!' : 'Am I reactive??';
        return (
            <div>
                <h1>(a)sdsgn<span style={{color: '#999'}}>.net</span></h1>
                <p>Hello {this.props.name}! My what a {this.props.adj} day.</p>
                <p>My name is Andrew Stewart and this is my playground on the internet. This project is being built with React &amp; AWS.</p>
                <hr />
                <p>{message}</p>
                <button onClick={this.handleClick}>=> Let's find out!</button>
            </div>
        );
    }
}

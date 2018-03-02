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
        const message = this.state.isReactive ? 'Yes! I am reactive!' : 'Am I reactive?';
        return (
            <div>
                <h1>Hello {this.props.name}!</h1>
                <p>My what a {this.props.adj} day.</p>
                <p>AutoMAGICALLY deployed update :D</p>
                <hr />
                <p>{message}</p>
                <button onClick={this.handleClick}>Let's find out!</button>
            </div>
        );
    }
}

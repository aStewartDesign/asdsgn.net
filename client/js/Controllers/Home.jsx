import React from 'react';

export default class Home extends React.Component {

    render() {
        return (
            <div className="container">
                <h2>Welcome to asdsgn.net</h2>
                <div>
                    <p>My name is Andrew Stewart and this is my playground on the internet.</p>
                    <p>This project is being built with:</p>
                    <ul className="c-list">
                        <li className="c-list__item">React/Redux/React Router</li>
                        <li className="c-list__item">PostCSS</li>
                        <li className="c-list__item">AWS</li>
                        <li className="c-list__item">Serverless framework</li>
                    </ul>
                </div>
            </div>
        );
    }
}

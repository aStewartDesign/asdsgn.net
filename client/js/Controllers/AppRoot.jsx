import React from 'react';
import Link from 'react-router-dom/Link';
import { renderRoutes } from 'react-router-config';
import {connect} from 'react-redux';
import _ from 'lodash';

class AppRoot extends React.Component {

    render() {
        return (
            <div>
                <header className="header container">
                    <div>
                        <h1>(as)dsgn<span style={{color: '#999'}}>.net</span></h1>
                        <p>Hello {this.props.name}! My what a {this.props.adj} day.</p>
                    </div>
                    <nav>
                        <ul className="nav">
                            <li className="nav__item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="nav__item">
                                <Link to="/projects">Projects</Link>
                            </li>
                            <li className="nav__item">
                                <Link to="/blog">Blog</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
                <hr />
                <main className="container">
                    {renderRoutes(this.props.route.routes)}
                </main>
            </div>
        );
    }
}

export default connect(
    (state, ownProps) => {
        return _.assign({}, state.app, ownProps);
    }
)(AppRoot);

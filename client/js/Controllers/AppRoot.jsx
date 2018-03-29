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
                        <h1 className="header__title">(as)dsgn<span className="u-color__secondary">.net</span></h1>
                        <p className="header__sub-title">Hello {this.props.name}!<br/>My what a {this.props.adj} day.</p>
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
                <main>
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

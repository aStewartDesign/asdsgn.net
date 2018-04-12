import React from 'react';
import Link from 'react-router-dom/Link';
import { renderRoutes } from 'react-router-config';
import {connect} from 'react-redux';
import classnames from 'classnames';
import _ from 'lodash';

class AppRoot extends React.Component {

    render() {
        return (
            <div>
                <header className="header">
                    <div className="container">
                        
                        <h1 className="header__title">
                            <Link className="header__title-link" to="/">(as)dsgn<span className="header__title-gray">.net</span></Link>
                        </h1>
                        <p className="header__sub-title">/* a. stewart web design experiments */</p>
                    </div>
                    <nav className="container">
                        <ul className="nav">
                            <li>
                                <Link
                                    className={classnames('nav__item', {
                                        'nav__item--active': this.props.location.pathname === '/'
                                    })} 
                                    to="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={classnames('nav__item', {
                                        'nav__item--active': this.props.location.pathname.substring(0, 9) === '/projects'
                                    })}
                                    to="/projects">
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={classnames('nav__item', {
                                        'nav__item--active': this.props.location.pathname.substring(0, 5) === '/blog'
                                    })}
                                    to="/blog">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </header>
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

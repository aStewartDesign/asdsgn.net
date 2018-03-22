import React from 'react';
import Link from 'react-router-dom/Link';
import { renderRoutes } from 'react-router-config';

export default class AppRoot extends React.Component {

    render() {
        return (
            <div>
                <header>
                    <h1>(as)dsgn<span style={{color: '#999'}}>.net</span></h1>
                    <p>Hello {this.props.name}! My what a {this.props.adj} day.</p>
                    <nav>
                        <Link to="/">Home</Link> | <Link to="/projects">Projects</Link> | <Link to="/blog">Blog</Link>
                    </nav>
                </header>
                <hr />
                <main>
                    {renderRoutes(this.props.route.routes)}
                </main>
                <footer>
                    <Link to="/login">loggins</Link>
                </footer>
            </div>
        );
    }
}

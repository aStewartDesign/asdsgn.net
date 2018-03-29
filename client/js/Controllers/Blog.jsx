import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {actions as blogActions} from './blog-reducer';

class Blog extends React.Component {

    render() {
        return (
            <div className="container">
                <h2><span className="u-color__secondary">/</span>blog</h2>
                <div>
                    <p>My blog is not built out yet. Coming soon!</p>
                    {
                        this.props.isLoading
                            ? 'Loading...'
                            : (
                                <div>
                                    {this.props.posts.map((post, i) => (
                                        <div className="post" key={i}>
                                            <h3>{post.title}</h3>
                                            <div className="post__content">
                                                {post.body}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                    }
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.props.loadPosts();
    }
}

export default connect((state, ownProps) => {
    return _.assign({
        posts: state.blog.posts,
        isLoading: state.blog.isLoading
    }, ownProps);
}, blogActions)(Blog);

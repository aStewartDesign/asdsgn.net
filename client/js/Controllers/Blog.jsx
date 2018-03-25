import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {actions as blogActions} from './blog-reducer';

class Blog extends React.Component {

    render() {
        return (
            <div>
                <h2>asdsgn.net: blog</h2>
                <p>My blog is not built out yet. Coming soon!</p>
                {
                    this.props.isLoading
                        ? 'Loading...'
                        : (
                            <div>
                                {this.props.posts.map((post, i) => (
                                    <div className="post" key={i}>
                                        <h1>{post.title}</h1>
                                        <div className="post__content">
                                            {post.body}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )
                }
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

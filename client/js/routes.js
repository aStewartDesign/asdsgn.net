import AppRoot from './Components/AppRoot.jsx';
import Home from './Components/Home.jsx';
import Projects from './Components/Projects.jsx';
import Blog from './Components/Blog.jsx';
import NotFound from './Components/NotFound.jsx';

const routes = [
    {
        component: AppRoot,
        routes: [
            {
                path: '/',
                exact: true,
                component: Home
            },
            {
                path: '/projects',
                component: Projects
            },
            {
                path: '/blog',
                component: Blog
            },
            {
                path: '*',
                component: NotFound
            }
        ]
    }
];

export default routes;
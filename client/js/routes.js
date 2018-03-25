import AppRoot from './Controllers/AppRoot.jsx';
import Home from './Controllers/Home.jsx';
import Projects from './Controllers/Projects.jsx';
import Blog from './Controllers/Blog.jsx';
import Login from './Controllers/Login.jsx';
import ResetPassword from './Controllers/ResetPassword.jsx';
import NotFound from './Controllers/NotFound.jsx';

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
                path: '/login',
                component: Login
            },
            {
                path: '/password-reset',
                component: ResetPassword
            },
            {
                path: '*',
                component: NotFound
            }
        ]
    }
];

export default routes;
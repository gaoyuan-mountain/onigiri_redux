import React from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout from "layouts/CoreLayout";
import LoginView from 'views/login/login.view.jsx';
import RegisterView from 'views/register/register.view.jsx';
import ProjectsView from 'views/projects/projects.view.jsx';

export default (
	<Route component={CoreLayout} path="/">
		<IndexRoute component={LoginView} />
		<Route component={LoginView} path="/login" />
		<Route component={RegisterView} path="/register" />
		<Route component={ProjectsView} path="/projects" />
	</Route>
);
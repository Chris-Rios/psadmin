"use strict";

var React = require('react');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

//define routes, give it the name of the route and give it the component you want it to load.
// you can define the path if you want or else it would make the page name the same as the route name.

var routes = (
  <Route name = "app" path="/" handler={require('./components/app')}>
    <DefaultRoute handler={require('./components/homePage')}/>
    <Route name="authors" handler={require('./components/authors/authorPage')}/>
    <Route name="about" handler={require('./components/about/about')}/>
    <Route name="addAuthor" path="author" handler={require('./components/authors/manageAuthorPage')}/>
    <Route name="manageAuthor" path="author/:id" handler={require('./components/authors/manageAuthorPage')}/>
    <NotFoundRoute handler={require('./components/notFoundPage')}/>
    <Redirect from="about-" to="about" />
  </Route>
);

module.exports = routes;

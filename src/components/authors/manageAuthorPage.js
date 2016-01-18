"use strict";

var React = require('react');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var Router = require('react-router');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({

  statics: {
    willTransitionFrom: function(transition, component){
      if(component.state.dirty && !confirm('Leave without saving?')){
        transition.abort();
      }
    }
  },

  mixins: [
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      author: {id: '', firstName: '', lastName: ''},
      errors: {},
      dirty: false
    };
  },

  componentWillMount: function(){
    var authorId = this.props.params.id;//from the path /author:id

    if(authorId){
      this.setState({author: AuthorStore.getAuthorById(authorId)}); //make a call via ajax. you would do callback or promise here.
    }
  },

  authorFormIsValid: function(){
    var formIsValid = true;
    this.state.errors = {}; //clear any previous erros.
    if (this.state.author.firstName.length < 3){
      this.state.errors.firstName = 'First name must be at least 3 characters';
      formIsValid = false;
    }

    if (this.state.author.lastName.length < 3){
      this.state.errors.lastName = 'Last name must be at least 3 characters';
      formIsValid = false;
    }

    this.setState({errors: this.state.errors});
    return formIsValid;

  },

  setAuthorState: function(event){
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.author[field] = value;
    return this.setState({author: this.state.author});
  },

  saveAuthor: function(event){
    event.preventDefault(); //prevent default browser action

    if(!this.authorFormIsValid()){
      return;
    }

    if (this.state.author.id) {
      AuthorActions.updateAuthor(this.state.author);
    }
    else{
      AuthorActions.createAuthor(this.state.author); //send an action instead.
    }
    this.setState({dirty: false});
    toastr.success('Author saved.');
    this.transitionTo('authors');
  },

  render: function(){
    return (
      <AuthorForm
        author = {this.state.author}
        onChange={this.setAuthorState}
        onSave={this.saveAuthor}
        errors={this.state.errors}/>   //passing author object down, passing change handler, run this functino when anything changes in the author form.
    );
  }
});

module.exports = ManageAuthorPage;

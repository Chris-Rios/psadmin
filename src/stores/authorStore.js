"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');
var CHANGE_EVENT = 'change';

var _authors = []; //private


//basic template for any flux store.

var AuthorStore = assign({}, EventEmitter.prototype, { //pass empty new object, extend it to use eventemitter.prototype, and give it this extra stuff, public api
  addChangeListener: function(callback) { //this is how components tell stores they want to be told if there is a change
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getAllAuthors: function(){
    return _authors;
  },

  getAuthorById: function(id){
    return _.find(_authors, {id: id}); //use lodash to find this id.
  }
});

Dispatcher.register(function(action) { //private stuff
  switch(action.actionType){
    case ActionTypes.CREATE_AUTHOR:
      _authors.push(action.author);  //this is the payload it dispatched.
      AuthorStore.emitChange(); //call whenever the data changes.
      break;
    case ActionTypes.INITIALIZE:
      _authors = action.initialData.authors;
      AuthorStore.emitChange();
      break;
    case ActionTypes.UPDATE_AUTHOR:
      var existingAuthor = _.find(_authors, {id: action.author.id});
      var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
      _authors.splice(existingAuthorIndex, 1, action.author);
      AuthorStore.emitChange(); //call whenever the data changes.
      break;
    case ActionTypes.DELETE_AUTHOR:
      debugger;
      _.remove(_authors, function(author){
        return action.id === author.id;
      });
      AuthorStore.emitChange();
      break;
    default:
  }
});


module.exports = AuthorStore;

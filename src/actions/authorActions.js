"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
  createAuthor: function(author){ //action creator, and actual actions
      var newAuthor = AuthorApi.saveAuthor(author); //you would want to do callbacks/promises here.

      Dispatcher.dispatch({ //the action is this payload, this is passed to the dispatcher
        actionType: ActionTypes.CREATE_AUTHOR,
        author: newAuthor
      });
  },

  updateAuthor: function(author){
    var updatedAuthor = AuthorApi.saveAuthor(author);

    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_AUTHOR,
      author: updatedAuthor
    });
  },

  deleteAuthor: function(id){
    debugger;
    AuthorApi.deleteAuthor(id);
    Dispatcher.dispatch({ //you could put a preloader here, and once it was done fire another action.
      actionType: ActionTypes.DELETE_AUTHOR,
      id: id
    });
  }
};

module.exports = AuthorActions;

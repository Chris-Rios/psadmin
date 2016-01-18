"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorActions = require('../../actions/authorActions');
var toastr = require('toastr');

var AuthorList = React.createClass({
  propTypes: {
    authors: React.PropTypes.array.isRequired //this array is required
  },

  deleteAuthor: function(id, event){ //could also put this on the controller view, via props
    event.preventDefault(); //dont want browser to do anything when we click this link
    debugger; //sets a break point in our browser
    AuthorActions.deleteAuthor(id);
    toastr.success('Author Deleted');
  },

  render: function(){
    var createAuthorRow = function(author){
      return (
        <tr key={author.id}>
          <td><a href="#" onClick={this.deleteAuthor.bind(this,author.id)}>Delete</a></td>
          <td><Link to="manageAuthor" params={{id: author.id}}>{author.id}</Link></td>
          <td>{author.firstName} {author.lastName}</td>
        </tr>
      );
    };
    return (
      <div>
        <table className="table">
          <thead>
            <th></th>
            <th>ID</th>
            <th>Name</th>
          </thead>
          <tbody>
            {this.props.authors.map(createAuthorRow, this)}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = AuthorList;

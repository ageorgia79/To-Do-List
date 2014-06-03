'use strict';

List = Backbone.Model.extend({

  initialize: function() {
    this.on('change', function() {
    })
  },
  defaults: {

  },
  idAttribute: '_id'
});

ListCollection = Backbone.Collection.extend( {

  model: List,

  url: 'http://tiny-pizza-server.herokapp.com/collections/andys-stuff',
})


ListView = Backbone.View.extend( {

  template: _.template($('.list-item').text()),
  editTemplate: _.template($('.list-edit-item')),
})
//'use strict';

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


ListView = Backbone.View.extend({

  template: _.template($('.list-item').text()),

  events: {
    'click .add' :'showadd',
    'click .complete' :'showcomplete',
    'click .remove' :'destroy',
    'click .todoitem' :'showtodoitem',
    'keydown input' :'checkForChanges'
  },

  initialize: function(){

    this.listenTo(this.model, 'change', this.render);

    $('.todolist').prepend(this.el);
    this.render();
  },
})
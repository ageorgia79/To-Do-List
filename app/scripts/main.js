"use script";


var Task = Backbone.Model.extend({ 
    idAttribute: '_id'
});


var TaskCollection = Backbone.Collection.extend({
    model: Task,
    url: 'http://tiny-pizza-server.herokuapp.com/collections/test-users',
});
 

var TaskView = Backbone.View.extend({
 
    template: _.template($('.todo-list').text()),
    editTemplate: _.template($('.todo-list').text()),
 
    events: {
        'click .done-button'    : 'showEdit',
        'click .save-button'        : 'saveChanges',
        'keydown input'             : 'checkForChanges'
 
    },
 
    initialize: function(){
 
        this.listenTo(this.model, 'change', this.render);
        $('.taskBox').prepend(this.el);
        this.render();
    },
 
    render: function(){
        var renderedTemplate = this.template(this.model.attributes);
        this.$el.html(renderedTemplate);
    },
    
    
    showEdit: function(){
       this.model.destroy();
       this.remove();
    },
    
    
    saveChanges: function(){
        var nameVal = this.$el.find('.taskName input').val();
        this.model.set('task', nameVal);
        this.model.save();
    },
 
    checkForChanges: function(){
        if (this.model.get('task') !== this.$el.find('.taskName input').val()){
            this.$el.find('.taskName input').addClass('changed');
        } else {
            this.$el.find('.taskName input').removeClass('changed');
        }
    }
});



var addTask = new TaskCollection();
console.log(addTask)


var cool = addTask.fetch().done(function() {

  addTask.each(function(task) {
    
    new TaskView({
      model: task
    });
  });
});

console.log(cool)


$('.submitTaskButton').click(function(){
    var inputVal = $('.newItem').val();
     
    var newUserInstance = addTask.add({name: inputVal})
    
    newUserInstance.save();
    
    $('.newItem').val('');
    new TaskView({model: newUserInstance});
});
 

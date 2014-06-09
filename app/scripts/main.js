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

// this gives functionality to the add new task button 
$('.submitTaskButton').click(function(){
    var inputVal = $('.newItem').val();
    // this adds the input value to the collection instance 
    var newUserInstance = addTask.add({name: inputVal})
    // this saves the input value to the server 
    newUserInstance.save();
    // this clears the value of the new item input 
    $('.newItem').val('');
    new TaskView({model: newUserInstance});
});
 
// this renders 
// var AppView = Backbone.View.extend({
 
//   initialize: function(){
//     this.listenTo(coolUsers, 'add', function(task){
//       new TaskView({model: task})
//     })
//   }
 
// });
 
// // create instances
 
// var coolUsers = new TaskCollection();
// // console.log(coolUsers)
 
// var app = new AppView();
 
// coolUsers.fetch();
/*global angular */
/*
 This is the controller which contains all the actions which has to be carried out from the UI. The functions which
 are explained here include the get all, create, update and delete methods
 */
(function () {
  'use strict';
  // Todo controller
  angular.module('toDo').controller('ToDoController', ToDoController);
  ToDoController.$inject = [
    '$scope',
    'Todo'
  ];
  function ToDoController($scope, Todo) {
    //formData is the data entered in the text field which has to be empty initially
    $scope.formData = {};
    //function to toggle the buttons which are displayed in the view
    function toggleEdit(todo) {
      //Get all the four icon buttons from DOM
      var bforEdit=document.getElementById('icon10_' + todo._id);
      var AfterEdit=document.getElementById('icon11_' + todo._id);

      //When edit button is clicked isEditable is enabled and edit options must be displayed
      if (!todo.isEditable) {
        bforEdit.style.display = 'none';
        AfterEdit.style.display = 'block';
      }  //When cancel/save button is clicked isEditable is disabled and delete/edit buttons must be displayed
      else {
        bforEdit.style.display = 'block';
        AfterEdit.style.display = 'none';
      }
      //Toggle the value, to show and hide the text box and save/cancel buttons
      todo.isEditable = !todo.isEditable;
    }
    /*
         This function is called when the edit button is clicked. The text box along with the save and cancel buttons
         are displayed according to the toggle value (isEditable)
         */
    $scope.toggleEdit = function (todo) {
      toggleEdit(todo);
    };
    //This function is called when the edit is cancelled. The old value is replaced after cancel.
    $scope.cancelEdit = function (todo) {
      toggleEdit(todo);
      //Get the text box from DOM
      var toDoEdit = document.getElementById(todo._id);
      //Replace the old value in the text box
      toDoEdit.value = todo.task_name;
    };
    /*This function is called when the edited value has to be saved. A PUT service call is made to the server and
         the value is updated in the database
         */
    $scope.saveEdit = function (todo) {
      //show the loading indicator when the create operation is called
      $scope.loading = true;
      var toDoEdit = document.getElementById(todo._id);
      if (toDoEdit) {
        // call the update function from our service
        Todo.update({ 'task_name': toDoEdit.value }, todo._id)  // if successful creation, call our get function to get all the new core
.success(function (data) {
  todo.isEditable = !todo.isEditable;
          // assign our new list of core
  Todo.get().success(function (data) {
            //assign the core which are obtained from the service response to show in the UI
    $scope.todo = data.data;
            //Hide the loading indicator
    $scope.loading = false;
  });
});
      }
    };
    /*
         loading is the variable which contained the Boolean value which indicates which the loading indicator
         should be displayed
         */
    $scope.loading = true;
    /* GET -
         when landing on the page, get all core and show them
         use the service to get all the core */
    Todo.get().success(function (data) {
      //assign the core which are obtained from the service response to show in the UI
      $scope.todo = data.data;
      //Hide the loading indicator
      $scope.loading = false;
    });
    /* CREATE -
         when submitting the add form, send the text to the node API */
    $scope.createTodo = function () {
      /* validate the formData to make sure that something is there
             if form is empty, nothing will happen */
      if ($scope.formData.task_name !== undefined) {
        //show the loading indicator when the create operation is called
        $scope.loading = true;
        // call the create function from our service
        Todo.create($scope.formData)  // if successful creation, call our get function to get all the new core
.success(function (data) {
          // clear the form so our user is ready to enter another
  $scope.formData = {};
          // assign our new list of core
  Todo.get().success(function (data) {
            //assign the core which are obtained from the service response to show in the UI
    $scope.todo = data.data;
            //Hide the loading indicator
    $scope.loading = false;
  });
});
      }
    };
    // DELETE
    // delete a todo after checking it
    $scope.deleteTodo = function (id) {
      //show the loading indicator when the delete operation is called
      $scope.loading = true;
      //Call the delete service with the id of the ToDo as input
      Todo.delete(id)  // if successful creation, call our get function to get all the new core
.success(function (data) {
        // assign our new list of core
  Todo.get().success(function (data) {
          //assign the core which are obtained from the service response to show in the UI
    $scope.todo = data.data;
          //Hide the loading indicator
    $scope.loading = false;
  });
});
    };
  }
}());
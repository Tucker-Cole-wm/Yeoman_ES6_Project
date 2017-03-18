/* Author: Cole Tucker
Date: 3/2/17
File: main.html
Description: Main view for the home page

3/2 CT - Removed Yeoman sample content,
         injected $log service for testing,
         created postMessage function
*/
export class MainController {
  constructor ($http) {
    'ngInject';
    this.$http = $http;
    this.getMessages();
  }

  getMessages() {
      // calls the controller object itself
      var vm = this;

      this.$http.get('http://localhost:8080/api/message')
          .then(function(result) {
              vm.messages = result.data;
          });
  }

  // function for $http post requests
  postMessage() {
      this.$http.post('http://localhost:8080/api/message', {
          msg: this.message
      });
  }
}

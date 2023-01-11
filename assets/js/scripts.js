//Create Angular App
const app = angular.module('myApp', ["ngRoute"]);

//View Controller (R)
app.controller('viewCtrl', ($scope, $http)=>{
    $http.get('http://localhost:3005/')
        .then((res)=>{
           $scope.data = res.data;
        });
});


//Adding entry into database (C)
app.controller('addCtrl', function ($scope){
    $scope.addEntry = function () {
        const newEntry = `{"emp_id": "${$scope.emp_id}", "emp_name": "${$scope.emp_name}", "emp_desig": "${$scope.emp_desig}", "emp_dept": "${$scope.emp_dept}"}, "emp_salary": "${$scope.emp_salary}"}, "emp_location": "${$scope.emp_location}"}`;
        console.log(newEntry);
        fetch('http://localhost:3005/add', {
            method: "POST",
            body: newEntry,
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err));

        $scope.emp_id = "";
        $scope.emp_name = "";
        $scope.emp_desig = "";
        $scope.emp_dept = "";
        $scope.emp_salary = "";
        $scope.emp_location = "";
    };
});

//Update Controller (U)
app.controller('updateCtrl', function ($scope, $http, $route){
    $http.get('http://localhost:3005/')
        .then((res)=>{
            $scope.datas = res.data;
        })

    $scope.getId = function () {
        const selectedID = $scope.emp_id;
        console.log(selectedID);
        $scope.emp_name = selectedID['name'];
        $scope.emp_desig = selectedID['desig'];
        $scope.emp_dept = selectedID['dept'];
        $scope.emp_salary = selectedID['salary'];
        $scope.emp_location = selectedID['location'];
    }

    $scope.update = function () {
        const newData = `{"emp_id":"${$scope.emp_id['id']}", "emp_name":"${$scope.emp_name}", "emp_desig": "${$scope.emp_desig}", "emp_dept": "${$scope.emp_dept}"}, "emp_salary": "${$scope.emp_salary}"}, "emp_location": "${$scope.emp_location}"}`;

        fetch('http://localhost:3005/update', {
            method: "POST",
            body: newData,
            headers: {"Content-Type": "application/json; charset=UTF-8"}
        })
            .then(res => console.log(res))
            .catch(err =>console.log(err));

        $route.reload();
        $scope.emp_id = "";
        $scope.emp_name = "";
        $scope.emp_desig = "";
        $scope.emp_dept = "";
        $scope.emp_salary = "";
        $scope.emp_location = "";
    }
});

//Delete Controller (D)
app.controller('deleteCtrl', ($scope, $http)=>{
   $http.get('http://localhost:3005/')
       .then((res)=>{
           $scope.data = res.data;
       })
    $scope.delete = function () {
       const delId = `{"id":${$scope.emp_id['id']}}`;

       fetch('http://localhost:3005/delete', {
           method: "POST",
           body:delId,
           headers: {'Content-Type': 'application/json; charset=UTF-8'}
       })
           .then(res => console.log(res))
           .catch(err => console.log(err))
    }
});


//Route Provider
app.config(($routeProvider)=>{
    $routeProvider
        .when("/", {
            templateUrl: "view.html",
        })
        .when("/add", {
            templateUrl: "add.html",
        })
        .when("/update", {
            templateUrl: "update.html",
        })
        .when("/delete", {
            templateUrl: "delete.html",
        })
});

//Input Display for search
function showInp(inp){
    document.querySelectorAll(".srcInp").forEach(x=>{
        if(x.id !== inp){
            x.classList.add('d-none');
        }
        else{
            x.classList.remove('d-none');
        }
    })
}
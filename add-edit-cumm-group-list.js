angular.module('qdesqCodeApp').controller('addEditCumulativeEditCtrl', ['$scope', 'api', 'commonData', '$state', 'commonFunctions', 'session','$filter','$rootScope','Authentication','$http',
    function($scope, api, commonData, $state, commonFunctions, session,$filter, $rootScope,Authentication,$http) {


       
        $scope.cummGroupMemberOptions = [1,2,3,4,5]
        

        $scope.cummGroupModal = {
            groupName: null,
            groupMembers:null,
            
        }
        $scope.formSubmitted = false
        $scope.cummGroupId =  null;
        $scope.loading = false;
        $scope.errorMessageModal = {
            errorMessage:null,
            successMessage: null,
            confirmMessage: null,
            action:null,
            reset: function(){
                this.errorMessage = null;
                this.successMessage = null;
                this.confirmMessage = null;
                this.action = null;
                $('#responseModal').modal('hide');
            }

        };

        $scope.init = function(){
            var params = urlParams = new URLSearchParams(window.location.href);

            if(params.get('cummGroupId')){
                $scope.cummGroupId = params.get('cummGroupId');
                $scope.cummGroupDetails()
            }
            


        }




        $scope.cummGroupDetails = function(){


            var url = 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json'
            $scope.loading = true
            $http.get(url)
            .then(function(data){
                $scope.loading = false
                $scope.cummGroupModal = $scope.mockData;
            },function(error){
                $scope.loading = false
                $scope.errorMessageModal.errorMessage = 'Error: Can not get data.'
                $('#responseModal').modal('show');
            })
            




        }


        $scope.onClickSave = function(){
            $scope.formSubmitted = true
            if(!validateForm()){
                return;
            }
            if(this.cummGroupId){
                this.errorMessageModal.confirmMessage = 'Are you sure you want to edit changes ?';
                this.errorMessageModal.action = 'Edit'
                $('#responseModal').modal('show');

            }else{
                this.errorMessageModal.confirmMessage = 'Are you sure you want to save changes ?';
                this.errorMessageModal.action = 'Save'
                $('#responseModal').modal('show');
            }

        }

        $scope.saveOrEditChanges = function(action){

           
            console.log(action,' changes')
            var url = 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json'
            $scope.errorMessageModal.reset();
            $scope.loading = true
            setTimeout(function(){
                $http.post(url, $scope.cummGroupModal)
                .then(function(data){
                    $scope.loading = false
                    $scope.cummGroupModal = null;
                    $scope.errorMessageModal.successMessage = 'Data has been saved successfully.'
                    $('#responseModal').modal('show');
                },function(error){
                    $scope.loading = false
                    $scope.errorMessageModal.errorMessage = 'Error: Can not post data.'
                    $('#responseModal').modal('show');
                })
            },1000)
            
        }

       function validateForm(){
           var requiredKeys = ['groupName','groupMembers']
           for(var i=0;i<requiredKeys.length;i++){
               if(!$scope.cummGroupModal[requiredKeys[i]]){
                return false
               }
           }
           return true
       }
       

        $scope.init()
        
       $scope.onClickYes = function(){
           var action = this.errorMessageModal.action
            $scope.errorMessageModal.reset();
            setTimeout(function(){
                if(action == 'Edit' || action == 'Save'){
                    $scope.saveOrEditChanges(action)
                }
                if(action == 'Delete'){
                    $scope.deleteData()
                }
            },1000)
       }



        $scope.onClickDelete = function(){
            this.errorMessageModal.confirmMessage = 'Are you sure you want to delete this ?';
            this.errorMessageModal.action = 'Delete'
            $('#responseModal').modal('show');
        }

        $scope.deleteData = function(){
            var url = 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json'
            
            $scope.loading = true
            $http.post(url, $scope.cummGroupModal)
            .then(function(data){
                $scope.loading = false
                $scope.cummGroupModal = null
            },function(error){
                $scope.loading = false
                $scope.errorMessageModal.errorMessage = 'Error: Can not post data.'
                $('#responseModal').modal('show');
            })
        }










    }
])

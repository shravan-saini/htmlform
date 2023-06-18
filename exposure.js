angular.module('qdesqCodeApp').controller('addRowCtrl', ['$scope', 'api', 'commonData', '$state', 'commonFunctions', 'session','$filter','$rootScope','Authentication','$http',
    function($scope, api, commonData, $state, commonFunctions, session,$filter, $rootScope,Authentication,$http) {


        $scope.mockData = {
            fundGrpId: 'fund002',
            limitTypeCd:'type003',
            limitName:'name003',
            minExpoPct:34,
            maxExpoPct:67,
            minExpoDay:40,
            maxExpoDay:60
        }

        $scope.fundGroupIds = ['fund001','fund002','fund003','fund004']
        $scope.limitType = ['type001','type002','type003','type004'];
        $scope.limitName = ['name001','name002', 'name003']

        $scope.exposureLimitModal = {
            fundGrpId: null,
            limitTypeCd:null,
            limitName:null,
            minExpoPct:null,
            maxExpoPct:null,
            minExpoDay:null,
            maxExpoDay:null,
        }
        $scope.formSubmitted = false
        $scope.exposureId =  null;
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

            if(params.get('exposureId')){
                $scope.exposureId = params.get('exposureId');
                $scope.getExposureDetails()
            }
            


        }




        $scope.getExposureDetails = function(){


            var url = 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json'
            $scope.loading = true
            $http.get(url)
            .then(function(data){
                $scope.loading = false
                $scope.exposureLimitModal = $scope.mockData;
            },function(error){
                $scope.loading = false
                $scope.errorMessageModal.errorMessage = 'Error: Can not get data.'
                $('#responseModal').modal('show');
            })
            




        }
        $scope.onClickYes = function(){
            var action = his.errorMessageModal.action
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


        $scope.onClickSave = function(){
            $scope.formSubmitted = true
            if(!validateForm()){
                return;
            }
            if(this.exposureId){
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
            $scope.loading = true
            $http.post(url, $scope.exposureLimitModal)
            .then(function(data){
                $scope.loading = false
                $scope.exposureLimitModal = null;
                $scope.errorMessageModal.successMessage = 'Data has been saved successfully.'
                $('#responseModal').modal('show');
            },function(error){
                $scope.loading = false
                $scope.errorMessageModal.errorMessage = 'Error: Can not post data.'
                $('#responseModal').modal('show');
            })
            
        }

       function validateForm(){
           var requiredKeys = ['fundGrpId','limitTypeCd','limitName','minExpoPct','maxExpoPct','minExpoDay','maxExpoDay']
           for(var i=0;i<requiredKeys.length;i++){
               if(!$scope.exposureLimitModal[requiredKeys[i]]){
                return false
               }
           }
           return true
       }
       

        $scope.init()
        




        $scope.onClickDelete = function(){
            this.errorMessageModal.confirmMessage = 'Are you sure you want to delete this ?';
            this.errorMessageModal.action = 'Delete'
            $('#responseModal').modal('show');
        }

        $scope.deleteData = function(){
            var url = 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json'
            $scope.errorMessageModal.reset();
            $scope.loading = true
            setTimeout(function(){
                $http.post(url, $scope.exposureLimitModal)
                .then(function(data){
                    $scope.loading = false
                    $scope.exposureLimitModal = null
                },function(error){
                    $scope.loading = false
                    $scope.errorMessageModal.errorMessage = 'Error: Can not post data.'
                    $('#responseModal').modal('show');
                })
            },1000)
        }










    }
])

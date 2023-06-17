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
            maxExpoDay:null
        }

        $scope.exposureId =  null;
        $scope.loading = false;
        $scope.errorMessage = null;

        $scope.init = function(){
            alert($state.params.exposureId)

            if($state.params.exposureId){
                $scope.exposureId = $state.params.exposureId;
                $scope.getExposureDetails()
            }
            


        }




        $scope.getExposureDetails = function(){


            var url = 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json'
            $scope.loading = true
            $http.get(url)
            .then(function(data){
                $scope.loading = false
                $scope.addModal = $scope.mockData;
            },function(error){
                $scope.loading = false
                $scope.errorMessage = 'Error: Can not get data.'
            })
            




        }


        $scope.onClickSave = function(){
            //Todo: validations
            var url = 'https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json'
            $scope.loading = true
            $http.post(url, $scope.addModal)
            .success(function(data){
                $scope.loading = false
                $scope.addModal = null;
            })
            .error(function(error){
                $scope.loading = false
                $scope.errorMessage = 'Error: Can not post data.'
            })


        }

        $scope.init()
        

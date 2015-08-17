Article.controller('DetailController', function ($scope, $modal, $log, $routeParams, $location, ArticleService, GlobalService, article) {
    $scope.article = article;
    $scope.globals = GlobalService;
    $scope.displayToggle = true;

    $scope.remove = function () {
        var failCb = function (status) {
            console.log(status);
        };
        ArticleService.delete($scope.article.id).then(function (data) {
            $scope.article = data;
            $location.path('/')
        }, failCb);
    };

    $scope.searchArticle = function (text) {
        $scope.article = [];
        $scope.articles = [];
        $scope.displayToggle = false;
        ArticleService.query(text, '').then(function (data) {
            $scope.articles.push.apply($scope.articles, data.results);
            $scope.nextPage = data.next;

        }, function (status) {
            console.log(status);
        });
        //$scope.keywords=null;

        //console.log(JSON.stringify($scope.questions));
    };

    //open modals
    $scope.adminOpen = function (action) {
        if (action === 'edit'){
            var adminEditModalInstance = $modal.open({
                templateUrl: "/templates/articleEditForm",
                controller: ArticleEditCtrl,
                resolve: {
                    article: function () {
                        return $scope.article;
                    }
                }
            });

            adminEditModalInstance.result.then(function (article) {
                $scope.article = article;
                console.log($scope.article);
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    };

});


var ArticleEditCtrl = function ($scope, $modalInstance, ArticleService, article) {
    var failureCb = function (status) {
        console.log(status);
    };
    $scope.article = article;
    //calling board service
    $scope.update = function () {
        ArticleService.update($scope.article).then(function (data) {
            $scope.article = data;
            $modalInstance.close($scope.article);
        }, failureCb);
    };
    $scope.close = function () {
        $modalInstance.dismiss('cancel');
    };


};
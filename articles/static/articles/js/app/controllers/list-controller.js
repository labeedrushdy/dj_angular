Article.controller('ListController', function ($scope, $modal, $log, GlobalService, ArticleService, articles) {
    var articlesChunk = articles;
    $scope.articles = articlesChunk.results;
    $scope.nextPage = articlesChunk.next;
    $scope.globals = GlobalService;

    if ($scope.articles) {
        for (var i = 0; i < $scope.articles.length; i++) {
            $scope.articles[i].description = $scope.articles[i].description.substring(0,250);
        }
    }
    $scope.displayToggle = true;

    $scope.searchArticle = function (text) {
        $scope.articles = [];
        $scope.displayToggle = false;
        ArticleService.query(text, '').then(function (data) {
            $scope.articles.push.apply($scope.articles, data.results);
            $scope.nextPage = data.next;
        }, function (status) {
            console.log(status);
        });
        //$scope.keywords=null;

        //console.log(JSON.stringify($scope.articles));
    };


    $scope.pagination = function (callNext) {
        console.log("called");
        if (callNext !== null) {
            var pathArray = callNext.split('/');
            var pathSTR = pathArray[pathArray.length -1];
            var pageNo = pathSTR.match(/page=[0-9]$/)[0];
            ArticleService.query($scope.keywords, pageNo).then(function (data) {
                $scope.articles.push.apply($scope.articles, data.results);
                $scope.nextPage = data.next;
                for (var i = 0; i < $scope.articles.length; i++) {
                    $scope.articles[i].description = $scope.articles[i].description.substring(0,250);
                }
            }, function (status) {
                console.log(status);
            });

        }
        // console.log(JSON.stringify($scope.articles));
    };

});

Article.controller('AdminController', function ($scope, $modal, $location, $log, GlobalService, ArticleService, articles) {
    var articlesChunk = articles;
    $scope.articles = articlesChunk.results;
    $scope.nextPage = articlesChunk.next;

    $scope.pagination = function (nextpage) {
        if (nextpage !== '') {
            var pathArray = nextpage.split('/');
            var pageNo = pathArray[pathArray.length -1];
            ArticleService.list(pageNo).then(function(data){
                $scope.articles.push.apply($scope.articles, data.results);
                $scope.nextPage = data.next;
            });

        }
        // console.log(JSON.stringify($scope.articles));
    };

    $scope.globals = GlobalService;
    $scope.searchArticle = function (text) {
        $scope.articles = [];
        ArticleService.query(text).then(function (data) {
            $scope.articles.push.apply($scope.articles, data.results);
            $scope.nextPage = data.next;
        }, function (status) {
            console.log(status);
        });
        console.log(JSON.stringify($scope.articles));
    };

    $scope.remove = function (article) {
        var failureCb = function (status) {
            console.log(status);
        };
        ArticleService.delete(article.id).then(function (data) {
            var index = $scope.articles.indexOf(article);
            $scope.articles.splice(index, 1);
            $location.path('/admin')
        }, failureCb);

    };

});


Article.controller('AddController', function ($scope, $log, $location, GlobalService, ArticleService) {
    var failureCb = function (status) {
        console.log(status);
    };

    $scope.article = new Object();

    //sends all data in POST method to server
    $scope.create = function () {
        ArticleService.save($scope.article).then(function (data) {
            $scope.article = data;
            $location.path('/admin');
        }, function(status){
            console.log(status);
        });
    };

    //close modal
    $scope.close = function () {
        $location.path('/admin');
    };

});



Article.controller('EditController', function ($scope, $log, $location, GlobalService, ArticleService, article) {
    var failureCb = function (status) {
        console.log(status);
    };

    $scope.article = article;

    $scope.update = function () {
        ArticleService.update($scope.article).then(function (data) {
            $scope.article = data;
            $location.path('/admin');
        }, failureCb);
    };

    //cancel editing
    $scope.close = function () {
        $location.path('/admin');
    };

});

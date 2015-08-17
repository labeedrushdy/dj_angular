'use strict';

var Article = angular.module("Article", [
    "ui.bootstrap",
    "ngCookies",
    "angularFileUpload",
    "infinite-scroll",
    "ngSanitize"

    ], function ($interpolateProvider) {
        $interpolateProvider.startSymbol("{[{");
        $interpolateProvider.endSymbol("}]}");
    }
);

Article.run(function ($http, $cookies) {
    $http.defaults.headers.common['X-CSRFToken'] = $cookies['csrftoken'];
});


var template_prefix = '/templates/';

Article.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "/static/articles/js/app/views/articleList.html",
            controller: "ListController",
            resolve: {
                articles: function (ArticleService) {
                    return ArticleService.list('index');
                }
            }
        })
        .when("/articles/:id", {
            templateUrl: "/static/articles/js/app/views/articleDetail.html",
            controller: "DetailController",
            resolve: {
                article: function ($route, ArticleService) {
                    var articleId = $route.current.params.id;
                    return ArticleService.get(articleId);
                }
            }
        }).when("/admin", {
            templateUrl: template_prefix + 'adminArticle',
            controller: "AdminController",
            resolve: {
                articles: function (ArticleService) {
                    return ArticleService.list('index');
                }
            }
        })
        .when("/admin/add", {
            templateUrl: template_prefix + 'articleAddForm',
            controller: "AddController"
        })
        .when("/admin/edit/:id", {
            templateUrl: template_prefix + 'articleEditForm',
            controller: "EditController",
            resolve: {
                article: function ($route, ArticleService) {
                    var articleId = $route.current.params.id
                    return ArticleService.get(articleId);
                }
            }
        })
        .otherwise({
            redirectTo: "/"
        })
});
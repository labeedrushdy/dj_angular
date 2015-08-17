Article.factory('ArticleService', function ($http, $q) {
    var api_url = "/articles/";
    return {
        get: function (article_id) {
            var url = api_url + article_id + "/";
            var defer = $q.defer();
            $http({method: 'GET', url: url}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
        list: function (next) {
            var defer = $q.defer();
            var url;
            if (next==="index") {
                url = api_url
            }else{
                url = api_url + next;
            }

            $http({method: 'GET', url: url}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
        update: function (article) {
            var url = api_url + article.id + "/";
            var defer = $q.defer();
            $http({method: 'PUT',
                url: url,
                data: article}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
        save: function (article) {
            var defer = $q.defer();
            $http({method: 'POST',
                url: api_url,
                data: article
            }).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
        delete: function (article_id) {
            var url = api_url + article_id + "/";
            var defer = $q.defer();
            $http({method: 'DELETE', url: url}).
                success(function (data, status, headers, config) {
                    defer.resolve(data);
                })
                .error(function (data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        },
        query: function(text, next){
            if (typeof text === 'undefined'){
                text = "";
            }
            var url = api_url + '?q=' + text + "&" + next;
            var defer = $q.defer();
            $http({method: 'GET', url: url}).
                success(function(data, status, headers, config) {
                    defer.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    defer.reject(status);
                });
            return defer.promise;
        }
    }
});
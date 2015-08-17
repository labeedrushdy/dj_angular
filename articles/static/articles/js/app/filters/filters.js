Article.filter('truncate', function () {
    return function (text, length, end) {
        if (isNaN(length))
            length = 300;

        if (end === undefined)
            end = "...";

        if (text){
            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }
        }

    };
});


Article.filter('featuredArticle', function() {
    return function( articles, checkFeatured) {
        var filtered = [];
        angular.forEach(articles, function(article) {
            if(article.is_featured == checkFeatured) {
                filtered.push(article);
            }
        });
        return filtered;
    };
});
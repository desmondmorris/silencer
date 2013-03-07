// Generated by CoffeeScript 1.5.0
(function() {

  $(function() {
    var article, articles, articlesArray, articlesLength, filterTerms, term, _i, _len, _results;
    filterTerms = ["Apple", "Frank Chimero", "Coke", "Privacy", "San Francisco", "Canon"];
    if ($('#queue').length > 0) {
      articles = $('#queue');
      articlesArray = articles.children();
      articlesLength = articles.children().length;
      _results = [];
      for (_i = 0, _len = articlesArray.length; _i < _len; _i++) {
        article = articlesArray[_i];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (_j = 0, _len1 = filterTerms.length; _j < _len1; _j++) {
            term = filterTerms[_j];
            if ($($(article).find(".title").children()[0]).text().indexOf(term) > -1) {
              _results1.push($(article).hide());
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        })());
      }
      return _results;
    }
  });

}).call(this);

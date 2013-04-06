// Generated by CoffeeScript 1.5.0
(function() {

  $(function() {
    var addTerm, filterTwitter, first, getTerms, hideChild, makeTermArray, removeTerm, storeTerms;
    Array.prototype.remove = function() {
      var ax, what;
      while (arguments.length && this.length) {
        what = arguments[--arguments.length];
        while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
        }
      }
      return this;
    };
    storeTerms = function(terms) {
      return localStorage.setItem("myFilteredTerms", JSON.stringify(terms));
    };
    getTerms = function(myFilteredTerms) {
      var item, myList, myNewList, terms, _i, _len;
      myList = localStorage.getItem("myFilteredTerms");
      myNewList = JSON.parse(myList);
      terms = [];
      for (_i = 0, _len = myNewList.length; _i < _len; _i++) {
        item = myNewList[_i];
        terms.push(item['term'].toLowerCase());
      }
      return terms;
    };
    addTerm = function(newTerm, termArray) {
      termArray.push({
        "term": newTerm
      });
      return storeTerms(termArray);
    };
    removeTerm = function(termToBeRemoved) {
      var newTermList, term, terms, _i, _j, _len, _len1;
      terms = getTerms();
      for (_i = 0, _len = terms.length; _i < _len; _i++) {
        term = terms[_i];
        if (term === termToBeRemoved) {
          terms.remove(term);
        }
      }
      newTermList = [];
      for (_j = 0, _len1 = terms.length; _j < _len1; _j++) {
        term = terms[_j];
        newTermList.push({
          "term": term
        });
      }
      return storeTerms(newTermList);
    };
    makeTermArray = function() {
      var term, termArray, terms, _i, _len;
      termArray = [];
      terms = getTerms();
      for (_i = 0, _len = terms.length; _i < _len; _i++) {
        term = terms[_i];
        termArray.push({
          "term": "" + term
        });
      }
      return termArray;
    };
    hideChild = function(child) {
      return child.slideUp();
    };
    filterTwitter = function() {
      var term, termList, tweet, tweets, tweetsArray, tweetsLength, _i, _len, _results;
      termList = getTerms();
      if ($(".stream-items").children().length > 0) {
        tweets = $(".stream-items");
        tweetsArray = tweets.children();
        tweetsLength = tweetsArray.length;
        _results = [];
        for (_i = 0, _len = tweetsArray.length; _i < _len; _i++) {
          tweet = tweetsArray[_i];
          _results.push((function() {
            var _j, _len1, _results1;
            _results1 = [];
            for (_j = 0, _len1 = termList.length; _j < _len1; _j++) {
              term = termList[_j];
              if ($(tweet).is(":visible")) {
                if ($($(tweet)).text().toLowerCase().indexOf(term.toLowerCase()) > -1) {
                  _results1.push(hideChild($(tweet)));
                } else {
                  _results1.push(void 0);
                }
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
          })());
        }
        return _results;
      }
    };
    if (!localStorage['myFilteredTerms']) {
      first = {
        "term": "please enter a term to filter"
      };
      localStorage.setItem('myFilteredTerms', JSON.stringify(first));
    }
    filterTwitter();
    setInterval(filterTwitter, 4000);
    return chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
      var termArray;
      termArray = makeTermArray();
      console.log(message);
      if (message !== "showTerms") {
        if (message.substring(0, 3) === "add") {
          message = message.slice(3);
          addTerm(message, termArray);
          return sendResponse(termArray);
        } else if (message.substring(0, 6) === "remove") {
          message = message.slice(6);
          if (confirm("are you sure you want to remove this term?")) {
            removeTerm(message);
            return sendResponse(termArray);
          }
        }
      } else {
        return sendResponse(getTerms());
      }
    });
  });

}).call(this);
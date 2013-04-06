// Generated by CoffeeScript 1.5.0
(function() {

  $(function() {
    var _this = this;
    $('.my-form').submit(function() {
      var newTerm;
      newTerm = $('.term-to-submit').val();
      if (newTerm !== "") {
        mixpanel.track('Term Added (enter pressed)', {
          "id": newTerm
        });
        return chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "add" + newTerm, function(response) {
            return console.log(response);
          });
        });
      }
    });
    $('.submit').click(function() {
      var newTerm;
      newTerm = $('.term-to-submit').val();
      if (newTerm !== "") {
        mixpanel.track('Term Added (button)', {
          "id": newTerm
        });
        return chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "add" + newTerm, function(response) {
            console.log(JSON.stringify(response));
            $(".terms").append($('<li></li>', {
              "class": "term",
              "data-term": "" + newTerm,
              "text": "" + newTerm
            }));
            return $(".terms").children().last().append($('<a></a>', {
              "href": "#",
              "class": "remove-term",
              "text": "x"
            }));
          });
        });
      }
    });
    chrome.tabs.query({
      "active": true,
      "currentWindow": true
    }, function(tab) {
      return chrome.tabs.sendMessage(tab[0].id, "showTerms", function(response) {
        var child, term, terms, _i, _j, _len, _len1, _ref;
        console.log(JSON.stringify(response));
        terms = response;
        for (_i = 0, _len = terms.length; _i < _len; _i++) {
          term = terms[_i];
          $(".terms").append($('<li></li>', {
            "class": "term",
            "data-term": "" + term,
            "text": "" + term
          }));
        }
        _ref = $(".terms").children();
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          child = _ref[_j];
          $(child).append($('<a></a>', {
            "href": "#",
            "class": "remove-term",
            "text": "x"
          }));
        }
        return mixpanel.track('Silencer Opened');
      });
    });
    return $(".terms").on('click', 'li a', (function(e) {
      var term, termToBeRemoved;
      e.preventDefault();
      term = $(e.currentTarget).parent().data("term");
      mixpanel.track("Term Removed", {
        "id": term
      });
      termToBeRemoved = "remove" + term;
      return chrome.tabs.query({
        "active": true,
        "currentWindow": true
      }, function(tab) {
        return chrome.tabs.sendMessage(tab[0].id, termToBeRemoved, function(response) {
          return console.log(response);
        });
      });
    }));
  });

}).call(this);
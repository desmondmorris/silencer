// Generated by CoffeeScript 1.5.0
(function() {

  $(function() {
    var focus, newTerm,
      _this = this;
    newTerm = function() {
      return $('.term-to-submit').val();
    };
    focus = function() {
      return $('.term-to-submit').focus();
    };
    $('.term-to-submit').keyup(function(event) {
      return $('.primary.button.submit').text("Mute " + (newTerm()));
    });
    $('.my-form').submit(function() {
      if (newTerm() !== "") {
        mixpanel.track('Term Added (enter pressed)', {
          "id": newTerm()
        });
        return chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "add" + newTerm(), function(response) {
            return console.log(response);
          });
        });
      }
    });
    $('.mute.submit').click(function() {
      if (newTerm() !== "") {
        mixpanel.track('Term Added (button)', {
          "id": newTerm()
        });
        return chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "add" + newTerm(), function(response) {
            console.log(JSON.stringify(response));
            return $(".terms").append($('<li></li>', {
              "class": "term",
              "data-term": "" + (newTerm()),
              "text": "" + (newTerm())
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
        var child, term, terms, _i, _j, _k, _len, _len1, _len2, _ref;
        if (response) {
          terms = response;
          for (_i = 0, _len = terms.length; _i < _len; _i++) {
            term = terms[_i];
            if (term === "nbafinalsfilter") {
              $(".add-nba").text("Remove");
            }
            if (term === "gameofthronesfilter") {
              $(".add-got").text("Remove");
            }
            if (term === "madmenfilter") {
              $(".add-mm").text("Remove");
            }
            if (term === "arresteddevelopmentfilter") {
              $(".add-ad").text("Remove");
            }
          }
          for (_j = 0, _len1 = terms.length; _j < _len1; _j++) {
            term = terms[_j];
            $(".terms").append($('<li></li>', {
              "class": "term",
              "data-term": "" + term,
              "text": "" + term
            }));
          }
          _ref = $(".terms").children();
          for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
            child = _ref[_k];
            $(child).wrapInner("<a href='#' class='remove-term'></a>");
          }
          return mixpanel.track('Silencer Opened');
        }
      });
    });
    $(".terms").on('click', 'li a', (function(e) {
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
    /* Adding filters
    */

    $('.add-got').click(function(e) {
      e.preventDefault();
      if ($('.add-got').text() === "Add") {
        mixpanel.track("GoT Filter Added");
        chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "filtergot-add");
        });
        return $(".add-got").text("Remove");
      } else {
        mixpanel.track("GoT Filter Removed");
        chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "filtergot-remove");
        });
        return $(".add-got").text("Add");
      }
    });
    $('.add-mm').click(function(e) {
      e.preventDefault();
      if ($('.add-mm').text() === "Add") {
        mixpanel.track("Man Men Filter Added");
        chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "filtermm-add");
        });
        return $(".add-mm").text("Remove");
      } else {
        mixpanel.track("Mad Men Filter Removed");
        chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "filtermm-remove");
        });
        return $(".add-mm").text("Add");
      }
    });
    $('.add-ad').click(function(e) {
      e.preventDefault();
      if ($('.add-ad').text() === "Add") {
        mixpanel.track("Arrested Development Filter Added");
        chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "filterad-add");
        });
        return $(".add-ad").text("Remove");
      } else {
        mixpanel.track("Arrested Development Filter Removed");
        chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "filterad-remove");
        });
        return $(".add-ad").text("Add");
      }
    });
    return $('.add-nba').click(function(e) {
      e.preventDefault();
      if ($('.add-nba').text() === "Add") {
        mixpanel.track("NBA Finals Filter Added");
        chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "filternba-add");
        });
        return $(".add-nba").text("Remove");
      } else {
        mixpanel.track("NBA Finals Filter Removed");
        chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "filternba-remove");
        });
        return $(".add-nba").text("Add");
      }
    });
  });

}).call(this);

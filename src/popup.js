// Generated by CoffeeScript 1.5.0
(function() {

  $(function() {
    var newTerm,
      _this = this;
    newTerm = function() {
      return $('.term-to-submit').val();
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
        var child, term, terms, _i, _j, _len, _len1, _ref;
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
          $(child).wrapInner("<a href='#' class='remove-term'></a>");
        }
        return mixpanel.track('Silencer Opened');
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
    $('.add-got').click(function(e) {
      debugger;      e.preventDefault();
      if ($('.add-got').text() === "Add") {
        mixpanel.track("GoT Filter Added");
        chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "filtergot-add", function(response) {
            return console.log("");
          });
        });
        return $(".add-got").text("Remove");
      } else {
        mixpanel.track("GoT Filter Removed");
        chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "filtergot-remove", function(response) {
            return console.log("");
          });
        });
        return $(".add-got").text("Add");
      }
    });
    return $('.add-mm').click(function(e) {
      e.preventDefault();
      if ($('.add-mm').text() === "Add") {
        mixpanel.track("Man Men Filter Added");
        chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "filtermm-add", function(response) {
            return console.log("");
          });
        });
        return $(".add-mm").text("Remove");
      } else {
        mixpanel.track("Mad Men Filter Removed");
        chrome.tabs.query({
          "active": true,
          "currentWindow": true
        }, function(tab) {
          return chrome.tabs.sendMessage(tab[0].id, "filtermm-remove", function(response) {
            return console.log("");
          });
        });
        return $(".add-mm").text("Add");
      }
    });
  });

}).call(this);

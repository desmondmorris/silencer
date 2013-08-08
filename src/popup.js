// Generated by CoffeeScript 1.5.0
(function() {

  $(function() {
    var handleCategory, newTerm, setMuteValue,
      _this = this;
    $('.term-to-submit').focus();
    $(".log-in").click(function(e) {
      e.preventDefault();
      return chrome.runtime.sendMessage({
        auth: true
      });
    });
    chrome.runtime.sendMessage({
      checkingForUser: true
    }, function(response) {
      if (response !== false) {
        return $(".log-in").hide();
      }
    });
    newTerm = function() {
      return $('.term-to-submit').val();
    };
    setMuteValue = function(terms) {
      var term, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = terms.length; _i < _len; _i++) {
        term = terms[_i];
        if (term === "gameofthronesfilter") {
          $(".add-got").text("Unmute");
        }
        if (term === "madmenfilter") {
          $(".add-mm").text("Unmute");
        }
        if (term === "arresteddevelopmentfilter") {
          $(".add-ad").text("Unmute");
        }
        if (term === "prettylittleliarsfilter") {
          $(".add-pll").text("Unmute");
        }
        if (term === "truebloodfilter") {
          $(".add-tb").text("Unmute");
        }
        if (term === "royalbabyfilter") {
          $(".add-rb").text("Unmute");
        }
        if (term === "breakingbadfilter") {
          $(".add-bb").text("Unmute");
        }
        if (term === "orangenewblackfilter") {
          $(".add-ointb").text("Unmute");
        }
        if (term === "instagram.com") {
          $(".add-ig").text("Unmute");
        }
        if (term === "getglue") {
          $(".add-glue").text("Unmute");
        }
        if (term === "ask.fm") {
          $(".add-ask").text("Unmute");
        }
        if (term === "vine.co") {
          $(".add-vine").text("Unmute");
        }
        if (term === "4sq.com") {
          $(".add-4sq").text("Unmute");
        }
        if (term === "path.com") {
          $(".add-path").text("Unmute");
        }
        if (term === "t.imehop.com") {
          $(".add-th").text("Unmute");
        }
        if (term === "medium.com") {
          $(".add-medium").text("Unmute");
        }
        if (term === "go.nike.com") {
          $(".add-nike").text("Unmute");
        }
        if (term === "cir.ca") {
          $(".add-circa").text("Unmute");
        }
        if (term === "paper.li") {
          _results.push($(".add-paper").text("Unmute"));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    handleCategory = function(event, selector, message, filterName) {
      event.preventDefault();
      if ($(selector).text() === "Mute") {
        mixpanel.track("" + message + " Added");
        chrome.runtime.sendMessage({
          mutePackAdd: true,
          mutePackName: filterName
        });
        return $(selector).text("Unmute");
      } else {
        mixpanel.track("" + message + " Removed");
        chrome.runtime.sendMessage({
          mutePackRemove: true,
          mutePackName: filterName
        });
        return $(selector).text("Mute");
      }
    };
    $('.pack-expander').click(function(e) {
      e.preventDefault();
      if ($('.filter-packs').is(":visible")) {
        return $('.filter-packs').slideUp();
      } else {
        return $('.filter-packs').slideDown();
      }
    });
    $('.my-form').submit(function() {
      newTerm = newTerm().toLowerCase();
      if (newTerm !== "") {
        chrome.runtime.sendMessage({
          addMute: true,
          term: newTerm
        });
        return $(".terms").append($('<li></li>', {
          "class": "term",
          "data-term": "" + newTerm,
          "text": "" + newTerm
        }));
      }
    });
    $('.mute.submit').click(function() {
      $('.term-to-submit').focus();
      newTerm = newTerm().toLowerCase();
      if (newTerm !== "") {
        chrome.runtime.sendMessage({
          addMute: true,
          term: newTerm
        });
        return $(".terms").append($('<li></li>', {
          "class": "term",
          "data-term": "" + newTerm,
          "text": "" + newTerm
        }));
      }
    });
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function(tab) {
      return chrome.runtime.sendMessage({
        mutesRequest: true
      }, function(response) {
        var child, term, _i, _j, _len, _len1, _ref, _ref1;
        if (response.mutes) {
          setMuteValue(response.mutes);
          _ref = response.mutes;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            term = _ref[_i];
            $(".terms").append($('<li></li>', {
              "class": "term",
              "data-term": "" + term,
              "text": "" + term
            }));
          }
          _ref1 = $(".terms").children();
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            child = _ref1[_j];
            $(child).wrapInner("<a href='#' class='remove-term'></a>");
          }
        }
        return mixpanel.track('Silencer Opened');
      });
    });
    $(".terms").on('click', 'li a', (function(e) {
      var term;
      e.preventDefault();
      term = $(e.currentTarget).parent().data("term");
      $(e.currentTarget).parent().slideUp();
      return chrome.runtime.sendMessage({
        removeMute: true,
        term: term
      });
    }));
    /* Adding filters
    */

    $('.add-got').click(function(e) {
      return handleCategory(e, '.add-got', "GoT Filter", "got");
    });
    $('.add-mm').click(function(e) {
      return handleCategory(e, '.add-mm', "Mad Men Filter", "mm");
    });
    $('.add-ad').click(function(e) {
      return handleCategory(e, '.add-ad', "Arrested Development Filter", "ad");
    });
    $('.add-pll').click(function(e) {
      return handleCategory(e, '.add-pll', "Prety Little Liars Filter", "pll");
    });
    $('.add-tb').click(function(e) {
      return handleCategory(e, '.add-tb', "True Blood Filter", "tb");
    });
    $('.add-rb').click(function(e) {
      return handleCategory(e, '.add-rb', "Royal Baby Filter", "rb");
    });
    $('.add-bb').click(function(e) {
      return handleCategory(e, '.add-bb', "Breaking Bad Filter", "bb");
    });
    $('.add-ointb').click(function(e) {
      return handleCategory(e, '.add-ointb', "Orange is the New Black Filter", "ointb");
    });
    $('.add-ig').click(function(e) {
      return handleCategory(e, '.add-ig', "Instagram Mute", "instagram");
    });
    $('.add-ask').click(function(e) {
      return handleCategory(e, '.add-ask', "Ask.fm Mute", "ask");
    });
    $('.add-glue').click(function(e) {
      return handleCategory(e, '.add-glue', "GetGlue Mute", "glue");
    });
    $('.add-vine').click(function(e) {
      return handleCategory(e, '.add-vine', "Vine Mute", "vine");
    });
    $('.add-4sq').click(function(e) {
      return handleCategory(e, '.add-4sq', "Foursquare Mute", "4sq");
    });
    $('.add-path').click(function(e) {
      return handleCategory(e, '.add-path', "Path Mute", "path");
    });
    $('.add-th').click(function(e) {
      return handleCategory(e, '.add-th', "Timehop Mute", "timehop");
    });
    $('.add-medium').click(function(e) {
      return handleCategory(e, '.add-medium', "Medium Mute", "medium");
    });
    $('.add-nike').click(function(e) {
      return handleCategory(e, '.add-nike', "Nike+ Mute", "nike");
    });
    $('.add-circa').click(function(e) {
      return handleCategory(e, '.add-circa', "Circa Mute", "circa");
    });
    return $('.add-paper').click(function(e) {
      return handleCategory(e, '.add-paper', "Paper.li Mute", "paper");
    });
  });

}).call(this);

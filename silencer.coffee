$ ->

  reservedWords = [
    "favorite",
    "like",
    "retweet",
    "reply",
    "view summary",
    "expand",
    "view conversation"
  ]

  filterTerms = [
    "4sq.com",
    "vine.co",
    "@vine",
    "Andrew Hyde",
    "@andrewhyde",
    "#sxsw",
    "#sxsw2013",
    "SXSW",
    "humblebrag",
    "who.unfollowed.me",
    "Pope",
    "Google Reader",
    "Samsung",
    "@ttunguz",
    "chexee"
  ]

  hideChild = (child) ->
    child.hide()

  # addTerm = (newTerm, filterTerms) ->
  #   if filterTerms.indexOf(newTerm.toLowerCase()) == 1
  #     alert "You're already filtering that term"
  #   else 
  #     filterTerms.push(newTerm)

  # removeTerm = (termToBeRemoved, filterTerms) ->
  #   if $(filterTerms).toLowerCase().indexOf(newTerm.toLowerCase()) == 1
  #     filterTerms.

  chrome.extension.onMessage.addListener (message, sender, sendResponse) ->
    sendResponse(filterTerms)

  # for Twitter
  if $(".stream-items").children().length > 0
    tweets = $(".stream-items")
    tweetsArray = tweets.children()
    tweetsLength = tweetsArray.length

    for tweet in tweetsArray
      for term in filterTerms
        if $(tweet).is(":visible")
          if $($(tweet)).text().toLowerCase().indexOf(term.toLowerCase()) > -1 then hideChild($(tweet))


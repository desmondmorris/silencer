base = new Firebase('https://silencerio.firebaseIO.com/users')

currentUser = ->
  if localStorage['silencer']
    return JSON.parse(localStorage['silencer'])
  else
    return false

chrome.runtime.onMessage.addListener( (message, sender, sendResponse) ->
  if message.term
    mixpanel.track("Content Removed From View", { id: "#{message.term}", site: "#{message.site}" })
    sendResponse({note: "term tracked"})

  if message.auth 
    chrome.tabs.create({ url: "http://silencer.io/auth" })

  if message.userInfo
    localStorage.setItem('silencer', "#{message.user}")

  if message.checkingForUser
    sendResponse(currentUser())
)

if currentUser()
  id = parseInt(currentUser().id)

  userBase = base.child("/#{id}")
  userBase.set(currentUser())
var express = require('express')
var pagesObject = require('./pages-object')
var pagesJSON = ''

pagesObject(function (pagesObject) {
  pagesJSON = JSON.stringify(pagesObject)
})

var Routes = function (app) {
  var self = this

  // Serve nice static content from the Bower Components
  app.use('/bower_components', express.static('./bower_components'))
  app.use('/elements', express.static('./web/elements'))

  app.get('/pages.json', function (request, response) {
    response.set('Content-Type', 'application/json')
    response.send(pagesJSON)
  })

  app.get('/pages.js', function (request, response) {
    response.set('Content-Type', 'application/javascript')
    response.send(';pages = ' + pagesJSON + '')
  })

  app.get('/robots.txt', function (request, response) {
    response.sendFile('robots.txt', {
      root: './web'
    })
  })
  app.get('/favicon.ico', function (request, response) {
    response.sendFile('favicon.ico', {
      root: './web'
    })
  })
  app.get('/403', function (request, response) {
    response.sendFile('403.html', {
      root: './web'
    })
  })
  app.get('/404', function (request, response) {
    response.sendFile('404.html', {
      root: './web'
    })
  })

  // Serve the web app on the root route
  app.get('*', function (request, response) {
    response.sendFile('main.html', {
      root: './web'
    })
  })

  return self
}

module.exports = Routes

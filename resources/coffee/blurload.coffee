
Blurload = 

  i: ->

    $('.tiles > .tile > .image.off').each (i, el) ->
      src = $(el).css('background-image').replace(/url\("(.*?)"\)/, "$1")
      image = new Image()
      image.src = src
      image.onload = ->
        _.on el


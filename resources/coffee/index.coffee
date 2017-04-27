Index =

  i: ->
    Blurload.i()

    @handlers()

  handlers: ->

    $('.burger').click @mobile


  mobile: ->

    _.swap '.burger'
    _.swap '.mobile'

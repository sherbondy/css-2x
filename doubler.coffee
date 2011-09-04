fs = require 'fs'
CSSOM = require 'cssom'

two_x = (file_str)->
    parts = file_str.split '.'
    base = parts.slice(0, (parts.length - 1)).join '.'
    base += '@2x.'
    extension = parts.slice -1
    return base + extension

exports.double = (args)->
    console.log args
    for arg in args
        new_file = two_x arg
        console.log new_file

        fs.readFile arg, 'utf8', (err, data)->
            if err then throw err

            sheet = new CSSOM.CSSStyleSheet()
            css = CSSOM.parse data

            for rule in css.cssRules
                if 'background-image' in rule.style
                    selectors = rule.selectorText
                    image = rule.style['background-image']
                    image2x = two_x image

                    sheet.insertRule "#{selectors} {background-image:#{image2x}}"

            output = '@media only screen and (-webkit-min-device-pixel-ratio:2) {\n'
            output += sheet.toString()
            output += '}'

            console.log output

    return 'Done'

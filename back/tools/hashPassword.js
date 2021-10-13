const bcrypt = require('bcrypt')

const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lower = 'abcdefghijklmnopqrstuvwxyz'
const digit = '0123456789'
const all = upper + lower + digit

function rand(max) {
    return Math.floor(Math.random() * max)
}

function random(set) {
    return set[rand(set.length - 1)]
}

function generate(length, set) {
    var result = []
    while (length--) result.push(random(set))
    return result
}

function shuffle(arr) {
    var result = []

    while (arr.length) {
        result = result.concat(arr.splice(rand[arr.length - 1]))
    }

    return result
}

function password(length) {
    var result = []

    result = result.concat(generate(1, upper)) // 1 upper case
    result = result.concat(generate(1, lower)) // 1 lower case
    result = result.concat(generate(1, digit)) // 1 digit
    result = result.concat(generate(length - 3, all)) // remaining - whatever

    return shuffle(result).join('')
}

const pass = process.argv[2] || password(10)

bcrypt.hash(pass, 10).then((hash) => {
    console.log('Password: ', pass)
    console.log('Hash: ', hash)
})

const argued = check => process.argv.indexOf(check) > -1
console.log(!argued('-skip'))
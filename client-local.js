const hb = require('handlebars');
const fs = require('fs');
const index = fs.readFileSync('./index.hbs', {encoding: 'utf8'});

const ct = hb.compile(index);
const state = {
    name: 'World',
    adj: 'beautiful'
};
const data = {
    data: JSON.stringify(state),
    content: '',
    title: 'Hello world!'
};
fs.writeFileSync('./index.html', ct(data), {encoding: 'utf8'});

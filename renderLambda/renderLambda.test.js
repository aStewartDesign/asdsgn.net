const {renderLambda} = require('./dest/renderLambda.js');
renderLambda({}, {}, (err, res) => {
    console.log('Any errors?');
    console.log(err);
    console.log('Response:');
    console.log(res);
});

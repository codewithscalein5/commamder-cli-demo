const express = require('express')
const app = express()
const fs = require('fs');

function recordAPIDocs (req, res, next) {
    manageAPIDocs(req.originalUrl, "add");
    next();
}

app.use(recordAPIDocs)

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/describe-good-animals', function (req, res) {
    res.send({
        "henry": "a nice little cow!",
        "murfy": "young tortoise!"
    })
});

app.get('/get-all-animals', function (req, res) {
    res.send({
        "sam": "a good old cat",
        "alex": "my lovely parrot",
        "henry": "a nice little cow!",
        "murfy": "young tortoise!"
    })
});

app.get('*', function(req, res, next){
    manageAPIDocs(req.originalUrl, "delete")
    next();
});
const port = 3000
app.listen(port)


const manageAPIDocs = (route, type, description = null) => {
    let rawdata = fs.readFileSync('apidocs.json');
    let apiJSON = JSON.parse(rawdata); 
    // for adding new APIs in documentation.
    if (type === "add") {
        if(! (route in apiJSON)) {
            let newApiJSON = { ...apiJSON };
            newApiJSON[route] = "No information available for this API!";
            fs.writeFileSync("apidocs.json", JSON.stringify(newApiJSON));
        }
    }
    // for removing 404 APIs from documentation.
    if (type === "delete") {
        if((route in apiJSON)) {
            delete apiJSON[route]
            fs.writeFileSync("apidocs.json", JSON.stringify(apiJSON));
        }
    }
    // list all APIs.
    if(type === "list") {
        console.log('All Valid APIs are : \n', Object.keys(apiJSON).join('\n'))
    }
    // Explain APIs.
    if(type === "explain") {
        const apiList = route.split(',');
        apiList.forEach(api => {
            console.log(`${api} :  ${apiJSON[api] ? apiJSON[api] : "No such API available!"}`);
        });
    }
}

module.exports = {
    manageAPIDocs,
    port
}
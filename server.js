
// Started: April 27, 2018

const express = require('express');
const fs = require('fs');
const handlebars = require('express-handlebars');

let app = express();

app.set('views', __dirname + '/views');
app.engine('handlebars', handlebars({ defaultLayout: 'layout',
  helpers: {
    getCurrentYear: ()=>{
      return new Date().getFullYear();
    },

    screamIt: (text)=>{
      return text.toUpperCase();
    }
  }
}));
app.set('view engine', 'handlebars');

app.use((req, res, next)=>{
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);

  fs.appendFile('server.log', log + '\n', (err)=>{
    if(err){
      console.log('Unable to append to server.log.');
    }
  });

  next();
});

app.use((req, res, next)=>{
  res.render('maintenance');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=>{
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the home page',
  })
});

app.get('/about', (req, res)=>{
  res.render('about', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res)=>{
  res.send({
    errorMsg: 'Unable to fulfill this request'
  });
});


app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
});
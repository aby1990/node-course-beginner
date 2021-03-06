const express = new require('express');
const hbs = new require('hbs');
const fs = new require('fs');

const app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');


app.use((req, res, next)=>{
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('Unable to handle request');
        }
    })
    next()
});

// app.use((req, res, next)=>{
//     res.render('maintainence.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req, res)=>{
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
        pageTitle:'Welcome Page',
        welcomeMessage:'Welcome Page'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page'
    });
})

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to handle request'
    });
})

app.listen(3000,()=>{
    console.log('Server is up on 3000');
});

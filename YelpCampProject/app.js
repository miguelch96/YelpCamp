var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);
//app.use('/users', users);

/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

var campgrounds = [
    {name: "Titicaca", image: "https://www.peru.travel/Portals/_default/que-hacer/naturaleza/lago-titicaca/img_one_lago_titicaca_pp_ra.jpg"},
    {name: "Pampas Galeras", image: "https://img.elcomercio.pe/files/ec_article_multimedia_gallery/uploads/2017/09/06/59b05c30543ad.jpeg"},
    {name: "Machu Picchu", image: "https://lonelyplanetimages.imgix.net/mastheads/16641625.jpg?sharp=10&vib=20&w=1200"},
    {name: "Titicaca", image: "https://www.peru.travel/Portals/_default/que-hacer/naturaleza/lago-titicaca/img_one_lago_titicaca_pp_ra.jpg"},
    {name: "Pampas Galeras", image: "https://img.elcomercio.pe/files/ec_article_multimedia_gallery/uploads/2017/09/06/59b05c30543ad.jpeg"},
    {name: "Machu Picchu", image: "https://lonelyplanetimages.imgix.net/mastheads/16641625.jpg?sharp=10&vib=20&w=1200"},
    {name: "Titicaca", image: "https://www.peru.travel/Portals/_default/que-hacer/naturaleza/lago-titicaca/img_one_lago_titicaca_pp_ra.jpg"},
    {name: "Pampas Galeras", image: "https://img.elcomercio.pe/files/ec_article_multimedia_gallery/uploads/2017/09/06/59b05c30543ad.jpeg"},
    {name: "Machu Picchu", image: "https://lonelyplanetimages.imgix.net/mastheads/16641625.jpg?sharp=10&vib=20&w=1200"}
];

app.get("/",function (req, res) {
    res.render("landing");
});


app.get("/campgrounds",function (req, res) {
    res.render("campgrounds",{campgrounds: campgrounds});
});

app.get("/campgrounds/new",function (req,res) {
    //TODO:
    res.render("newcampground");
});

app.post("/campgrounds",function (req,res) {
    //TODO:
    var name = req.body.campgroundName;
    var image = req.body.campgroundImage;

    campgrounds.push({name: name,image: image });
    res.redirect("/campgrounds");

});

//For invalid routes
app.get("*",function (req,res) {
    res.send("Invalid Route");
});

app.listen("8080","localhost",function () {
    console.log("YelpCamp Started");
});

module.exports = app;

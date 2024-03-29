var express = require("express"),
   app = express(),
   {google} = require("googleapis");
   bodyParser = require("body-parser"),
   methodOverride = require("method-override"),
   aos = require("aos"),
   nodemailer = require("nodemailer"),
   flash = require("connect-flash");

require('dotenv').config();

const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });


// Setting Port
const PORT = process.env.PORT || 3000;

app.use(require("express-session")({
   secret: "ONE AGAIN RUSTY WINS CUTEST DOG",
   resave: false,
   saveUninitialized: false
}));

// setting packages
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(flash());
app.use(express.urlencoded({
   extended: true
}));
app.use(express.static(__dirname + "/public/"));
app.use(methodOverride("_method"));
//adding current user info
app.use((req,res,next)=>{
   res.locals.currentUser=req.user;
   res.locals.success = req.flash("success");
   res.locals.error= req.flash("error");
   next();
});

var portfolioImage = [
   "assets/images/logo-d-2.png",
   "assets/images/logo-d-1.png",
   "assets/images/logo-d-3.png",
   "assets/images/logo-d-4.png",
   "assets/images/logo-d-5.png",
   "assets/images/logo-d-7.png"
]

var portfolioLink = [
   "https://riwaazweddings.com",
   "https://shivalaymandir.com",
   "https://nubooks.io",
   "https://propertygoals.in",
   "https://pawanmehandi.in",
   "https://reveuse.one"
]

var portfolio = [
   "Riwaaz Weddings",
   "Shiv Mandir Rohtak",
   "NuBooks",
   "Property Goals",
   "Pawan Mehndi",
   "Reveuse",
]

// getting Home page
app.get("/", (req, res) => {
   res.render("index", { portfolio: portfolio, portfolioImage: portfolioImage, portfolioLink: portfolioLink });
})

app.post("/contact-us", (req, res) => {
   const accessToken = oAuth2Client.getAccessToken();
   var smtpTransport = nodemailer.createTransport({
      // host: "smtp.hostinger.com",
      // port: 465,
      // secure: true,
      service: 'gmail',  
      auth: {
         type: 'OAuth2',
         user: process.env.email2,
         // pass: process.env.pass2,
         clientId : process.env.CLIENT_ID,
         clientSecret: process.env.CLIENT_SECRET,
         refreshToken: process.env.REFRESH_TOKEN,
         accessToken: process.env.accessToken
      }
   });
   console.log(process.env.CLIENT_ID);
   console.log(process.env.CLIENT_SECRET);
   console.log(process.env.REFRESH_TOKEN);
   console.log(process.env.accessToken);
   var mailOptions = {
      to: process.env.email1,
      from: process.env.email1,
      subject: 'Mail DMH: ' + req.body.email,
      html: '<h3>Business Name: ' + req.body.businessName + '<br> Full Name: ' + req.body.name + '<br>Email: ' + req.body.email + '<br>Phone Number: ' + req.body.Phone + '<br>Address: ' + req.body.address + '<br>Message: ' + req.body.message + '.</h3>'
   };
   smtpTransport.sendMail(mailOptions, function (err) {
      if (err) {
         console.log(err);
         req.flash("error", "It's not you, it's us. Some error had occur. Please try later. If you want to contact us now, Click below button.")
         res.redirect("/");
      } else {
         req.flash("success", "Your form is submitted. Our experts will contact you soon. If you want to contact us now, Click below button.")
         res.redirect("/");
      }
   });
});


// getting About-Us page
app.get("/about-us", (req, res) => {
   res.render("about");
})

// getting Services page
app.get("/services", (req, res) => {
   res.render("service");
})

// getting FAQ page
app.get("/faqs", (req, res) => {
   res.render("faqs");
})

// getting privacy-policy page
app.get("/privacy-policy", (req, res) => {
   res.render("privacy-policy");
})

// getting disclaimer page
app.get("/disclaimer", (req, res) => {
   res.render("disclaimer");
})

// getting t&c page
app.get("/t&c", (req, res) => {
   res.render("t&c");
})
// getting Contact-Us page
app.get("/contact-us", (req, res) => {
   res.render("contact");
})

// getting sitemap page
app.get("/sitemap.xml", (req, res) => {
   res.sendFile("sitemap.xml", { root: '.' });
})

// getting robots.txt page
app.get("/robots.txt", (req, res) => {
   res.sendFile("robots.txt", { root: '.' });
})

// for error page
app.get("*", (req, res) => {
   res.render("error");
})

// Starting Port
app.listen(PORT, () => {
   console.log(`The Server Started at Port ${PORT}`);
});
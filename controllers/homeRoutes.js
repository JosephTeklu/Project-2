const router = require("express").Router();
const { User, Url } = require("../models");
const withAuth = require("../utils/auth");

//router.get("/", async (req, res) => {});

//router.get("/login", async (req, res) => {
 /// if (req.session.logged_in) {
//    res.redirect("homepage");
 // return;
 //}
//  res.render("login");
//});

router.get('/', async (req, res) => {
try{ 
  const urlData = await Url.findAll({
    include: [
      {
        model: User,
        attributes: ['user_name'],
      },
    ],
  });

  const urls = urlData.map((url) => url.get({plain: true}));

  res.render('homepage', {
    urls,
    logged_in: req.session.logged_in
  });
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/url/:id', async (req, res) => {
try {
  const urlData = await Url.findByPk(req.params.id, {
    include: [
      {
      model: User,
      attributes: ['user_name'],
      },
    ],
  });

  const url = urlData.get({ plain: true });

  res.render('homepage', {
    ...url,
    logged_in: req.session.logged_in
  });
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/homepage', withAuth, async (req,res) => {
  try{
    constuserData = await User.findbyPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{model: Url}],
    });

    const user = userData.get({plain:true});

    res.render('homepage', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req,res) => {
 if (req.session.logged_in) {
   res.redirect('/homepage');
   return;
 }

  res.render('login');
});

router.get('/signup', (req, res) => {
  res.render('signup')
});

router.get('/mylinks', (req, res) => {
  res.render('mylinks')
});

module.exports = router;

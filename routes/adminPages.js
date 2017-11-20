var express = require('express');
var router = express.Router();

/** Get Pages Index **/
router.get('/',function(req,res){
    res.send('admin area');
});

/** GET add Page **/
router.get('/add-page',function(req,res){
    var title = "";
    var slug = "";
    var content = "";

    res.render('admin/add_page',{
       title: title,
       slug:slug,
       content:content
    })
});

//Exports
module.exports = router;
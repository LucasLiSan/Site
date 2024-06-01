import express from "express";
const router = express.Router();

router.get('/guias', function(req,res){
    const loggedOut = !user;
    res.render("guias", {
        loggedOut: loggedOut,
    });
});

export default router;
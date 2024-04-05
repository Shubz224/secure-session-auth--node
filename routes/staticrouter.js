import express from "express";

const router = express.Router();
import URL from  "../models/url.js"

router.get("/", async (req,res)=>{
    const allurls =  await URL.find({});
    return res.render('home',{
        urls:allurls,
    });
});

router.get("/signup" , (req,res)=>{
    return res.render("signup");
})

router.get("/login",(req,res)=>{
    return res.render("login");
})

export default router ;
   import User from "../models/user.js"
  import { setUser } from "../services/auth.js";

   export  async function handleusersignup(req,res){
      const{name,email,password} = req.body;
      await User.create ({
         name,
         email,
         password,
      });
      return  res.render("home");
   }


   export async function handleuserlogin(req,res){
        const {email,password} =req.body;
        const user = await User.findOne({email,password});
        if(!user) return res.render("login",{

         error:"Invalid email or Password",

        });

        const token  = setUser(user);
        res.cookie("uid",token);
        return res.redirect("/");

   }
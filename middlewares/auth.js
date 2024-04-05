import { getUser } from "../services/auth.js";


export async function restrictologinuseronly(req,res,next){
 const useruId = req.cookies?.uid;

 if(!useruId) return res.redirect("/login");
  const user = await getUser(useruId);
  if(!user)return res.redirect("/login");

  req.user = user; 
  next();
}




const cust_auth =  (req,res,next) =>{

        try{
            console.log("HALLELUJA")
            console.log(req.body.auth_user)
            if(req.body.auth_user === "customer")
            {
                next();
            }
            else
            {
                throw new Error();
            }
        }
        catch(err)
        {
            res.status(401).send("Not Authorised for this action");
        }
}


const rest_auth =  (req,res,next) =>{

    try{
        if(req.body.auth_user === "restaurant")
        {
            next();
        }
        else
        {
            throw new Error();
        }
    }
    catch(err)
    {
        res.status(401).send("Not Authorised for this action");
    }

}

exports.module = {cust_auth,rest_auth}

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//CREATE THE MIDDLEWARE FOR THE PARSING REQUEST
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//define to the server that the static files are stored inside the public folder

app.use(express.static('public'));

//defining the route for home page 
app.get('/',(req,res)=>{

    res.sendFile(__dirname+'/public/send-email.html');

});

//configure nodemailer
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:'kumarishikha9922@gmail.com',  //your particulaer mail
        pass:'zswg jrda nfqm xahh'
      }
    });

    //CREATE THE route for the form 
app.post('/send-email',(req,re)=>{
    const {to,subject,text} =req.body;

    const mailOptions = {
        to,
        subject,
        text
    };
    transporter.sendMail(mailOptions,(error,infor)=>{
        if(error){
            console.error(error);
            res.status(500).send('error in sending mail');
    
        }
        else{
            console.log('email sent:'+ infor.response);
           //res.send('email sent successfully');
           res.status(200).send({message:"Mail send", message_id:info.message});

        }
    });
    
    
});



// start the server with specific path

app.listen(port,()=>{
    console.log(`server is running on port${port}`)
});



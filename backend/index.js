const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");

app.use(express.json());
app.use(cors());

// Conexão banco de dados MONGODB

mongoose.connect("mongodb+srv://asapdev:Sam.samela321%40@cluster0.cskla.mongodb.net/loja")

// CRIANDO API

app.get("/",(req, res)=>{
    res.send("Express App está funcionando")
})

// Armazenamento de Imagem

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// criando endpoint de upload  para imagens

app.use('/images', express.static('upload/images'))

app.post("/upload", upload.single('product'), (req, res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


// Schema for Creating Products

const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,

    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    avilable:{
        type:Boolean,
        default:true,
    }
})

app.post('/addproduct', async(req,res)=>{
    let products = await Product.find({}); 
    let id;
    if (products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    } else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Salvo");
    res.json({
        success:true,
        name:req.body.name,
    })
    
})

// Criando API para deletar produtos

app.post('/removeproduct', async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removido");
    res.json({
        success:true,
        name:req.body.name
    })
    
})

// Criando API para ter todos os produtos
app.get('/allproducts', async(req, res)=>{
    let products = await Product.find({});
    console.log("Mostrando todos os produtos");
    res.send(products);
})

// criando esquema de usuario

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

//Criando Endpoint para registrar o usuário
app.post('/signup',async(req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,errors:" Já existe um usuário com este email"})
    }
    let cart = {};
    for (let i = 0; i <300; i++) {
        cart[i]=0;
        
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }
    
    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true, token})

})

// Criando endpoint para login de usuario

app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true, token});
        }
        else{
            res.json({success:false,errors:"Senha Incorreta"});
        }
    }
    else{
        res.json({success:false,errors:"Email Incorreto"})
    }
})

// criando endpoint para newcollection

app.get('/newcollections',async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection fetched");
    res.send(newcollection);
    
})

// criando endpoint para populares em tenis
app.get('/popularintenis',async (req,res)=>{
    let products = await Product.find({category:"tenis"});
    let popular_in_tenis = products.slice(0,4);
    console.log("Mostrando popular em tenis");
    res.send(popular_in_tenis);
    
})

// criando middleware para mostrar usario

    const fetchUser = async (req,res,next)=>{
        const token = req.header('auth-token');
        if (!token) {
            res.status(401).send({errors:"Por favor, autentique usando um token válido"})
        }
        else{
            try {
                const data = jwt.verify(token,'secret_ecom');
                req.user = data.user;
                next();
            } catch (error) {
                res.status(401).send({errors:"por favor, autentique usando um token válido"})
            }
        }
    }

// criando end point para adicionar pordutos no carrinho

app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("Adicionado", req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});    
    res.send("Adicionado")
})

// criando endpoint para remover produtos do carrinho
app.post('/removefromcart',fetchUser,async (req,res)=>{
    console.log("Removido", req.body.itemId);
    
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});    
    res.send("Removido")
})

// criando endpoint para ter o carrinho

app.post('/getcart', fetchUser,async (req,res)=>{
    console.log("Mostrar carrinho")
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);

})

app.listen(port, (error) => {
    if (!error) {
        console.log("Servidor rodando na porta " +port)
    }
    else{
        console.log("Erro : "+error)
    }
})
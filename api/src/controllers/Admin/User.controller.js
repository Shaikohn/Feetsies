const { where } = require('sequelize');
const {
    User,
    Cart_item,
    Product
} = require('../../db');

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function addUser(req, res) {
    if (
        !req.body.email ||
        !req.body.password
        )
    return res.status(400).send(badReq);
    let newRow = {
        email:req.body.email,
        password:req.body.password,
        phone_number:req.body.phone_number,
        location:req.body.location
    }
    try {
        let user = await User.create(newRow)
        if(!user) return res.status(500).send({err:'An error ocurred while creating user...'});
        let log = user.createCart({});
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

async function deleteUser(req, res) {
    if (!req.params.id) return res.status(400).send(badReq);
    try {
        let user = await User.destroy({where:{id:req.params.id}})
        if(!user) return res.status(404).send(notFound);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function updateUser(req, res) {
    let {id, email, password,phone_number,location} = req.body
    try {
        let user = await User.findOne({
            where: {
                id: id
            }
        })
        if(user.length === 0 || !user) {
            return res.status(404).send(notFoundVar)
        } else {
            if(email)user.email = email
            if(password)user.password = password
            if(phone_number)user.phone_number = phone_number
            if(location)user.location = location
            user.save()
            return res.status(200).send('User Updated.')
        }
    } catch (error) {
        return res.status(500).send(errorVar)
    }
}

async function getUserDetail(req, res) {
    if (!req.params.id) return res.status(400).send(badReq);
    try {
        let user = await User.findOne({where:{id:req.params.id}})
        if(!user) return res.status(404).send(notFound);
        result = {
                id:user.dataValues.id,
                email:user.dataValues.email,
                phoneNumber:user.dataValues.phone_number,
                location:user.dataValues.location,
        }
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function getCart(req, res) {
    if (!req.params.id) return res.status(400).send(badReq);
    try {
        let cartItems = await Cart_item.findAll({where:{userId:req.params.id}})
        //console.log('cart items', cartItems);
        if(!cartItems) return res.status(404).send({err:'There are no items in your cart!'});
        let items = [];
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            let product = await Product.findByPk(cartItems[i].dataValues.productId)
            //console.log(product.dataValues);
            let obj = {}
            obj.cartItemid = cartItems[i].dataValues.id;
            obj.name = product.dataValues.name;
            obj.price = product.dataValues.price * cartItems[i].dataValues.quantity;
            obj.quantity = cartItems[i].dataValues.quantity;
            total +=product.dataValues.price * cartItems[i].dataValues.quantity;
            items.push(obj)
        }
        let answer = {items,total};
        return res.status(200).send(answer);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function deleteOneFromCart(req, res) {
    if (!req.params.id) return res.status(400).send(badReq);
    try {
        console.log(req.params.id)
        let cartItem = await Cart_item.destroy({where:{id:req.params.id}})
        return res.sendStatus(200);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function deleteWholeCart(req, res) {
    if (!req.params.id) return res.status(400).send(badReq);
    try {
        let cartItems = await Cart_item.destroy({where:{userId:req.params.id}})
        return res.sendStatus(200);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}//



module.exports={
    addUser,
    deleteOneFromCart,
    deleteUser,
    deleteWholeCart,
    getUserDetail,
    getCart,
    updateUser,
}
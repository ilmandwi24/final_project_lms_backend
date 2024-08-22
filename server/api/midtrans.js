const router = require('express').Router();

const MidtransHelper = require('../helpers/MidtransHelper');

const getToken = async (req, res) => {
    try {
        // get data from json
        const data = await MidtransHelper.getToken(req);
        // console.log(data,"api midtrans")
        // return response success
        return res.send({"token":data});
    } catch (error) {
        // return response error
        console.log(error)
        return res.send(error);
    }
}       

router.post('/midtrans/get-token', getToken);

module.exports = router;
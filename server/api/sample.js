const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
const SampleHelper = require('../helpers/SampleHelper');
const ValidationHelper = require('../helpers/ValidationHelper');

const getListPhonebook = async (req, res) => {
  try {
    // get data from json
    const data = await SampleHelper.getAllList();
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['PhoneBook', 'Get List Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const addPhonebook = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.phoneBookValidation(req.body);
    // get data from json
    const data = await SampleHelper.addPhonebook(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['PhoneBook', 'Add Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const editPhonebook = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.phoneBookValidation(req.body);
    // get data from json
    const data = await SampleHelper.editPhonebook(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['PhoneBook', 'Edit Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const deletePhonebook = async (req, res) => {
  try {
    // get data from json
    const data = await SampleHelper.deletePhonebook(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['PhoneBook', 'Delete Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const getListPhonebookV2 = async (req, res) => {
  try {
    // get data from json
    const data = await SampleHelper.getAllListV2();
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['PhoneBook', 'Get List Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const addPhonebookV2 = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.phoneBookValidation(req.body);
    // get data from json
    const data = await SampleHelper.addPhonebookV2(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['PhoneBook', 'Add Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const editPhonebookV2 = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.phoneBookValidation(req.body);
    // get data from json
    const data = await SampleHelper.editPhonebookV2(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['PhoneBook', 'Edit Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const deletePhonebookV2 = async (req, res) => {
  try {
    // get data from json
    const data = await SampleHelper.deletePhonebookV2(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['PhoneBook', 'Delete Phonebook', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const recomendationAnime = async (req, res) => {
  try {
    // get data from json
    const data = await SampleHelper.getRecomendationAnime();
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Country List', 'Get Country List', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transactionid
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

// sample redis
router.get('/v1/anime/recomendation', CommonHelper.preHandler, recomendationAnime);

// sample CRUD with sql
router.get('/v1/phonebook', CommonHelper.preHandler, getListPhonebook);
router.post('/v1/phonebook', CommonHelper.preHandler, addPhonebook);
router.put('/v1/phonebook/:id', CommonHelper.preHandler, editPhonebook);
router.delete('/v1/phonebook/:id', CommonHelper.preHandler, deletePhonebook);

// sample CRUD with ORM prisma
router.get('/v2/phonebook/', CommonHelper.preHandler, getListPhonebookV2);
router.post('/v2/phonebook/', CommonHelper.preHandler, addPhonebookV2);
router.put('/v2/phonebook/:id', CommonHelper.preHandler, editPhonebookV2);
router.delete('/v2/phonebook/:id', CommonHelper.preHandler, deletePhonebookV2);

module.exports = router;

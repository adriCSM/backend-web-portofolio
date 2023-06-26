const admin = require('../Model/admin');

const moment = require('moment');
const tanggal = moment().format('DD MMMM YYYY, h:mm:ss a');
const bcrypt = require('bcrypt');

const addAdmin = async (req, res, next) => {
  // creat admin
  const data = await admin.findOne();
  if (!data) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash('mangidi7', salt);
    const response = await admin.insertMany({ createdAt: tanggal, password: hashPassword });
    if (!response) {
      res.status(500).json({ message: 'Gagal menambahkan admin' });
    }
    req.admin = response;
    // data ini akan dikirimi ke req.admin (admin boleh diganti dgn nama apapun) dan dapat kita akses pada middleware berikunyta
    next();
  } else {
    const response = await admin.findOne();
    req.admin = response;
    // object req.admin akan bernilai data (admin boleh diganti dgn nama apapun) dan dapat kita akses pada middleware berikunyta
    next();
  }
};

module.exports = addAdmin;

const bcrypt = require('bcrypt');

module.exports = class {
  /**--------login */
  static async login(req, res) {
    const { name, password } = req.body;
    try {
      if (!name) {
        return res.status(400).json({ message: 'Username kosong' });
      }
      if (!password) {
        return res.status(400).json({ message: 'Password kosong' });
      }
      if (name != req.admin.name) {
        return res.status(400).json({ message: 'Username tidak ditemukan' });
      }
      const cekPassword = await bcrypt.compare(password, req.admin.password);
      if (!cekPassword) {
        return res.status(400).json({ message: 'Password salah' });
      }
      return res.status(200).json({ message: 'Login berhsail' });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }
};

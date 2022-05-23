const pool = require("../database");
const jwt_decode = require('jwt-decode')

const doGetAllAccounts = async (req, res) => {
  const accounts = await pool.query("SELECT * FROM accounts");
  res.render("accounts/listAccounts", { accounts });
};

const doGetInsertAccount = async (req, res) => {
  res.send("accounts/insert");
};

const generateAccountNumber = () => {
  let num = "";
  while (num.length < 6) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
};

const getAccBalance = async (req, res) => {
  const { id } = req.params;
  const balance = await pool.query("SELECT * FROM accounts WHERE id_client=?", [
    id,
  ]);
  console.log("balance", balance);
  res.status(200).json({ balance: balance[0] });
};

const doPostInsertAccount = async (req, res) => {
  const token = req.headers.authorization
  const decoded = jwt_decode(token.slice(7, -1))

  const client = await pool.query(
    'SELECT * FROM clients WHERE id=?',
    [decoded.id]
  )
  const { balance = 0, id_account_type, id_client = client[0].id } = req.body;
  let account_number = generateAccountNumber();
  const newAccount = {
    account_number,
    balance,
    id_account_type,
    id_client,
  };
  await pool.query("INSERT INTO accounts set ?", [newAccount]);
  res.status(200).json({ message: 'Account Insert successfully'})
}

const doGetEditAccount = async (req, res) => {
  const { id } = req.params;
  const accounts = await pool.query("SELECT * FROM accounts WHERE id=?", [id]);
  res.render("accounts/edit", { accounts: accounts[0] });
};

const doPostEditAccount = async (req, res) => {
  const { id } = req.params;
  const { account_number, balance, type_account, id_client } = req.body;
  const newAccount = {
    account_number,
    balance,
    type_account,
    id_client,
  };
  await pool.query("UPDATE accounts set ? WHERE id=?", [newAccount, id]);
  res.redirect("/accounts");
};

const doGetDeleteAccount = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM accounts WHERE id=?", [id]);
  res.redirect("/accounts");
};

module.exports = {
  doGetAllAccounts,
  doGetInsertAccount,
  doGetEditAccount,
  doGetDeleteAccount,
  doPostInsertAccount,
  doPostEditAccount,
  getAccBalance,
};

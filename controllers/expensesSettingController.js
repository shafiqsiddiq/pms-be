import expensesData from "../models/expensesSettings.js";

export const createExpenses =  (req, res) => {
  let expens = req.body;
  let data = new expensesData(expens);
  data.save()
  res.send(data);
};
export const getExpenses = async (req, res) => {
  let data = await expensesData.find();
  res.send(data[0]);
};
export const editExpense = async (req, res) => {
  let data = await expensesData.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        dollarRate: req.body.dollarRate,
        resourceExpenses: req.body.resourceExpenses,
      },
    },
    { new: true }
  );
  res.send(data);
};
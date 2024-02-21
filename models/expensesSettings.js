import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema({
  dollarRate: Number,
  resourceExpenses: Number,

});
const expensesData = mongoose.model(
  "expensesettings",
  expenseSchema
);

export default expensesData;
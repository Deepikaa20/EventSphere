const Budget = require("../models/budget");

// 🔥 GET all budgets for an event
exports.getBudget = async (req, res) => {
  try {
    const budgets = await Budget.find({
      eventId: req.params.eventId
    });

    res.json(budgets); // MUST return array
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔥 ADD new budget item
exports.addBudget = async (req, res) => {
  try {
    const budget = new Budget({
      eventId: req.params.eventId,
      title: req.body.title,
      amount: req.body.amount
    });

    await budget.save();
    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const ToDoModel = require("../models/ToDoModel");

module.exports.getTodos = async (req, res) => {
  try {
    const todos = await ToDoModel.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.saveToDo = async (req, res) => {
  try {
    const { toDo } = req.body;
    const data = await ToDoModel.create({ toDo });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.updateToDo = async (req, res) => {
  try {
    const { id } = req.params;
    const { toDo } = req.body;

    const updatedTodo = await ToDoModel.findByIdAndUpdate(
      id,
      { toDo },
      { new: true }
    );

    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.deleteToDo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await ToDoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
      deletedTodo,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


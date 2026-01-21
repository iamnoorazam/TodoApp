const { Router } = require("express");
const {
  getTodos,
  saveToDo,
  updateToDo,
  deleteToDo,
} = require("../controller/TodoController"); // ✅ correct path & imports

const router = Router();

router.get("/get", getTodos);
router.post("/save", saveToDo);
router.put("/update/:id", updateToDo);     // ✅ id added
router.delete("/delete/:id", deleteToDo);  // ✅ id added

module.exports = router;

const Actions = require("../actions/actions-model");

function validateAction(req, res, next) {
  const { project_id, description, notes } = req.body;
  try {
    if (!project_id || !description || !notes) {
      res.status(400).json({ message: "missing required text field" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function validateActionId(req, res, next) {
  const { id } = req.params;
  try {
    const action = await Actions.get(id);
    if (!action) {
      res.status(404).json({ message: `Action ${id} not found` });
    } else {
      req.action = action;
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = { validateAction, validateActionId };

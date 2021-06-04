const router = require("express").Router();
const Actions = require("./actions-model");
const { validateAction, validateActionId } = require("./middleware");

router.get("/", (req, res, next) => {
  Actions.get()
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res, next) => {
  res.json(req.action);
});

router.post("/", validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then(({ id }) => {
      return Actions.get(id);
    })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch(next);
});

router.put(
  "/:id",

  validateActionId,
  validateAction,
  (req, res, next) => {
    const body = req.body;
    Actions.get(req.params.id)
      .then(() => {
        return Actions.update(req.params.id, body);
      })
      .then(() => {
        return Actions.get(req.params.id);
      })
      .then((action) => {
        res.json(action);
      })
      .catch(next);
  }
);

router.delete("/:id", validateActionId, async (req, res, next) => {
  try {
    const result = await Actions.remove(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

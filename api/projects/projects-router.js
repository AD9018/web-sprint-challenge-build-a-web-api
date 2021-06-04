const router = require("express").Router();
const Projects = require("./projects-model");
const {validateProject,validateProjectId} = require("./middleware")




router.get("/", (req, res, next) => {
  Projects.get()
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});


  
  router.get("/:id",  validateProjectId, (req, res, next) => {
   
    res.json(req.project)
      
  });
  
  router.post("/",  validateProject, (req, res, next) => {
    Projects.insert(req.body)
    //   .then(({ id }) => {
    //     return Projects.get(id);
    //   })
      .then((newProject) => {
        res.status(201).json(newProject);
      })
      .catch(next);
  });
  
  router.put(
    "/:id",
    validateProjectId,
    validateProject,
    (req, res, next) => {
      const body = req.body;
      Projects.update(req.params.id, body)
        // .then(() => {
        //   return Projects.get(req.params.id);
        // })
        .then((updatedProject) => res.json(updatedProject))
        .catch(next);
    }
  );
  
  router.delete("/:id",  validateProjectId, async (req, res, next) => {
    try {
      const result = await Projects.remove(req.params.id);
      res.json(result);
    } catch(err){
      next(err)
    }
  });
module.exports = router;
// Write your "projects" router here!

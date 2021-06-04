const router = require("express").Router()
const Projects = require("./projects-model")


router.get("/",  (req, res, next) => {
    const projects = req.body
    Projects.get()
    if(!projects){
        return []
    }else{
      res.json(projects)
    }
    
})

router.get("/:id", (req, res, next) => {
    Projects.get(req.params.id)
    const projects = req.params.id
    if(!projects){
  res.status(404)
    }else{
        
    return Projects.get(projects)
    }
    })
    
  





module.exports = router
// Write your "projects" router here!

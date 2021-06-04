const Projects = require("../projects/projects-model")



 function validateProject (req, res, next) {
     const {name,description} = req.body
try{
if(!name|| !description ){
    res.status(400).json({message:"missing required text field"})
}else{
next()
}
}catch(err){
    next(err)
}
}

async function validateProjectId (req, res, next) {
const {id} = req.params
    try{
    const project = await Projects.get(id)
    if(!project){
        res.status(404).json({message:`Project ${id} not found`})
    }else{
        req.project = project
        next()
    }
}catch(err){
    next(err)

}
}
module.exports = {validateProject,validateProjectId}
const db = require("../models");
const Tutorial = db.tutorials;

//Create and save a new Tutorial
exports.create = (req, res) =>{
    //Validate request
    if(!req.body.title){
        res.status(400).send({ message: "content can not be empty " });
        return;
    }
    
    //Create a tutorial 
    const tutorial = new Tutorial({
        title : req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false

    });

    //Save tutorial in the database
    tutorial
    .save(tutorial)
    .then(data => {
      res.send(data);

    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message ||"Some error occured while creating the tuto "
        });
    });
};

//Retrive all Tutorials from the database
exports.findAll = (req, res) =>{
    const title = req.query.title;
    var condition = title ? { title: {$regex: new RegExp (title), $options: "i" }}:{};

    Tutorial.find(condition)
    .then(data => {
        res.send(data);

    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occureed while retrieving tutoo"
        });
    });
};

//find a single Tutorial with id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
    .then(data =>{
        if (!data)
            res.status(404).send({message:"Not found Tutorial with id " + id});
            else res.send(data);
    })
    .catch(err => {
        res
        .status(500)
        .send({ message: "error retrieving tutorial with id="+ id});

    });

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if(!req.bode) {
        return res.status(400).send({
            message: "data to update can not be empty !"
        });

    }

    const id = req.params.id;

    Tutorial.findByIdAndUpdate(id,req.body,{ useFindAndModify :false })
    .then(data => {
        if (!data){
            res.status(404).send({
                message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
            });

        }else res.send({ message: "Tutorial was update successfully"});

    })
    .catch(err => {
        res.status(500).send({
            message: "error updating tutorial with id="+id
        });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Tutorials were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all tutorials."
        });
      });
  };



//find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };
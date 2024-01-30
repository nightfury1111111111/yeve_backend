const db = require("../models");
const Yeve = db.yeve;

// Create and Save a new Yeve
exports.create = (req, res) => {
  const { address, owner, name, feeType, feeAmount } = req.body
  // Validate request
  if (!address || !owner || !name || !feeType || !feeAmount) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  Yeve.findOne({ address })
    .then(data => {
      if (!data) {
        // Create a Yeve
        const yeve = new Yeve({
          address, owner, name, feeType, feeAmount
        });

        // Save Yeve in the database
        yeve
          .save(yeve)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Yeve."
            });
          });
      } else {
        res.status(400).send({ message: "The address is already existed" });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving yeves."
      });
    });
};

// // Retrieve all Yeves from the database.
exports.findAllByPage = (req, res) => {
  const { pageNum, amount } = req.body;

  if (!pageNum || !amount) {
    res.status(400).send({ message: "Need to input correct value" });
    return;
  }
  // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  try {
    Yeve.find({}).skip((pageNum - 1) * amount).limit(amount)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving yeves."
        });
      });
  } catch (err) {
    res.status(400).send({ message: "Need to input correct value" });
  }
};

exports.findByOwner = (req, res) => {
  const { owner, pageNum, amount } = req.body;

  if (!pageNum || !amount || !owner) {
    res.status(400).send({ message: "Need to input correct value" });
    return;
  }
  // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  try {
    Yeve.find({ owner }).skip((pageNum - 1) * amount).limit(amount)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving yeves."
        });
      });
  } catch (err) {
    res.status(400).send({ message: "Need to input correct value" });
  }
};

// // Find a single Yeve with an id
// exports.findOne = (req, res) => {
//   const id = req.params.id;

//   Yeve.findById(id)
//     .then(data => {
//       if (!data)
//         res.status(404).send({ message: "Not found Yeve with id " + id });
//       else res.send(data);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send({ message: "Error retrieving Yeve with id=" + id });
//     });
// };

// // Update a Yeve by the id in the request
// exports.update = (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update can not be empty!"
//     });
//   }

//   const id = req.params.id;

//   Yeve.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot update Yeve with id=${id}. Maybe Yeve was not found!`
//         });
//       } else res.send({ message: "Yeve was updated successfully." });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error updating Yeve with id=" + id
//       });
//     });
// };

// // Delete a Yeve with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Yeve.findByIdAndRemove(id, { useFindAndModify: false })
//     .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: `Cannot delete Yeve with id=${id}. Maybe Yeve was not found!`
//         });
//       } else {
//         res.send({
//           message: "Yeve was deleted successfully!"
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Could not delete Yeve with id=" + id
//       });
//     });
// };

// // Delete all Yeves from the database.
// exports.deleteAll = (req, res) => {
//   Yeve.deleteMany({})
//     .then(data => {
//       res.send({
//         message: `${data.deletedCount} Yeves were deleted successfully!`
//       });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all yeves."
//       });
//     });
// };

// // Find all published Yeves
// exports.findAllPublished = (req, res) => {
//   Yeve.find({ published: true })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving yeves."
//       });
//     });
// };

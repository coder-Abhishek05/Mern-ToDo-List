// const mongoose = require("mongoose") ;
// const toDoSchema = new mongoose.Schema({
//     toDo:{
//         type: String ,
//         required: true 
//     }
// })

// module.exports = mongoose.model("Todo" , toDoSchema) ;


const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema(
  {
    toDo: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true } // optional: adds createdAt and updatedAt
);

module.exports = mongoose.model("ToDo", ToDoSchema);

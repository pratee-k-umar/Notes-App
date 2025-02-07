import mongoose from "mongoose"

const NoteSchema = mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
  isAudioNode: Boolean
}, {
  timeStamps: true
})

export default mongoose.model("Note", NoteSchema);
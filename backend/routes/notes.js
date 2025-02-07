import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import Note from "../models/Note.js"

const router = express.Router()

router.post('/', authMiddleware, async (req, res) => {
  const { title, content, isAudioNote } =  req.body
  const note = new Note({
    userId: req.user.id,
    title,
    content,
    isAudioNote
  })
  await note.save()
  res.json({ message: "Note Created..." })
})

router.get('/', authMiddleware, async (req, res) => {
  const notes = await Note.find({ userId: req.user.id })
  res.json(notes)
})

router.put('/', authMiddleware, async (req, res) => {
  await Note.findByIdAndUpdate(req.params.id, req.body)
  res.json({ message: "Note Updated..." })
})

router.delete('/', authMiddleware, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  res.json({ message: "Note Deleted..." })
})

export default router
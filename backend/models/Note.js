import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true 
  },
  title: { 
    type: String,
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  isAudio: { 
    type: Boolean, 
    default: false 
  },
  audioTranscription: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  favorite: { 
    type: Boolean, 
    default: false 
  },
  image: { 
    type: String 
  }
}, {
  timestamps: true
});

export default mongoose.model('Note', noteSchema);
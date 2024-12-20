// models/Item.js
import mongoose from 'mongoose';

const parameterSchema = new mongoose.Schema({
  id: String,
  name: String,
  type: {
    type: String,
    enum: ['text', 'number'],
    default: 'text'
  },
  mandatory: {
    type: Boolean,
    default: false
  },
  value: mongoose.Schema.Types.Mixed
});

const processStepSchema = new mongoose.Schema({
  id: Number,
  title: String,
  instructions: String,
  imageUrl1: String,
  imageUrl2: String,
  activeMonitor: {
    type: Number,
    enum: [1, 2],
    default: 1
  },
  parameters: [parameterSchema]
}, {
  _id: false // Prevents duplicate _id fields in subdocuments
});

// Main Project Schema
const projectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  steps: [processStepSchema]
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Indexes for better performance
projectSchema.index({ projectTitle: 1 });
projectSchema.index({ author: 1 });
projectSchema.index({ createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);

export default Project;

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
  timestamps: true
});

// Indexes for better performance
processStepSchema.index({ id: 1 });
processStepSchema.index({ createdAt: -1 });

const Item = mongoose.model('Item', processStepSchema);

export default Item;

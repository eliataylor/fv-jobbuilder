export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: err.message
    });
  }

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({
      error: 'Invalid ID',
      details: 'The provided ID is not valid'
    });
  }

  // Default error
  res.status(500).json({
    error: 'Internal Server Error',
    details: err.message
  });
};

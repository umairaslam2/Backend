const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      enum: ['Wedding', 'Home Construction', 'Business Startup', 'Education'],
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value > 0; // Ensure loan amount is positive
        },
        message: 'Loan amount must be positive',
      },
    },
    repaymentTerm: {
      type: Number, // Number of years
      required: true,
    },
    guarantor: {
      name: { type: String, required: true },
      cnic: { type: String, required: true },
      contact: { type: String, required: true },
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
    appointment: {
      date: { type: Date },
      token: { type: String }, // Token for slip generation
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Loan', loanSchema);

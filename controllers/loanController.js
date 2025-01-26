const Loan = require('../models/Loan');
const QRCode = require('qrcode');

// Submit a Loan Request
exports.submitLoan = async (req, res) => {
  const { category, subcategory, amount, repaymentTerm, guarantor } = req.body;

  try {
    const loan = await Loan.create({
      user: req.user._id,
      category,
      subcategory,
      amount,
      repaymentTerm,
      guarantor,
    });
    res.status(201).json(loan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Loans for a User
exports.getUserLoans = async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user._id });
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get All Loans (with optional filters)
exports.getAllLoans = async (req, res) => {
  try {
    const { status, category } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (category) filter.category = category;

    const loans = await Loan.find(filter).populate('user', 'name email cnic');
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Approve or Reject a Loan
exports.updateLoanStatus = async (req, res) => {
  const { status, appointmentDate } = req.body;

  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: 'Loan not found' });

    loan.status = status;

    // If approved, set appointment details
    if (status === 'Approved' && appointmentDate) {
      loan.appointment = {
        date: appointmentDate,
        token: `TOKEN-${loan._id}`,
      };

      // Generate QR Code
      const qrCode = await QRCode.toDataURL(`Token: ${loan.appointment.token}`);
      loan.appointment.qrCode = qrCode;
    }

    await loan.save();
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

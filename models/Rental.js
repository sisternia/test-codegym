const mongoose = require('mongoose');

// Schema cho phòng trọ
const rentalSchema = new mongoose.Schema({
    roomId: {
        type: String,
        unique: true
    },
    tenantName: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9\s]{5,50}$/,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^\d{10}$/
    },
    startDate: {
        type: String,
        required: true,
        match: /^\d{2}-\d{2}-\d{4}$/
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Theo tháng', 'Theo quý', 'Theo năm']
    },
    note: {
        type: String,
        trim: true
    }
});

// Tự động tạo roomId dạng PT-xxx
rentalSchema.pre('save', async function(next) {
    if (this.isNew) {
        try {
            const lastRental = await this.constructor.findOne().sort({ roomId: -1 });
            let nextId = 1;
            if (lastRental && lastRental.roomId) {
                const lastNumber = parseInt(lastRental.roomId.split('-')[1]);
                nextId = lastNumber + 1;
            }
            this.roomId = `PT-${nextId.toString().padStart(3, '0')}`;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

module.exports = mongoose.model('Rental', rentalSchema);
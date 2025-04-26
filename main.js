const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Rental = require('./models/Rental');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// Phục vụ file từ thư mục routes
app.use('/routes', express.static(path.join(__dirname, 'routes')));

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/rentalDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Route để phục vụ file HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API để lấy danh sách phòng trọ
app.get('/api/rentals', async (req, res) => {
    try {
        const rentals = await Rental.find().sort({ roomId: 1 });
        res.json(rentals);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// API để lấy mã phòng trọ tiếp theo
app.get('/api/next-room-id', async (req, res) => {
    try {
        const lastRental = await Rental.findOne().sort({ roomId: -1 });
        let nextId = 1;
        if (lastRental && lastRental.roomId) {
            const lastNumber = parseInt(lastRental.roomId.split('-')[1]);
            nextId = lastNumber + 1;
        }
        const nextRoomId = `PT-${nextId.toString().padStart(3, '0')}`;
        res.json({ nextRoomId });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// API để tạo mới phòng trọ
app.post('/api/rentals', async (req, res) => {
    try {
        const rentalData = req.body;
        const rental = new Rental(rentalData);
        await rental.save();
        res.status(201).json(rental);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// API để xóa các phòng trọ được chọn
app.delete('/api/rentals', async (req, res) => {
    try {
        const { roomIds } = req.body;
        await Rental.deleteMany({ roomId: { $in: roomIds } });
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
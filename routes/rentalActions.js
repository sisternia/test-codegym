// Hàm lấy dữ liệu từ API và hiển thị
async function fetchRentals() {
    try {
        const response = await fetch('/api/rentals');
        const rentals = await response.json();
        const tbody = document.getElementById('rentalBody');
        tbody.innerHTML = '';
        selectedRooms = []; // Reset danh sách chọn
        document.getElementById('deleteBtn').disabled = true;

        rentals.forEach((rental, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${rental.roomId}</td>
                    <td>${rental.tenantName}</td>
                    <td>${rental.phoneNumber}</td>
                    <td>${rental.startDate}</td>
                    <td>${rental.paymentMethod}</td>
                    <td>${rental.note || ''}</td>
                    <td><input type="checkbox" class="row-checkbox" data-room-id="${rental.roomId}" onchange="updateSelectedRooms()"></td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error fetching rentals:', error);
    }
}

// Hàm lấy mã phòng trọ tiếp theo
async function getNextRoomId() {
    try {
        const response = await fetch('/api/next-room-id');
        const data = await response.json();
        return data.nextRoomId;
    } catch (error) {
        console.error('Error fetching next room ID:', error);
        return 'PT-001'; // Mặc định nếu có lỗi
    }
}

// Hàm cập nhật danh sách phòng được chọn
function updateSelectedRooms() {
    const checkboxes = document.querySelectorAll('.row-checkbox:checked');
    selectedRooms = Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-room-id'));
    const deleteBtn = document.getElementById('deleteBtn');
    deleteBtn.disabled = selectedRooms.length === 0;
}
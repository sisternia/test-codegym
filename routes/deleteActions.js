// Hàm hiển thị popup xác nhận xóa
function showDeleteConfirm() {
    if (selectedRooms.length === 0) return;
    const message = `Bạn có muốn xóa thông tin thuê trọ ${selectedRooms.join(', ')} hay không?`;
    document.getElementById('confirmMessage').textContent = message;
    const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
    confirmModal.show();
}

// Hàm đóng popup xác nhận
function closeConfirmModal() {
    const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmModal'));
    confirmModal.hide();
}

// Hàm xác nhận xóa
async function confirmDelete() {
    try {
        const response = await fetch('/api/rentals', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roomIds: selectedRooms })
        });

        if (response.ok) {
            closeConfirmModal();
            fetchRentals(); // Refresh bảng
        } else {
            alert('Lỗi khi xóa!');
        }
    } catch (error) {
        console.error('Error deleting rentals:', error);
        alert('Lỗi server!');
    }
}
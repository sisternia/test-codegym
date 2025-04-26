// Hàm tìm kiếm (lọc phía client)
function searchRentals() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#rentalBody tr');
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const roomId = cells[1].textContent.toLowerCase(); // Mã phòng trọ
        const tenantName = cells[2].textContent.toLowerCase(); // Tên người thuê trọ
        const phoneNumber = cells[3].textContent.toLowerCase(); // Số điện thoại

        // Kiểm tra nếu input khớp với mã phòng trọ, tên người thuê trọ, hoặc số điện thoại
        const matches = roomId.includes(input) || tenantName.includes(input) || phoneNumber.includes(input);
        row.style.display = matches ? '' : 'none';
    });
}
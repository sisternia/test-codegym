// Hàm mở form tạo mới
async function openCreateForm() {
    // Lấy mã phòng trọ tiếp theo
    const nextRoomId = await getNextRoomId();
    document.getElementById('roomId').value = nextRoomId;

    // Đặt ngày tối thiểu là ngày hiện tại
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0]; // Định dạng yyyy-mm-dd
    document.getElementById('startDate').setAttribute('min', todayStr);

    const createModal = new bootstrap.Modal(document.getElementById('createModal'));
    createModal.show();
    clearErrors();
}

// Hàm đóng form
function closeCreateForm() {
    const createModal = bootstrap.Modal.getInstance(document.getElementById('createModal'));
    createModal.hide();
    resetForm();
}

// Hàm reset form và lỗi
function resetForm() {
    document.getElementById('tenantName').value = '';
    document.getElementById('phoneNumber').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('paymentMethod').value = '';
    document.getElementById('note').value = '';
    clearErrors();
}

// Hàm xóa thông báo lỗi
function clearErrors() {
    document.getElementById('tenantNameError').style.display = 'none';
    document.getElementById('phoneNumberError').style.display = 'none';
    document.getElementById('startDateError').style.display = 'none';
    document.getElementById('paymentMethodError').style.display = 'none';
}

// Hàm validate form
function validateForm() {
    let isValid = true;
    clearErrors();

    // Validate tenantName
    const tenantName = document.getElementById('tenantName').value;
    if (!/^[a-zA-Z0-9\s]{5,50}$/.test(tenantName)) {
        document.getElementById('tenantNameError').style.display = 'block';
        isValid = false;
    }

    // Validate phoneNumber
    const phoneNumber = document.getElementById('phoneNumber').value;
    if (!/^\d{10}$/.test(phoneNumber)) {
        document.getElementById('phoneNumberError').style.display = 'block';
        isValid = false;
    }

    // Validate startDate
    const startDateInput = document.getElementById('startDate');
    const startDate = startDateInput.value;
    if (!startDate) {
        document.getElementById('startDateError').style.display = 'block';
        document.getElementById('startDateError').textContent = 'Vui lòng chọn ngày';
        isValid = false;
    } else {
        // Kiểm tra ngày có nhỏ hơn ngày hiện tại không
        const selectedDate = new Date(startDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00 để so sánh ngày
        if (selectedDate < today) {
            document.getElementById('startDateError').style.display = 'block';
            document.getElementById('startDateError').textContent = 'Không được chọn ngày đã qua';
            isValid = false;
        }
    }

    // Validate paymentMethod
    const paymentMethod = document.getElementById('paymentMethod').value;
    if (!paymentMethod) {
        document.getElementById('paymentMethodError').style.display = 'block';
        isValid = false;
    }

    return isValid;
}

// Hàm submit form
async function submitForm() {
    if (!validateForm()) return;

    const rawStartDate = document.getElementById('startDate').value;
    const formattedStartDate = formatDateToDDMMYYYY(rawStartDate);

    const rentalData = {
        tenantName: document.getElementById('tenantName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        startDate: formattedStartDate,
        paymentMethod: document.getElementById('paymentMethod').value,
        note: document.getElementById('note').value
    };

    try {
        const response = await fetch('/api/rentals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rentalData)
        });

        if (response.ok) {
            closeCreateForm();
            fetchRentals(); // Refresh bảng
        } else {
            alert('Lỗi khi tạo mới!');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Lỗi server!');
    }
}
// Tải các modal từ file HTML và chèn vào placeholder
window.onload = async () => {
    try {
        // Tải Create Modal
        const createModalResponse = await fetch('/createModal.html');
        const createModalHTML = await createModalResponse.text();
        document.getElementById('createModalPlaceholder').innerHTML = createModalHTML;

        // Tải Confirm Modal
        const confirmModalResponse = await fetch('/confirmModal.html');
        const confirmModalHTML = await confirmModalResponse.text();
        document.getElementById('confirmModalPlaceholder').innerHTML = confirmModalHTML;

        // Gọi hàm lấy dữ liệu
        fetchRentals();
    } catch (error) {
        console.error('Error loading modals:', error);
    }
};
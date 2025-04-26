// Hàm định dạng ngày từ yyyy-mm-dd thành dd-mm-yyyy
function formatDateToDDMMYYYY(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}
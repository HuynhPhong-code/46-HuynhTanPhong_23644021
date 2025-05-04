// Hàm tính giá trị số từ chuỗi giá
function parsePrice(price) {
    if (price === "Liên hệ") return 0;
    return parseFloat(price.replace(/[^0-9.]/g, '')) || 0;
}

// Khởi tạo trang
document.addEventListener('DOMContentLoaded', () => {
    // Lấy danh sách đơn hàng từ localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    if (orders.length === 0) {
        alert('Không có đơn hàng nào để hiển thị.');
        window.location.href = 'index.html';
        return;
    }

    // Lấy đơn hàng mới nhất
    const order = orders[orders.length - 1];

    // Điền thông tin hóa đơn
    document.getElementById('order-date').textContent = new Date(order.date).toLocaleString('vi-VN');
    document.getElementById('payment-method').textContent = order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' :
                                                         order.paymentMethod === 'bank' ? 'Chuyển khoản ngân hàng' : 'Momo';
    document.getElementById('customer-name').textContent = order.customer.name;
    document.getElementById('customer-phone').textContent = order.customer.phone;
    document.getElementById('customer-address').textContent = order.customer.address;

    // Điền danh sách sản phẩm
    const productTableBody = document.getElementById('product-table-body');
    let total = 0;
    order.products.forEach(product => {
        const itemTotal = parsePrice(product.price) * product.quantity;
        total += itemTotal;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.title}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td>${itemTotal.toLocaleString('vi-VN')} VNĐ</td>
        `;
        productTableBody.appendChild(row);
    });

    // Cập nhật tổng tiền
    document.getElementById('total-price').textContent = total.toLocaleString('vi-VN') + ' VNĐ';
});
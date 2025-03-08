const filterOrders = (orders, searchTerm) => {
    if (!searchTerm) return orders;

    const term = searchTerm.toLowerCase();
    return orders.filter(order =>
        order.userDetails.companyName.toLowerCase().includes(term) ||
        order.userDetails.phone.toLowerCase().includes(term) ||
        order.userDetails.email.toLowerCase().includes(term)
    );
};

export default filterOrders;

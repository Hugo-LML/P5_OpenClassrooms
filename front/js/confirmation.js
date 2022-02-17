main()

function main()
{
    let myOrder = localStorage.getItem('myOrder');
    let spanOrder = document.getElementById('orderId');
    spanOrder.textContent = myOrder;
    localStorage.removeItem('myOrder');
}
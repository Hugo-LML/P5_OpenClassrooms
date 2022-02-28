main()

// Display the order id
function main()
{
    let urlOrder = (new URL(document.location.href));
    let id = urlOrder.searchParams.get('id');
    let spanOrder = document.getElementById('orderId');
    spanOrder.textContent = id;
}
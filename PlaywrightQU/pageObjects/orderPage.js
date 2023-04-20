class orderPage {
    constructor(page)
    {
        this.page = page;
        this.orderNumMsg = page.locator("[data-id = 'ordernumber']");
    }

    async getOrderNumber()
    {
        const orderMsg = await this.orderNumMsg.textContent();
        const orderNumStr = orderMsg.split(' ')[2];
        const orderNumInt = parseInt(orderNumStr);
        return orderNumInt;
    }

}

module.exports = {orderPage};
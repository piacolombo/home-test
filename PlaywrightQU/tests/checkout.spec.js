const {expect, test} = require('@playwright/test');
const {checkoutPage} = require('../pageObjects/checkoutPage');
const {orderPage} = require('../pageObjects/orderPage');
const dataset = JSON.parse(JSON.stringify(require('../utils/checkoutData.json')));


test.describe('Checkout Suite', () => {
    let CheckoutPage;
    let OrderPage;

    test.beforeEach(async ({page}) => {
        CheckoutPage = new checkoutPage(page);
        OrderPage = new orderPage(page);
        await CheckoutPage.navigateToCheckoutPage();
    });

    test('Checkout Form Order Success', async () => {
        await CheckoutPage.completeAllFields(dataset.fullName, dataset.nameOnCard, dataset.email, dataset.ccNumber, dataset.address, dataset.expMonth, dataset.city, dataset.expYear, dataset.cvv, dataset.state, dataset.zip);
        await CheckoutPage.checkShipping();
        await CheckoutPage.clickContinueToCheckout();
        const orderNum = await OrderPage.getOrderNumber();
        expect(orderNum).toBeGreaterThan(0);
    });

    test('Checkout Form Alert', async ({}) => {
        await CheckoutPage.completeAllFields(dataset.fullName, dataset.nameOnCard, dataset.email, dataset.ccNumber, dataset.address, dataset.expMonth, dataset.city, dataset.expYear, dataset.cvv, dataset.state, dataset.zip);
        await CheckoutPage.uncheckShipping();
        const alertMsg = await CheckoutPage.clickContinueToCheckout();
        expect(alertMsg).toContain('Shipping address same as billing checkbox must be selected.');
        const enabled = await CheckoutPage.continueBtn.isEnabled();
        expect(enabled).toBeTruthy();
    });

    test('Cart Total Test', async ({}) => {
        const sum = await CheckoutPage.getCartSum();
        const total = await CheckoutPage.getTotal();
        expect(sum).toBe(total);
    });

});
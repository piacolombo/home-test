const {expect, test} = require('@playwright/test');
const {gridPage} = require('../pageObjects/gridPage');
const dataset = JSON.parse(JSON.stringify(require('../utils/gridData.json')));


test.describe('Grid Suite', () => {
    let GridPage;

    test.beforeEach(async ({page}) => {
        GridPage = new gridPage(page);
        await GridPage.navigateToGridPage();
    });

    test('Grid Item Test', async ({}) => {
        const productTitle = await GridPage.getProductTitle(dataset.position);
        expect(productTitle).toBe('Super Pepperoni');
        const productPrice = await GridPage.getProductPrice(dataset.position);
        expect(productPrice).toBe('$10');
    });
    
    test('Grid All Items Test', async ({}) => {
        for (let i=0; i < await GridPage.productPositions.count(); i++)
        {
            var prodTitle = await GridPage.productTitles.nth(i);
            expect(prodTitle).toBeVisible();
            var prodPrice = await GridPage.productPrices.nth(i);
            expect(prodPrice).toBeVisible();
            var prodImage = await GridPage.prodImages.nth(i);
            expect(prodImage).toBeVisible();
            var prodAddBtn = await GridPage.prodAddToOrderBtn.nth(i);
            expect(prodAddBtn).toBeVisible();
        }
    });
    
});
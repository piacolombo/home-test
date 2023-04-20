const {expect, test} = require('@playwright/test');
const {loginPage} = require('../pageObjects/loginPage');
const {homePage} = require('../pageObjects/homePage');
const dataset = JSON.parse(JSON.stringify(require('../utils/loginData.json')));


test.describe('Login Suite', () => {
    let LoginPage;
    let HomePage;

    test.beforeEach(async ({page}) => {
        HomePage = new homePage(page);
        LoginPage = new loginPage(page);
        await LoginPage.navigateToLoginPage();
    });

    test('Successfull Login test', async () => {
        await LoginPage.login(dataset.username, dataset.password);
        const welcomeMsg = await HomePage.getUsername();
        await expect(welcomeMsg).toContain(dataset.username);
    });

    test('LoginFailure A', async () => {
        await LoginPage.login(dataset.username, dataset.worngPass);
        const errorMsg = await LoginPage.getErrorMsg();
        await expect(errorMsg).toContain('Wrong credentials');
    });

    test('LoginFailure B', async () => {
        await LoginPage.login(dataset.blankUser, dataset.blankPass);
        const errorMsg = await LoginPage.getErrorMsg();
        await expect(errorMsg).toContain('Fields can not be empty');
    });
    
});
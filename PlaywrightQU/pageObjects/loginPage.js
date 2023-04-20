class loginPage {
    constructor(page)
    {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passInput = page.locator('#password');
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
        this.errorMsg = page.locator('#message');
    }

    async navigateToLoginPage()
    {
        await this.page.goto("http://localhost:3100/login");
    }

    async login(username, password)
    {
        await this.usernameInput.type(username);
        await this.passInput.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getErrorMsg()
    {
        const msg = await this.errorMsg.textContent();
        return msg;
    }

}

module.exports = {loginPage};
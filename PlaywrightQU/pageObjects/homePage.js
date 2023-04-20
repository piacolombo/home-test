class homePage {
    constructor(page)
    {
        this.page = page;
        this.welcomeMsgUser = page.locator('[data-id = username]');
    }

    async getUsername(username, password)
    {
        const user = await this.welcomeMsgUser.textContent();
        return user;
    }

}

module.exports = {homePage};
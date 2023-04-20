class searchPage {
    constructor(page)
    {
        this.page = page;
        this.searchInput = page.getByPlaceholder('Search..');
        this.searchBtn = page.getByRole('button', { name: '' });
        this.searchResultMsg = page.locator('#result');
    }

    async navigateToSearchPage()
    {
        await this.page.goto("http://localhost:3100/search");
    }

    async searchWord(word)
    {
        await this.searchInput.type(word);
        await this.searchBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async emptySearch()
    {
        await this.searchBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getSearchResutlText()
    {
        var searchResult = await this.searchResultMsg.textContent();
        return searchResult;
    }

}

module.exports = {searchPage};
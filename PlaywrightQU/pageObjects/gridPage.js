class gridPage {
    constructor(page)
    {
        this.page = page;
        this.productTitles = page.locator("[data-test-id='item-name']");
        this.productPositions = page.locator("[data-test-id = 'card-number']");
        this.productPrices = page.locator("#item-price");
        this.prodImages = page.locator("img");
        this.prodAddToOrderBtn = page.locator("button");
    }

    async navigateToGridPage()
    {
        await this.page.goto("http://localhost:3100/grid");
    }

    async getProductTitle(position)
    {
        for (let i=0; i < await this.productPositions.count(); i++)
        {
            var prodPosition = await this.productPositions.nth(i).textContent();
            if (prodPosition == position)
            {
                var prodTitle = await this.productTitles.nth(i).textContent();
                return prodTitle;
            }
        }
    }

    async getProductPrice(position)
    {
        for (let i=0; i < await this.productPositions.count(); i++)
        {
            var prodPosition = await this.productPositions.nth(i).textContent();
            if (prodPosition == position)
            {
                var prodTitle = await this.productPrices.nth(i).textContent();
                return prodTitle;
            }
        }
    }
    
}

module.exports = {gridPage};
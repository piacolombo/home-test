const {expect, test} = require('@playwright/test');
const {searchPage} = require('../pageObjects/searchPage');
const dataset = JSON.parse(JSON.stringify(require('../utils/searchData.json')));

test.describe('Search Suite', () => {
    let SearchPage;

    test.beforeEach(async ({page}) => {
        SearchPage = new searchPage(page);
        await SearchPage.navigateToSearchPage();
    });

    test('Search Success', async ({}) => {
        await SearchPage.searchWord(dataset.word);
        const searchResult = await SearchPage.getSearchResutlText();
        expect(searchResult).toContain('Found one result for ' + dataset.word);
    });

    test('Search Empty', async ({}) => {
        await SearchPage.emptySearch();
        const searchResult = await SearchPage.getSearchResutlText();
        expect(searchResult).toContain('Please provide a search word.');
    });

});
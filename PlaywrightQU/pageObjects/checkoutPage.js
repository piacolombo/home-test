class checkoutPage {
    constructor(page)
    {
        this.page = page;
        this.fullNameInput = page.locator('#fname');
        this.nameOnCardInput = page.locator('#cname');
        this.emailInput = page.locator('#email');
        this.creditCardNumInput = page.locator('#ccnum');
        this.addressInput = page.locator('#adr');
        this.expMonthSelect = page.locator('#expmonth');
        this.cityInput = page.locator('#city');
        this.stateInput = page.locator('#state');
        this.zipInput = page.locator('#zip');
        this.expYearInput = page.locator('#expyear');
        this.cvvInput = page.locator('#cvv');
        this.shippingAddCheck = page.getByLabel('Shipping address same as billing');
        this.continueBtn = page.getByRole('button', { name: 'Continue to checkout' });
        this.productsPrices = page.locator("p span[class='price']");
    }

    async navigateToCheckoutPage()
    {
        await this.page.goto("http://localhost:3100/checkout");
    }

    async completeAllFields(fullName, nameOnCard, email, ccNumber, address, expMonth, city, expYear, cvv, state, zip)
    {
        await this.fullNameInput.type(fullName);
        await this.nameOnCardInput.type(nameOnCard);
        await this.emailInput.type(email);
        await this.creditCardNumInput.type(ccNumber);
        await this.addressInput.type(address);
        await this.expMonthSelect.selectOption(expMonth);
        await this.cityInput.type(city);
        await this.stateInput.type(state);
        await this.zipInput.type(zip);
        await this.expYearInput.type(expYear);
        await this.cvvInput.type(cvv);
    }

    async checkShipping()
    {
        if(await this.shippingAddCheck.isChecked())
        {
            return;
        }
        else
        {
            await this.shippingAddCheck.click();
            return;
        }
    }

    async uncheckShipping()
    {
        if(await this.shippingAddCheck.isChecked())
        {
            await this.shippingAddCheck.click();
            return;
        }
        else
        {
            return;
        }
    }

    async clickContinueToCheckout()
    {
        let alertMsg;
        this.page.on('dialog', async alert => 
        {
            alertMsg = alert.message();
            await alert.accept();
        })
        await this.continueBtn.click();
        await this.page.waitForLoadState('networkidle');
        return alertMsg
    }
    
    async isButtonEnabled()
    {
        return enabled = expect(this.page.continueBtn()).isEnabled();
    }

    async getCartSum()
    {
        var sum = 0;
        for (let i=0; i < await this.productsPrices.count() -1; i++)
        {
            var price = await this.productsPrices.nth(i).textContent();
            price = price.split("$")[1];
            price = parseInt(price);
            sum = sum + price;
        }
        return sum;
    }

    async getTotal()
    {
        var count = await this.productsPrices.count();
        count = parseInt(count);
        var total = await await this.productsPrices.nth(count-1).textContent();
        total = total.split("$")[1];
        total = parseInt(total);
        return total;
    }

}

module.exports = {checkoutPage};
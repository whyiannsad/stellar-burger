describe('Тест конструктора бургеров', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4000');
        cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' });
    });
    describe('Тест на добавлние ингредиентов', () => {
        it('Добавляем ингредиенты', () => {
            cy.get('[data-cy = "Краторная булка N-200i"]')
                .children('button')
                .click({ force: true });
            cy.get('[data-cy = "Биокотлета из марсианской Магнолии"]')
                .children('button')
                .click({ force: true });
            cy.get('[data-cy = "Кристаллы марсианских альфа-сахаридов"]')
                .children('button')
                .click({ force: true });
        });
    });
    describe('Тест работы модальных окнон', () => {
        it('Окно с ингредиентом', () => {
            cy.get('[data-cy = "Флюоресцентная булка R2-D3"]').click();
            cy.get('#modals').contains('Флюоресцентная булка R2-D3');
        });
      
        it('Закрытие по крестику', () => {
            cy.get('[data-cy = "Флюоресцентная булка R2-D3"]').click();
            cy.get('#modals').find('button').click();
            cy.get('#modals').children().should('not.exist');
        });
      
        it('Закрытие по оверлею', () => {
            cy.get('[data-cy = "Флюоресцентная булка R2-D3"]').click();
            cy.get(`[data-cy='modal']`).click({ force: true });
            cy.get('#modals').children().should('not.exist');
        });
      
        it('Закрытие по кнопке эскейп', () => {
            cy.get('[data-cy = "Флюоресцентная булка R2-D3"]').click();
            cy.document().trigger('keydown', { key: 'Escape' });
            cy.get('#modals').children().should('not.exist');
        });
    })
    describe('Тест создания заказа', () => {
        beforeEach(() => {
            localStorage.setItem('refreshToken', 'token');
            cy.setCookie('accessToken', 'token');
      });
        afterEach(() => {
            localStorage.clear();
            cy.clearCookies();
      });
        it('Тест оформления заказа', () => {
            cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
            cy.intercept('POST', '/api/orders', { fixture: 'order.json' });
            cy.visit('http://localhost:4000/');
            cy.get('[data-cy = "Флюоресцентная булка R2-D3"]')
                .children('button')
                .click({ force: true });
            cy.get('[data-cy = "Филе Люминесцентного тетраодонтимформа"]')
                .children('button')
                .click({ force: true });
            cy.get('[data-cy = "Плоды Фалленианского дерева"]')
                .children('button')
                .click({ force: true });
            cy.get('[data-cy = "Соус фирменный Space Sauce"]')
                .children('button')
                .click({ force: true });
            cy.get('button').contains('Оформить заказ').click();
            cy.contains('идентификатор заказа').should('be.visible');
            cy.get('[data-cy="order"]').should('contain.text', '41969');
            cy.get('[data-cy="close"]').click();
            cy.contains('идентификатор заказа').should('not.exist');
            cy.get('[data-cy="total"]').should('contain.text', '0');
      });
    });
})

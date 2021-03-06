/// <reference types="cypress" />
/// <reference types="../../cypress/support" />
import {v4 as uuidv4} from 'uuid';

// @ts-check

context('Create offer', () => {
    it('should create new offer and show it in my offers', () => {
        const testData = getTestData();

        cy.registerUser(testData.username1, testData.password1);
        cy.login(testData.username1, testData.password1);
        cy.createNewAuction(testData.description, testData.endDate, testData.loanAmount, testData.numberOfInstallments);
        cy.logout();
        cy.registerUser(testData.username2, testData.password2);
        cy.login(testData.username2, testData.password2);
        cy.visit('/');

        cy.get('div')
            .contains(testData.loanAmount)
            .get('button')
            .contains('Make offer')
            .first()
            .click();
        cy.get('[name="percentageSlider"]').type('{leftarrow}');
        cy.get('[name="rangeInputNumberInput"]')
            .invoke('val')
            .then(value => {
                cy.get('button')
                    .contains('Create Offer')
                    .click();
                cy.get('button')
                    .contains('Yes')
                    .click();
                cy.contains(testData.loanAmount);
                cy.contains(value?.toString() ?? '');
            });
    });
    it('should delete offer on delete click', () => {
        const testData = getTestData();

        cy.registerUser(testData.username1, testData.password1);
        cy.login(testData.username1, testData.password1);
        cy.createNewAuction(testData.description, testData.endDate, testData.loanAmount, testData.numberOfInstallments);

        cy.registerUser(testData.username2, testData.password2);
        cy.login(testData.username2, testData.password2);
        cy.submitOffer(testData.proposedAnnualPercentageRate);
        cy.visit('/my-offers');
        cy.get('[name="DeleteOffer"]').click();
        cy.contains('Yes').click();
        cy.wait(2000);
        cy.contains("Looks like there aren't any offers here yet :(");
    });

    it('offer should be visible by borrower', () => {
        const testData = getTestData();

        cy.registerUser(testData.username1, testData.password1);
        cy.login(testData.username1, testData.password1);
        cy.createNewAuction(testData.description, testData.endDate, testData.loanAmount, testData.numberOfInstallments);

        cy.registerUser(testData.username2, testData.password2);
        cy.login(testData.username2, testData.password2);
        cy.submitOffer(testData.proposedAnnualPercentageRate);
        cy.login(testData.username1, testData.password1);
        cy.visit('/my-auctions');
        cy.contains('See details').click();
        cy.contains(testData.proposedAnnualPercentageRate * 100);
    });
});

const getTestData = () => ({
    username1: uuidv4(),
    password1: uuidv4(),
    username2: uuidv4(),
    password2: uuidv4(),
    endDate: '12/12/9999 12:12',
    loanAmount: 10000,
    numberOfInstallments: 12,
    description: 'description',
    proposedAnnualPercentageRate: 10,
});

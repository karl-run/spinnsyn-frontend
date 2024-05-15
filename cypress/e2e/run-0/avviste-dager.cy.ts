import {
    avvistVedtak,
    avvistVedtakMedLavInntekt,
    vedtakMed40Grad,
} from '../../../src/data/testdata/data/vedtak/rs-vedtak'

describe('Avviste dager', () => {
    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 11)
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
    })

    it('Vedtak med bare godkjente utbetalingsdager viser ikke avviste dager panel', () => {
        cy.get(`a[href*=${vedtakMed40Grad.id}]`).click({ force: true })

        cy.findByRole('region', { name: 'Avviste sykepengedager' }).should('not.exist')
    })

    it('Vedtak med avviste dager og ingen utbetaling', () => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.get(`a[href*=${avvistVedtak.id}]`).click({ force: true })
        cy.contains('Ingen utbetaling')
        cy.contains('Mer om beregningen').should('not.exist')
    })

    it('Vedtak med avviste dager og lav inntekt', () => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.get(`a[href*=${avvistVedtakMedLavInntekt.id}]`).click({
            force: true,
        })
        cy.contains('Ingen utbetaling')

        cy.get('main').findByRole('region', { name: 'Beregning av sykepengene' }).click()

        cy.findByRole('region', { name: 'Beregning av sykepengene' }).within(() => {
            cy.get('[data-cy="mer-om-beregningen"]').should('contain', 'Mer om beregningen').click()
        })

        cy.findByRole('region', { name: 'Beregning av sykepengene' }).within(() => {
            cy.get('[data-cy="mer-om-beregningen"]')
                .should('contain', 'Månedsinntekt')
                .should('contain', 'Årsinntekt')
                .should('contain', 'Sykepengegrunnlag')
                .should('not.contain', 'Sykepenger per dag')
                .should('not.contain', 'Totalbeløp')
                .should('not.contain', 'Utbetalingsdager')
                .should('not.contain', 'Utbetaling')
        })
    })
})

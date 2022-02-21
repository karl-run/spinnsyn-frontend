import { ulestVedtakUtenUtbetalingsdager, vedtakAnnullert, vedtakRevurdert } from '../../src/data/mock/data/rs-vedtak'

describe('Tester at appen starter', () => {

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
    })

    it('Det er 2 ulest vedtak og 6 leste', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get('.vedtak--uleste > article > .inngangspanel').should('have.length', 2)
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 6)
    })

    it('Vi åpner det uleste vedtaket', () => {
        cy.get('.vedtak--uleste')
            .get(`article a[href*=${ulestVedtakUtenUtbetalingsdager.id}]`)
            .click()

        cy.url().should('equal', `http://localhost:8080/syk/sykepenger?id=${ulestVedtakUtenUtbetalingsdager.id}`)

        cy.contains('14. juni 2021')

        cy.contains('Opplysningene')
        cy.contains('Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din.')
    })

    it('Den grønne boksen har riktig innhold', () => {
        cy.contains('21 060 kroner')
            .and('contain', 'Utbetales til Pengeløs Sparebank')
            .click({ force: true })

        cy.contains('Mer om beregningen').click({ force: true })
        cy.contains('folketrygdloven § 8-28')
            .should('have.attr', 'href', 'https://lovdata.no/lov/1997-02-28-19/§8-28')

        cy.get('.inntekt__info')
            .should('contain', 'Månedslønn').and('contain', '37\u00a0500 kr')
            .should('contain', 'Årslønn').and('contain', '450\u00a0000 kr')
    })

    it('Den blå boksen har riktig innhold', () => {

        cy.get('.ekspanderbar.bla').should('contain', '15 sykepengedager')
            .and('contain', 'Brukt per 3. mai 2021')
            .click()

        cy.should('contain', '180 sykepengedager').and('contain', 'Gjenstår per 3. mai 2021')
        cy.should('contain', '17. des. 2021').and('contain', 'Beregnet slutt på sykepenger')
        cy.should('contain', 'Datoen gjelder hvis du er sykmeldt uten opphold.')
    })

    it('Vi går tilbake til oversikten', () => {
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.get(':nth-child(3) > .navds-link').contains('Svar på søknader').click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
    })

    it('Det er 1 uleste vedtak og 7 leste', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get('.vedtak--uleste > article > .inngangspanel').should('have.length', 1)
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 7)
    })

    it('Vi åpner et annullert vedtak', () => {
        cy.get('.vedtak--leste > article > .inngangspanel')
            .should('have.length', 7).eq(2).click({ force: true })
        cy.url().should('equal', `http://localhost:8080/syk/sykepenger?id=${vedtakAnnullert.id}`)
        cy.contains('Ny behandling av søknaden vil ikke skje automatisk. Da er det en saksbehandler som vurderer søknaden.')

        cy.get('.annullering .info')
            .should('contain', 'Vil dette ha noe å si for pengene jeg får?')
            .and('contain', 'Hvem har sendt opplysningene?')
            .and('contain', 'Hvorfor behandles den på nytt?')
            .and('contain', 'Må jeg gjøre noe nå?')
    })

    it('Vi går tilbake til oversikten', () => {
        cy.get(':nth-child(3) > .navds-link').contains('Svar på søknader').click({ force: true })
    })

    it('Vi åpner et revurdert vedtak', () => {
        cy.get('.vedtak--leste > article > .inngangspanel')
            .should('have.length', 7).eq(3).click({ force: true })
        cy.url().should('equal', `http://localhost:8080/syk/sykepenger?id=${vedtakRevurdert.id}`)

        cy.get('.annullering .info')
            .should('contain', 'Vil dette ha noe å si for pengene jeg får?')
            .and('contain', 'Hvem har sendt opplysningene?')
            .and('contain', 'Hvorfor behandles den på nytt?')
            .and('contain', 'Må jeg gjøre noe nå?')
    })

    it('Vedtaket viser beregnet sluttdato sendt fra bømlo', () => {

        cy.get('.ekspanderbar.bla').should('contain', '9 sykepengedager')
            .and('contain', 'Brukt per 3. mai 2021')
            .click()

        cy.should('contain', '186 sykepengedager').and('contain', 'Gjenstår per 3. mai 2021')
        cy.should('contain', '11. nov. 1918').and('contain', 'Beregnet slutt på sykepenger')
    })
})


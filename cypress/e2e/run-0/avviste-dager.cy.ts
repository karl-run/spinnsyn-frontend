import { alleAvvisteDager } from '../../../src/data/testdata/data/vedtak/alleAvvisteDager'
import {
    avslåttFraBømlo,
    delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo,
} from '../../../src/data/testdata/data/vedtak/delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo'
import { vedtakMed40Grad } from '../../../src/data/testdata/data/vedtak/gradert40'
import { avvistVedtak } from '../../../src/data/testdata/data/vedtak/avvistVedtak'
import { avvistVedtakMedLavInntekt } from '../../../src/data/testdata/data/vedtak/avvistMedLavInntekt'
import { avvistVedtakMedLavInntektDirekteUtbetaling } from '../../../src/data/testdata/data/vedtak/avvistVedtakMedLavInntektDirekteUtbetaling'

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

    it('Vedtak med delvis godkjente utbetalingsdager', () => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.get(`a[href*=${alleAvvisteDager.id}]`).click({
            force: true,
        })

        cy.get('[data-cy="utbetaling-panel-refusjon"]').within(() => {
            cy.contains('Delvis innvilget vedtak').should('exist')
            cy.contains('Noen av dagene er ikke innvilget fordi:').should('exist')
            cy.contains('li', 'Maks antall dager').should('exist')
            cy.contains('li', 'For lav inntekt').should('exist')
            cy.contains('li', 'Egenmelding').should('exist')
            cy.contains('li', 'Sykmeldt i for liten grad').should('exist')
            cy.contains('li', 'Jobbet for kort').should('exist')
            cy.contains('li', 'Ikke medlem').should('exist')
            cy.contains('li', 'Etter dødsfall').should('exist')
            cy.contains('li', 'Ukjent').should('exist')
            cy.contains('li', 'Over 70 år').should('exist')
            cy.contains('li', 'Arbeidsavklaringspenger').should('exist')
            cy.contains('li', 'Dagpenger').should('exist')
            cy.contains('li', 'Foreldrepenger').should('exist')
            cy.contains('li', 'Omsorgspenger').should('exist')
            cy.contains('li', 'Opplæringspenger').should('exist')
            cy.contains('li', 'Pleiepenger').should('exist')
            cy.contains('li', 'Svangerskapspenger').should('exist')

            cy.contains('button', 'Se nærmere begrunnelse her').click()
        })

        cy.contains(
            'Vi ser at du ikke har rett til sykepenger for én eller flere dagene i sykmeldingen. Nedenfor ser du dagene du ikke får utbetaling for, og hvorfor.',
        )

        cy.get('[data-cy="avvistedageroversikt"]').should('contain', 'Dager NAV ikke utbetaler')

        cy.findByRole('region', { name: 'Avviste sykepengedager' }).within(() => {
            cy.get('[data-cy="dag-tabell-body"]').within(() => {
                cy.contains('30.jan.').should('not.exist')
                cy.contains('31.jan.').should('not.exist')
                cy.contains('01.feb.').should('not.exist')
                cy.contains('06.feb.').should('not.exist')
                cy.contains('08.feb.').should('not.exist')
                cy.contains('11.feb.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('13.feb.')
                    .parent()
                    .parent()
                    .should('contain', 'Søkt\u00a0for\u00a0sent')
                    .and('contain', '-')
                cy.contains('14.feb.').should('not.exist')
                cy.contains('15.feb.')
                    .parent()
                    .parent()
                    .should('contain', 'Maks\u00a0antall\u00a0dager')
                    .and('contain', '-')
                cy.contains('16.feb.')
                    .parent()
                    .parent()
                    .should('contain', 'For\u00a0lav\u00a0inntekt')
                    .and('contain', '-')
                cy.contains('17.feb.').parent().parent().should('contain', 'Egenmelding').and('contain', '-')
                cy.contains('18.feb.')
                    .parent()
                    .parent()
                    .should('contain', 'Sykmeldt\u00a0i\u00a0for\u00a0liten\u00a0grad')
                    .and('contain', '-')
                cy.contains('19.feb.')
                    .parent()
                    .parent()
                    .should('contain', 'Jobbet\u00a0for\u00a0kort')
                    .and('contain', '-')
                cy.contains('20.feb.').parent().parent().should('contain', 'Ikke\u00a0medlem').and('contain', '-')
                cy.contains('21.feb.').parent().parent().should('contain', 'Etter\u00a0dødsfall').and('contain', '-')
                cy.contains('22.feb.').parent().parent().should('contain', 'Ukjent').and('contain', '-')
                cy.contains('27.feb.').parent().parent().should('contain', 'Arbeidsavklaringspenger')
                cy.contains('28.feb.').parent().parent().should('contain', 'Dagpenger')
                cy.contains('01.mars').parent().parent().should('contain', 'Foreldrepenger')
                cy.contains('02.mars').parent().parent().should('contain', 'Omsorgspenger')
                cy.contains('03.mars').parent().parent().should('contain', 'Opplæringspenger')
                cy.contains('04.mars').parent().parent().should('contain', 'Pleiepenger')
                cy.contains('05.mars').parent().parent().should('contain', 'Svangerskapspenger')
            })
        })

        cy.get('.navds-heading:first-child').contains('Forklaring')
        cy.contains('Du får ikke sykepenger for dager du har ferie eller permisjon.')
        cy.contains('Det blir ikke utbetalt sykepenger etter datoen for dødsfallet.')

        //lukker og åpner "utbetales ikke av nav"
        cy.findByRole('region', { name: 'Avviste sykepengedager' }).within(() => {
            cy.get('[data-cy="avvistedageroversikt"]')
                .should('contain', 'Dager NAV ikke utbetaler')
                .should('contain', 'Forklaring')
            cy.get('[data-cy="avvistedageroversikt"] > .navds-accordion__header').click()
        })
        cy.findByRole('region', { name: 'Avviste sykepengedager' })
        cy.findByRole('region', { name: 'Avviste sykepengedager' })
            .should('contain', '22 sykepengedager')
            .and('contain', 'Utbetales ikke av NAV')
            .click()

        cy.findByRole('region', { name: 'Avviste sykepengedager' }).contains('Mer om beregningen').should('not.exist')
    })

    it('Vedtak med avviste dager og ingen utbetaling', () => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.get(`a[href*=${avvistVedtak.id}]`).click({ force: true })
        cy.contains('Ingen utbetaling')

        cy.findByRole('region', { name: 'Avviste sykepengedager' })
            .should('contain', '4 sykepengedager')
            .and('contain', 'Utbetales ikke av NAV')
            .click()

        cy.contains(
            'Vi ser at du ikke har rett til sykepenger for én eller flere dagene i sykmeldingen. Nedenfor ser du dagene du ikke får utbetaling for, og hvorfor.',
        )

        cy.contains('Beregning av sykepengene').should('not.exist')

        cy.get('[data-cy="avvistedageroversikt"]').should('contain', 'Dager NAV ikke utbetaler').click()

        cy.findByRole('region', { name: 'Avviste sykepengedager' }).within(() => {
            cy.get('[data-cy="dag-tabell-body"]').within(() => {
                cy.contains('17.aug.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('18.aug.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('19.aug.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('20.aug.').parent().parent().should('contain', 'Etter\u00a0dødsfall').and('contain', '-')
            })
        })

        cy.contains('Mer om beregningen').should('not.exist')
    })

    it('Vedtak med avviste dager og lav inntekt, refusjon', () => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.get(`a[href*=${avvistVedtakMedLavInntekt.id}]`).click({
            force: true,
        })
        cy.contains('Ingen utbetaling')

        cy.findByRole('region', { name: 'Avviste sykepengedager' })
            .should('contain', '5 sykepengedager')
            .and('contain', 'Utbetales ikke av NAV')
            .click()

        cy.contains(
            'Vi ser at du ikke har rett til sykepenger for én eller flere dagene i sykmeldingen. Nedenfor ser du dagene du ikke får utbetaling for, og hvorfor.',
        )

        cy.get('main').findByRole('region', { name: 'Beregning av sykepengene' }).click()

        cy.get('[data-cy="avvistedageroversikt"]').should('contain', 'Dager NAV ikke utbetaler').click()

        cy.findByRole('region', { name: 'Avviste sykepengedager' }).within(() => {
            cy.get('[data-cy="dag-tabell-body"]').within(() => {
                cy.contains('17.aug.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('18.aug.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('19.aug.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('20.aug.')
                    .parent()
                    .parent()
                    .should('contain', 'For\u00a0lav\u00a0inntekt')
                    .and('contain', '-')
                cy.contains('21.aug.').parent().parent().should('contain', 'Etter\u00a0dødsfall').and('contain', '-')
            })
        })

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

    it('Vedtak med avviste dager og lav inntekt, direkte utbetaling', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=delvis-og-helt-avviste-vedtak')
        cy.get(`a[href*=${avvistVedtakMedLavInntektDirekteUtbetaling.id}]`).click({
            force: true,
        })
        cy.contains('Ingen utbetaling')

        //TODO endre utbetaling-panel-refusjon til utbetaling-panel-personutbetaling når det er inhen utbetaling?
        cy.get('[data-cy="utbetaling-panel-refusjon"]').within(() => {
            cy.contains('Avslått vedtak').should('exist')
            cy.contains('Vedtaket er avslått fordi:').should('exist')
            cy.contains('li', 'For lav inntekt').should('exist')
            cy.contains('li', 'Etter dødsfall').should('exist')
        })

        cy.findByRole('region', { name: 'Avviste sykepengedager' })
            .should('contain', '4 sykepengedager')
            .and('contain', 'Utbetales ikke av NAV')
            .click()

        cy.contains(
            'Vi ser at du ikke har rett til sykepenger for én eller flere dagene i sykmeldingen. Nedenfor ser du dagene du ikke får utbetaling for, og hvorfor.',
        )

        cy.get('main').findByRole('region', { name: 'Beregning av sykepengene' }).click()

        cy.get('[data-cy="avvistedageroversikt"]').should('contain', 'Dager NAV ikke utbetaler').click()

        cy.findByRole('region', { name: 'Avviste sykepengedager' }).within(() => {
            cy.get('[data-cy="dag-tabell-body"]').within(() => {
                cy.contains('18.aug.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('19.aug.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('20.aug.')
                    .parent()
                    .parent()
                    .should('contain', 'For\u00a0lav\u00a0inntekt')
                    .and('contain', '-')
                cy.contains('21.aug.').parent().parent().should('contain', 'Etter\u00a0dødsfall').and('contain', '-')
            })
        })

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

    it('Vedtak med delvisInnvilget begrunnelse fra Bømlo', () => {
        cy.visit(
            'http://localhost:8080/syk/sykepenger?testperson=kombinasjon-delvisInnvilgelse-og-skj%C3%B8nnsfastsatt-fra-bomlo',
        )
        cy.get(`a[href*=${delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo.id}]`).click({ force: true })

        cy.get('[data-cy="utbetaling-panel-personutbetaling"]').within(() => {
            cy.contains('Delvis innvilget vedtak').should('not.exist')
            cy.contains('Noen av dagene er ikke innvilget fordi:').should('not.exist')
            cy.contains('Sykmeldt i for liten grad').should('not.exist')
        })

        cy.get('[data-cy="utbetaling-panel-refusjon"]').within(() => {
            cy.contains('Delvis innvilget vedtak').should('exist')
            cy.contains('Noen av dagene er ikke innvilget fordi:').should('exist')
            cy.contains('li', 'Sykmeldt i for liten grad').should('exist')

            cy.contains('button', 'Se nærmere begrunnelse her').click()
        })

        cy.findByRole('button', { name: 'Begrunnelse for delvis innvilget vedtak' })
            .should('contain', 'Begrunnelse for delvis innvilget vedtak')
            .siblings('div')
            .should('contain', 'Devlis innvilgelse.')
            .and('contain', 'Ny linje.')
    })

    it('Vedtak med avslag begrunnelse fra Bømlo', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=avvist-fra-bomlo')
        cy.get(`a[href*=${avslåttFraBømlo.id}]`).click({
            force: true,
        })

        cy.get('[data-cy="utbetaling-panel-refusjon"]').within(() => {
            cy.contains('Avslått vedtak').should('exist')
            cy.contains('Vedtaket er avslått fordi:').should('exist')
            cy.contains('li', 'Sykmeldt i for liten grad').should('exist')

            cy.contains('button', 'Se nærmere begrunnelse her').click()
        })

        cy.findByRole('button', { name: 'Begrunnelse for avslått vedtak' })
            .should('contain', 'Begrunnelse for avslått vedtak')
            .siblings('div')
            .should('contain', 'Avslått vedtak.')
            .and('contain', 'Ny linje.')
    })
})

import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak'

export const vedtakRevurdert: RSVedtakWrapper = {
    id: '9ae82dd2-dcf1-4c16-9e12-35cb6d634338',
    lest: true,
    organisasjoner: {},
    lestDato: '2021-05-03T11:50:56.812287Z',
    orgnavn: 'POSTEN NORGE AS, BÆRUM',
    andreArbeidsgivere: {},
    vedtak: {
        organisasjonsnummer: '999999999',
        fom: '2021-04-26',
        tom: '2021-05-03',
        dokumenter: [
            {
                dokumentId: 'f1c85505-e8db-4f6f-b049-ccd0cb051b7f',
                type: 'Sykmelding',
            },
            {
                dokumentId: '4391db7f-3046-4b71-a7b9-9ab5889cdad6',
                type: 'Søknad',
            },
        ],
        inntekt: 37500.0,
        vedtakFattetTidspunkt: '2021-05-06',
        utbetaling: {
            organisasjonsnummer: '999999999',
            forbrukteSykedager: 9,
            gjenståendeSykedager: 186,
            automatiskBehandling: false,
            foreløpigBeregnetSluttPåSykepenger: '1918-11-11',
        },
    },
    opprettetTimestamp: '2021-05-03T12:42:42.000Z',
    annullert: false,
    revurdert: true,
    dagerArbeidsgiver: [
        {
            dato: '2021-04-26',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: [],
        },
        {
            dato: '2021-04-27',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: [],
        },
        {
            dato: '2021-04-28',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: [],
        },
        {
            dato: '2021-04-29',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: [],
        },
        {
            dato: '2021-04-30',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: [],
        },
        {
            dato: '2021-05-01',
            belop: 0,
            grad: 0,
            dagtype: 'NavHelgDag',
            begrunnelser: [],
        },
        {
            dato: '2021-05-02',
            belop: 0,
            grad: 0,
            dagtype: 'NavHelgDag',
            begrunnelser: [],
        },
        {
            dato: '2021-05-03',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: [],
        },
    ],
    dagerPerson: [],
    sykepengebelopPerson: 0,
    sykepengebelopArbeidsgiver: 8424,
}

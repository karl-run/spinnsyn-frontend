import { BodyShort, Heading } from '@navikt/ds-react'
import React, { useState } from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { ValutaFormat } from '../../../utils/valuta-utils'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import Ekspanderbar from '../../ekspanderbar/ekspanderbar'
import EkspanderbarIntern from '../../ekspanderbar/ekspanderbar-intern'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'
import { ArbeidsgiverInfo } from './arbeidsgiver-info'
import BeregningInfo from './beregning-info'

const RefusjonMedInntekt = ({ vedtak }: VedtakProps) => {
    const [ apen ] = useState<boolean>(false)
    const belop = ValutaFormat.format(vedtak.sykepengebelopArbeidsgiver)

    return (
        <Ekspanderbar type="gronn"
            className="refusjon"
            erApen={apen}
            tittel={
                <div className="ekspanderbar__tittel">
                    <Heading size="medium" level="2">
                        {belop + ' kroner'}
                        <BodyShort spacing size="small" as="span">
                            {getLedetekst(tekst('utbetaling.arbeidsgiver.systemtittel'), {
                                '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn)
                            })}
                        </BodyShort>
                    </Heading>
                </div>
            }
        >
            <>
                <ArbeidsgiverInfo vedtak={vedtak} />

                <Vis hvis={vedtak.dagerArbeidsgiver.length > 0}
                    render={() =>
                        <EkspanderbarIntern erApen={false} className="utbetalingsoversikt"
                            tittel="Sykepenger per dag"
                        >
                            <DagTabell dager={vedtak.dagerArbeidsgiver} />
                            <DagBeskrivelse dager={vedtak.dagerArbeidsgiver} />
                        </EkspanderbarIntern>
                    }
                />

                <BeregningInfo vedtak={vedtak} mottaker={'refusjon'} />
            </>
        </Ekspanderbar>
    )
}

export default RefusjonMedInntekt

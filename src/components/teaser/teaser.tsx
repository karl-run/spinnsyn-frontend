import dayjs from 'dayjs'
import { HoyreChevron } from 'nav-frontend-chevron'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { getLedetekst, tekst } from '../../utils/tekster'
import { getUrlTilSoknad } from '../../utils/url-utils'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import { InngangsHeader, Inngangspanel } from '../inngang/inngangspanel'
import Vis from '../vis'
import { hentTeaserStatustekst, SykepengesoknadTeaserProps } from './teaser-util'

const Teaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const { logEvent } = useAmplitudeInstance()
    const stegId = soknad.status === RSSoknadstatus.NY || RSSoknadstatus.UTKAST_TIL_KORRIGERING ? '1' : ''

    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`} onClick={() => {
            logEvent('Velger søknad', { soknadstype: soknad.soknadstype })
        }}>
            <Inngangspanel to={getUrlTilSoknad(soknad, stegId)}>
                <HoyreChevron />
                <div className='inngangspanel__innhold'>
                    <InngangsHeader
                        meta={dayjs(soknad.fom).format('DD. MMM') + ' - ' + dayjs(soknad.tom).format('DD. MMM YYYY')}
                        tittel={tekst('spvedtak.teaser.tittel')}
                        status={hentTeaserStatustekst(soknad)}
                    />
                    <Vis hvis={soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}>
                        <Normaltekst className='inngangspanel__tekst'>
                            {getLedetekst(tekst('spvedtak.teaser.sykmeldt'), {
                                '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
                            })}
                        </Normaltekst>
                    </Vis>
                </div>
            </Inngangspanel>
        </article>
    )
}

export default Teaser

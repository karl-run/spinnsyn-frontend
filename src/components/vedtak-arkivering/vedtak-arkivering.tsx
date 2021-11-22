import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import React from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { tekst } from '../../utils/tekster'
import Vedtak from '../vedtak-side/vedtak'

dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

export interface VedtakArkiveringProps {
    vedtak: RSVedtakWrapper,
    fnr: String,
    utbetalingId: String,
}

export const VedtakArkivering = ({ vedtak, fnr, utbetalingId }: VedtakArkiveringProps) => {

    const fnrForVisning = `${fnr.slice(0, 6)} ${fnr.slice(5)}`

    return (
        <ArkiveringContext.Provider value={true}>
            <div className="vedtak-arkivering">
                <div id="ark-header">
                    <img className="navlogo" src={'/syk/sykepenger/static/img/nav.svg'} />
                    <h1 className="title">{tekst('vedtak.arkivering.tittel')}</h1>
                </div>
                <div className="personinfo">
                    <div className="persontekst">
                        <div className="persontekst__sidetopp">
                            <img src={'/syk/sykepenger/static/img/person.svg'} className="personikon" />
                            <div className="persontekst__personalia">
                                <p className="navn">
                                    {fnrForVisning}
                                </p>
                            </div>
                            <div className="sendt">
                                <p>
                                    Dokument opprettet<br />{dayjs().tz('Europe/Oslo').format('LLL')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Vedtak vedtak={vedtak} />
            </div>
            <div id="ark-footer">
                <span>{utbetalingId}</span>
                <span className="sidetall">side <span id="pagenumber"></span> av <span id="pagecount"></span></span>
            </div>
        </ArkiveringContext.Provider>
    )
}

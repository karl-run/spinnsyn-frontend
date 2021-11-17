import parser from 'html-react-parser'
import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { harFlereArbeidsgivere } from '../../../utils/har-flere-arbeidsgivere'
import { tekst } from '../../../utils/tekster'
import Utvidbar from '../../utvidbar/utvidbar'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'
import InntektInfo from './inntekt-info/inntekt-info'

export interface BeregningInfoProps {
    vedtak: RSVedtakWrapper;
    mottaker: 'person' | 'refusjon'
}

const BeregningInfo = ({ vedtak, mottaker }: BeregningInfoProps) => {

    const sykepengegrunnlagInnholdKey = () => {
        if (vedtak.vedtak.begrensning === 'ER_IKKE_6G_BEGRENSET') {
            return 'utbetaling.sykepengegrunnlag.under6g.innhold'
        }
        return 'utbetaling.sykepengegrunnlag.over6g.innhold'
    }

    const totalbelopInnholdKey = () => {
        if (mottaker == 'person') {
            return 'utbetaling.person.totalbelop.innhold'
        }
        return 'utbetaling.totalbelop.innhold'
    }
    return (
        <Utvidbar erApen={false} visLukk={true} type="intern" className="blokkinfo"
            tittel={tekst('utbetaling.beregning.tittel')}
        >
            <InntektInfo vedtak={vedtak} />

            <Element tag="h4" className="blokkinfo__avsnitt">
                {tekst('utbetaling.mndlonn.tittel')}
            </Element>
            <Normaltekst>
                {parser(tekst('utbetaling.mndlonn.innhold'))}
            </Normaltekst>

            <Element tag="h4" className="blokkinfo__avsnitt">
                {tekst('utbetaling.arslonn.tittel')}
            </Element>
            <Normaltekst>
                {parser(tekst('utbetaling.arslonn.innhold'))}
            </Normaltekst>

            <Element tag="h4" className="blokkinfo__avsnitt">
                {tekst('utbetaling.sykepengegrunnlag.tittel')}
            </Element>
            <Normaltekst>
                {parser(tekst(sykepengegrunnlagInnholdKey()))}
            </Normaltekst>

            <Normaltekst className="blokkinfo__avsnitt">
                {parser(tekst('utbetaling.sykepengegrunnlag.skjønn'))}
            </Normaltekst>

            <Element tag="h4" className="blokkinfo__avsnitt">
                {tekst('utbetaling.dagligbelop.tittel')}
            </Element>
            <Normaltekst>
                {tekst('utbetaling.dagligbelop.innhold')}
            </Normaltekst>

            <Element tag="h4" className="blokkinfo__avsnitt">
                {tekst('utbetaling.totalbelop.tittel')}
            </Element>
            <Normaltekst className="totalbelop">
                {tekst(totalbelopInnholdKey())}
            </Normaltekst>

            <Vis hvis={harFlereArbeidsgivere(vedtak) == 'ja'}
                render={() =>
                    <>
                        <Element tag="h4" className="blokkinfo__avsnitt">
                            {tekst('utbetaling.flere-arbeidsforhold.tittel')}
                        </Element>
                        <Normaltekst> {tekst('utbetaling.flere-arbeidsforhold.innhold')} </Normaltekst>
                    </>
                }
            />

            <Element tag="h4" className="blokkinfo__avsnitt">
                {tekst('utbetaling.utbetalingsdager.tittel')}
            </Element>
            <Normaltekst>
                {tekst('utbetaling.utbetalingsdager.innhold')}
            </Normaltekst>


            <Normaltekst className="blokkinfo__avsnitt">
                {tekst('utbetaling.beregning.les.mer')}
                <Lenke href={tekst('utbetaling.beregning.lenke.url')} target="_blank">
                    {tekst('utbetaling.beregning.lenke.tekst')}
                </Lenke>
            </Normaltekst>
        </Utvidbar>
    )
}

export default BeregningInfo

import { useEffect } from 'react'

import useValgtVedtak from '../query-hooks/useValgtVedtak'
import env from '../utils/environment'
import { info } from '../utils/logger'

interface HotjarTriggerProps {
    children: any;
}

interface HotjarWindow extends Window {
    hj: (name: string, value: string) => void;
}

export const HotjarTrigger = ({ children }: HotjarTriggerProps) => {
    const valgtVedtak = useValgtVedtak()

    useEffect(() => {
        const hotJarWindow = (window as unknown as HotjarWindow)

        if (env.isProd || env.isOpplaering) {
            setTimeout(() => {
                if (typeof hotJarWindow.hj !== 'function') {
                    info('Hotjar ble ikke lastet inn...')
                } else {
                    hotJarWindow.hj('trigger', 'SP_INNSYN')
                }
            }, 2000)
        }
    }, [ valgtVedtak ])

    return children
}

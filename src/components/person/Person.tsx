import { Link, Popover } from '@navikt/ds-react'
import React, { useRef, useState } from 'react'
import { PersonCircleIcon } from '@navikt/aksel-icons'

import { personas } from '../../data/testdata/testperson'
import { isMockBackend, isOpplaering } from '../../utils/environment'

const Person = () => {
    const [open, setOpen] = useState<boolean>(false)
    const person = useRef<HTMLButtonElement>(null)
    const kanVelgePerson = isMockBackend() || isOpplaering()

    if (!kanVelgePerson) return null

    return (
        <div className="hidden cursor-pointer md:block">
            <button aria-label="Velg testperson" ref={person}>
                <PersonCircleIcon
                    onClick={() => {
                        setOpen(!open)
                    }}
                    aria-label="Velg testperson"
                    className="h-12 w-12"
                />
            </button>
            <Popover
                open={open}
                anchorEl={person.current as HTMLElement}
                placement="bottom"
                onClose={() => setOpen(false)}
            >
                <Popover.Content>
                    <ul>
                        {Object.keys(personas).map((p, idx) => (
                            <li key={idx}>
                                <Link href={`?testperson=${p}`}>{p}</Link>
                            </li>
                        ))}
                    </ul>
                </Popover.Content>
            </Popover>
        </div>
    )
}

export default Person

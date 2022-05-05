import { useState, useEffect } from 'react'

import { TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'


export default function EditableTitle({ value: passedValue, onChange, ...props }) {

    const [value, setValue] = useState(passedValue)
    const [debounced] = useDebouncedValue(value, 200)

    useEffect(() => onChange(debounced), [debounced])

    useEffect(() => setValue(passedValue), [passedValue])

    return (
        <TextInput
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            size="xl"
            variant="unstyled"
            styles={editableTitleStyles}
            {...props} />
    )
}

const editableTitleStyles = theme => ({
    wrapper: {
        marginLeft: -3,
    },
    input: {
        fontWeight: 600,
        '&:hover': {
            color: theme.colors.gray[6]
        }
    }
})


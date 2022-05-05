
import { InputWrapper as MantineInputWrapper } from '@mantine/core'


export default function InputWrapper({ children, ...props }) {
    return (
        <MantineInputWrapper {...props} styles={inputWrapperStyles} >
            {children}
        </MantineInputWrapper>
    )
}

const inputWrapperStyles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    label: {
        marginRight: 20,
        textAlign: 'right',
        width: 120
    }
})
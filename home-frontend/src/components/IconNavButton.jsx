import { Text, Tooltip } from '@mantine/core'


export function IconNavButton({ icon, label, tooltipLabel }) {
    return (
        <Tooltip label={tooltipLabel} position="right" withArrow zIndex={500}>
            {icon}
            <Text sx={tabLabelStyle}>{label}</Text>
        </Tooltip>
    )
}


const tabLabelStyle = theme => ({
    fontFamily: 'JetBrains Mono',
    textTransform: 'uppercase'
})
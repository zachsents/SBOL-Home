
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import { Select, Text, ThemeIcon, Group } from '@mantine/core'
import { AiOutlinePlus } from 'react-icons/ai'
import { VscGraph } from 'react-icons/vsc'



export default function AnalysisSelector({ data, create, selected, select }) {

    return (
        <Select
            data={data}
            placeholder="Select an Analysis"
            radius="xl"
            size="md"
            // icon={<BsFileBarGraph />}
            icon={<VscGraph />}
            creatable
            shouldCreate={() => true}
            onCreate={create}
            getCreateLabel={query => <Group>
                <ThemeIcon variant="light"><AiOutlinePlus /></ThemeIcon>
                <Text color="blue">New Analysis</Text>
            </Group>}
            onChange={select}
            value={selected}
            sx={selectStyle}
        />
    )
}


const selectStyle = theme => ({
    display: 'flex'
})

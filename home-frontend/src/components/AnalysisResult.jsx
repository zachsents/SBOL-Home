import { useState } from 'react'
import {
    Label,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ReferenceArea,
    ResponsiveContainer,
} from 'recharts'

import { useMantineTheme, ActionIcon, Button, Container, Group, Modal, Select, Space, Text, Title, Tooltip as MantineTooltip } from '@mantine/core'

import { MdZoomOutMap } from 'react-icons/md'
import { FiDownload } from 'react-icons/fi'
import { SiMicrosoftexcel, SiJpeg } from 'react-icons/si'
import { RiSingleQuotesR } from 'react-icons/ri'
import { BsImage } from 'react-icons/bs'


export default function AnalysisResult({ stopTime }) {

    const theme = useMantineTheme()

    // States
    const [data, setData] = useState(initialData)
    const [barIndex, setBarIndex] = useState()
    // const [left, setLeft] = useState('dataMin')
    // const [right, setRight] = useState('dataMax')
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(stopTime)
    const [refAreaLeft, setRefAreaLeft] = useState('')
    const [refAreaRight, setRefAreaRight] = useState('')
    // const [top, setTop] = useState('dataMax+1')
    // const [bottom, setBottom] = useState('dataMin-1')
    const [top, setTop] = useState(100)
    const [bottom, setBottom] = useState(0)
    const [top2, setTop2] = useState('dataMax+20')
    const [bottom2, setBottom2] = useState('dataMin-20')

    const [downloadModalOpen, setDownloadModalOpen] = useState(false)

    // Handle zooming
    const zoom = () => {

        let refLeft = refAreaLeft
        let refRight = refAreaRight

        if (refLeft === refRight || refRight === '') {
            setRefAreaLeft('')
            setRefAreaRight('')
            return
        }

        // xAxis domain
        if (refLeft > refRight) [refLeft, refRight] = [refRight, refLeft]

        // yAxis domain
        const bottomTop = getAxisYDomain(refLeft, refRight, 'LacI', 1)
        const bottomTop2 = getAxisYDomain(refLeft, refRight, 'GFP', 50)

        setRefAreaLeft('')
        setRefAreaRight('')
        setData(data.slice())
        setLeft(refLeft)
        setRight(refRight)
        // setBottom(bottomTop[0])
        // setTop(bottomTop[1])
        setBottom(Math.min(bottomTop[0], bottomTop2[0]))
        setTop(Math.max(bottomTop[1], bottomTop2[1]))
        setBottom2(bottomTop2[0])
        setTop2(bottomTop2[1])
    }

    // Handle resetting viewport to original zoom
    const zoomOut = () => {
        setRefAreaLeft('')
        setRefAreaRight('')
        setData(data.slice())
        setLeft(0)
        setRight(stopTime)
        setTop(100)
        setBottom(0)
        setTop2('dataMax+20')
        setBottom2('dataMin-20')
    }


    return (
        <>
            <Container size="xl" sx={{ userSelect: 'none' }}>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        width={800}
                        height={400}
                        data={data}
                        onMouseDown={e => setRefAreaLeft(e.activeLabel)}
                        onMouseMove={e => refAreaLeft && setRefAreaRight(e.activeLabel)}
                        onMouseUp={zoom}
                    >
                        <CartesianGrid strokeDasharray="6 6" />
                        <XAxis
                            label="Time (sec)"
                            tickCount={10}
                            interval={0}
                            allowDataOverflow
                            dataKey="name"
                            domain={[left, right]}
                            type="number" />
                        <YAxis
                            // label="Concentration (%)" // TO DO: figure out how to make label vertical
                            tickCount={10}
                            interval={0}
                            allowDataOverflow
                            domain={[bottom, top]}
                            type="number"
                            yAxisId="1" />
                        {/* <YAxis orientation="right" allowDataOverflow domain={[bottom2, top2]} type="number" yAxisId="2" /> */}
                        <Tooltip />
                        <Legend align="right" verticalAlign="insideTop" height={36} />
                        <Line yAxisId="1" type="monotone" dataKey="LacI" stroke={theme.colors.blue[5]} animationDuration={500} />
                        <Line yAxisId="1" type="monotone" dataKey="GFP" stroke={theme.colors.green[5]} animationDuration={500} />

                        {refAreaLeft && refAreaRight ? (
                            <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
                        ) : null}
                    </LineChart>
                </ResponsiveContainer>
                <Container size="xs">
                    <Group position="right">
                        <MantineTooltip label="Download">
                            <ActionIcon onClick={() => setDownloadModalOpen(true)}>
                                <FiDownload />
                            </ActionIcon>
                        </MantineTooltip>
                        <MantineTooltip label="Reset View">
                            <ActionIcon onClick={zoomOut}>
                                <MdZoomOutMap />
                            </ActionIcon>
                        </MantineTooltip>
                    </Group>
                </Container>
            </Container>
            <Modal title="Export & Download" opened={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} >
                <Text>Data</Text>
                <Space h="sm" />
                <Group>
                    <Button color="green" leftIcon={<SiMicrosoftexcel />} >Excel</Button>
                    <Button color="gray" leftIcon={<RiSingleQuotesR />} >CSV</Button>
                </Group>
                <Space h="xl" />
                <Text>Image</Text>
                <Space h="sm" />
                <Group>
                    <Button color="orange" leftIcon={<BsImage />} >PNG</Button>
                    <Button color="blue" leftIcon={<SiJpeg />} >JPEG</Button>
                </Group>
            </Modal>
        </>
    )
}


const getAxisYDomain = (from, to, ref, offset) => {
    const refData = initialData.slice(from - 1, to)
    let [bottom, top] = [refData[0][ref], refData[0][ref]]
    refData.forEach((d) => {
        if (d[ref] > top) top = d[ref]
        if (d[ref] < bottom) bottom = d[ref]
    })

    return [(bottom | 0) - offset, (top | 0) + offset]
}


const initialData = (() => {
    let arr = []
    for (let i = 0; i <= 50; i++)
        arr.push({
            name: '' + i,
            LacI: i == 0 ? Math.round(Math.random() * 100) : Math.round(arr[i - 1].LacI + Math.random() * 10 - 5),
            GFP: i == 0 ? Math.round(Math.random() * 100) : Math.round(arr[i - 1].GFP + Math.random() * 10 - 5),
        })
    return arr
})()
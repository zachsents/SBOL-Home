import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useForm } from '@mantine/form'
import { Group, Space, NumberInput, SegmentedControl, Button, Tooltip, Center, Overlay } from '@mantine/core'

import InputWrapper from './InputWrapper'
import FileUploadInput from './FileUploadInput'
import { useCurrentAnalysis } from './AnalyzeView'


export default function AnalysisForm() {

    const [project] = useOutletContext()
    const [analysis, modifyAnalysis, , analysisId] = useCurrentAnalysis()

    const form = useForm({
        initialValues: analysis?.form ? JSON.parse(analysis.form) : {},
        validate: {
            // email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    })

    // update analysis state when form changes
    useEffect(() => {
        const formValues = JSON.stringify(form.values)
        if (formValues != analysis.form) {
            modifyAnalysis({ form: formValues })
            console.debug('form change')
        }
    }, [form.values])

    // update form values when analysis is switched
    useEffect(() => {
        form.setValues(analysis?.form ? JSON.parse(analysis.form) : {})
    }, [analysis.id])

    // when values are submitted
    const onSubmit = async values => {
        modifyAnalysis({ running: true })

        // construct FormData for request
        const formData = new FormData()

        // set values from form
        Object.entries(values).map(([key, val]) => {
            // treat environment file differently
            if (key == 'environment') {
                // Currently, API can't take a file from the request for the environment
                // it only takes a path, so we won't send anything for now
                // if(val) {
                //     const { fileName, fileContents } = JSON.parse(val)
                //     formData.append(key, fileContents, fileName)
                // }
            }
            else
                formData.set(key, '' + val)
        })

        // add other parameters
        formData.set('user', 'test')
        formData.set('language', 'SBML')
        formData.set('allow_incomplete', '')

        // add SBOL file
        formData.append('file', new Blob([project.sbol]), 'sbol.xml')

        // make request
        const response = await (await fetch('http://localhost:3000/conversion-analysis', {
            method: 'POST',
            body: formData
        })).json()

        // take note of document to watch
        response.createdDocument && modifyAnalysis({ remoteDocument: response.createdDocument })        
    }


    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            {analysis?.running && <Overlay opacity={0.6} color="white" zIndex={5} />}
            <FileUploadInput label="Environment" {...form.getInputProps('environment')} />
            <Space h="xl" />
            <InputWrapper required label="Simulation Type" >
                <SegmentedControl
                    data={['ODE', 'HODE', 'SSA', 'HSSA', 'DFBA', 'JODE', 'JSSA']}
                    color="canvasBlue"
                    {...form.getInputProps('simulation')}
                />
            </InputWrapper>
            <Space h="xl" />
            <Group grow>
                <NumberInput required label="Initial Time" placeholder="" {...form.getInputProps('init_time')} />
                <NumberInput required label="Limit Time" placeholder="" {...form.getInputProps('lim_time')} />
                <NumberInput required label="Output Time" placeholder="" {...form.getInputProps('out_time')} />
            </Group>
            <Space h="lg" />
            <Group grow>
                <NumberInput required label="Minimum Step" placeholder="" {...form.getInputProps('min_step')} />
                <NumberInput required label="Maximum Step" placeholder="" {...form.getInputProps('max_step')} />
            </Group>
            <Space h="lg" />
            <Group grow>
                <NumberInput required label="Absolute Error" placeholder="" {...form.getInputProps('abs_err')} />
                <NumberInput required label="Relative Error" placeholder="" {...form.getInputProps('rel_err')} />
            </Group>
            <Space h="lg" />
            <Group grow>
                <NumberInput required label="Number of Runs" placeholder="" {...form.getInputProps('runs')} />
                <NumberInput required label="Output Interval" placeholder="" {...form.getInputProps('print_interval')} />
                <Tooltip label="Leave blank for random" position="bottom">
                    <NumberInput label="Seed" {...form.getInputProps('seed')} />
                </Tooltip>
            </Group>
            <Space h="lg" />
            <Center>
                <Button type="submit" gradient={{ from: "canvasBlue", to: "indigo" }} variant="gradient" radius="xl">Run Analysis</Button>
            </Center>
            <Space h={40} />
        </form>
    )
}

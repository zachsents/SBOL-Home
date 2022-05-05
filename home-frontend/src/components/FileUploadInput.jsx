import { useRef, useEffect, useState } from 'react'

import { Input, Button, Text } from '@mantine/core'

import { BsFileEarmarkCode } from 'react-icons/bs'

import InputWrapper from './InputWrapper'


export default function FileUploadInput({ label, onChange, value, ...props }) {

    const inputRef = useRef()
    const [file, setFile] = useState(value && JSON.parse(value))

    // update state when file is uploaded
    const fileInputUpload = () => {
        const uploaded = inputRef.current?.files?.[0]
        if (uploaded) {
            var reader = new FileReader()
            reader.readAsText(uploaded, "UTF-8")
            reader.onload = e => setFile({ name: uploaded.name, contents: e.target.result })
            reader.onerror = e => console.log("error reading file")
        }
        console.log('upload')
    }

    // update file when 
    useEffect(() => {
        value && setFile(JSON.parse(value))
    }, [value])
    
    // reflect file changes in onChange prop function
    useEffect(() => {
        onChange(JSON.stringify(file))
    }, [file])

    return (
        <InputWrapper label={label} >
            <label>
                <Input ref={inputRef} type="file" styles={inputStyles} onChange={fileInputUpload} {...props} />
                <Button
                    color="canvasBlue"
                    variant="outline"
                    leftIcon={<BsFileEarmarkCode />}
                    onClick={() => inputRef.current.click()}
                >
                    {file?.name || "Upload a file"}
                </Button>
            </label>
        </InputWrapper>
    )
}


const inputStyles = theme => ({
    input: {
        display: 'none'
    }
})
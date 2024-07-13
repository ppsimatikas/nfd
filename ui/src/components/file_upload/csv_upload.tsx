import React, {useState} from 'react';
import {Dropzone, MIME_TYPES} from '@mantine/dropzone';
import {Button, Group, Text} from '@mantine/core';
import {IconCloudUpload} from "@tabler/icons-react";
import Papa from 'papaparse';
import {UiTable} from "../table";

function CsvUpload({onChange}: { onChange: (data: any[]) => void }) {
    const [files, setFiles] = useState([]);
    const [fileContent, setFileContent] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleDrop = (acceptedFiles: any) => {
        setFiles(acceptedFiles);
        readFileContent(acceptedFiles[0]);
    };

    const readFileContent = (file: any) => {
        const reader = new FileReader();
        setLoading(true);
        reader.onload = (event: any) => {
            const csv = event.target.result;
            const data = Papa.parse(csv, {
                header: true,
                dynamicTyping: true
            }).data
            setFileContent(data as any)
            onChange(data)
            setLoading(false)
        };
        reader.readAsText(file);
    };

    return (
        <div>
            {files.length === 0 &&
                <Dropzone
                    loading={loading}
                    onDrop={handleDrop}
                    accept={[MIME_TYPES.csv]}
                    multiple={false}
                >
                    <Group justify="center" style={{minHeight: 200, pointerEvents: 'none'}}>
                        <div>
                            <IconCloudUpload size={60} color="gray"/>
                            <Text size="xl" inline>
                                Drag CSV files here or click to select files
                            </Text>
                            <Text size="sm" c="dimmed" inline mt={7}>
                                Only *.csv files are accepted
                            </Text>
                        </div>
                    </Group>
                </Dropzone>
            }

            {files.length > 0 && (
                <Group justify="center" align="center" m={20}>
                    <Text fw="bold" mt={15}>Uploaded file:</Text>
                    {files.map((file: any) => (
                        <Text mt={15} key={file.name}>{file.name}</Text>
                    ))}
                    <Button onClick={() => {
                        setFiles([])
                        setFileContent([])
                        onChange([])
                    }} mt="md">Clear</Button>
                </Group>
            )}
            {fileContent && fileContent.length > 0 && (
                <UiTable data={fileContent}/>
            )}
        </div>
    );
}

export default CsvUpload;

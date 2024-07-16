import {useForm} from "@mantine/form";
import {Autocomplete, Button, ComboboxStringData, Group, Stack, Textarea, TextInput} from "@mantine/core";
import CsvUpload from "../components/file_upload/csv_upload";
import {useEffect, useState} from "react";
import {UiLoader} from "../components/loader";
import {uploadData} from "../services/tables";
import {toastError, toastSuccess} from "../components/ui-toast";
import {useNavigate} from "react-router-dom";
import {useGetSchemas, registerSchema} from '../data-access/tableland';

function Upload() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm({
        initialValues: {
            domain: 'agriculture',
            table: '',
            description: '',
            data: [] as any[]
        },
    })

    const {data: schemasData, isLoading: schemasIsLoading} = useGetSchemas();

    const submit = async (formData: any) => {
        setLoading(true)
        try {
            const response = await uploadData(formData)
            await registerSchema()
            toastSuccess("Your dataset was created successfully !")
        } catch (e) {
            toastError("There was an error creating your dataset.")
        } finally {
            setLoading(false)
        }
    }

    const formSize = 'lg'
    const canSubmit = form.getValues().domain && form.getValues().table && form.getValues().data.length > 0;

    return (
        <form onSubmit={form.onSubmit((values) => submit(values))}>
            {loading && UiLoader()}
            <Stack>
                <TextInput
                    size={formSize}
                    radius="lg"
                    label="Domain"
                    withAsterisk
                    disabled
                    value={form.getValues().domain}
                    onChange={(event) => form.setFieldValue('domain', event.currentTarget.value)}
                />
                <Autocomplete
                    size={formSize}
                    radius="lg"
                    label="Table"
                    withAsterisk
                    placeholder={schemasIsLoading ? 'loading' : undefined}
                    disabled={schemasIsLoading}
                    value={form.getValues().table}
                    onChange={(value) => form.setFieldValue('table', value)}
                    data={schemasData as unknown as ComboboxStringData}
                />
                <Textarea
                    size={formSize}
                    radius="lg"
                    label="Description"
                    value={form.getValues().description ?? ''}
                    onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
                />
                <CsvUpload onChange={(data) => form.setFieldValue('data', data)}/>
                <Group justify="right">
                    <Button size={formSize} type="submit" disabled={!canSubmit}>
                        Create
                    </Button>
                </Group>
            </Stack>
        </form>
    );
}

export default Upload;

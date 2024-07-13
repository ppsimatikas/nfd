import {useForm} from "@mantine/form";
import {Button, Group, Stack, Textarea, TextInput} from "@mantine/core";
import CsvUpload from "../components/file_upload/csv_upload";
import {useState} from "react";
import {UiLoader} from "../components/loader";
import {uploadData} from "../services/tables";
import {toastError, toastSuccess} from "../components/ui-toast";
import {useNavigate} from "react-router-dom";

function Create() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    let initialValues = {
        domain: 'agriculture',
        table: '',
        description: '',
        data: [] as any[]
    };
    const form = useForm({
        initialValues,
    })

    const submit = (formData: any) => {
        setLoading(true)
        uploadData(formData)
            .then(() => {
                toastSuccess("Your dataset was created successfully !")
                navigate('/')
            })
            .catch(() => toastError("There was an error creating your dataset."))
            .finally(() => setLoading(false));
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
                    value={form.getValues().domain}
                    onChange={(event) => form.setFieldValue('domain', event.currentTarget.value)}
                />
                <TextInput
                    size={formSize}
                    radius="lg"
                    label="Table"
                    withAsterisk
                    value={form.getValues().table}
                    onChange={(event) => form.setFieldValue('table', event.currentTarget.value)}
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

export default Create;

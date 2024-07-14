import React, {useState} from 'react';
import {Center, Grid, Loader, Stack, Text, Textarea, Title} from "@mantine/core";
import TreeView from "../components/tree/treeView";
import {UiTable} from "../components/table";
import {useSql} from "../data-access/use_sql";
import {IconTerminal} from "@tabler/icons-react";


const LandingPage: React.FC = () => {
    const [table, setTable] = useState('crops_and_livestock')
    const [input, setInput] = useState('')
    const [query, setQuery] = useState('')
    const {data, isLoading, error} = useSql(table, query)

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setQuery(input)
        }
    };

    // Sample tree data (adjust as per your needs)
    const treeData = [
        {
            value: 'agriculture',
            label: 'agriculture',
            children: [
                {
                    value: 'crops_and_livestock',
                    label: 'crops_and_livestock',
                    children: [
                        {
                            value: 'date',
                            label: <Text c="dimmed">date (datetime)</Text>,
                        }
                    ]
                },
                {
                    value: 'hunger_levels',
                    label: 'hunger_levels',
                    children: [
                        {
                            value: 'date',
                            label: <Text c="dimmed">date (datetime)</Text>,
                        }
                    ]
                },
            ],
        },
    ];

    return (
        <Grid>
            <Grid.Col span={3}>
                <Stack>
                    <Title order={3}>Demeter's Datasets</Title>
                    <TreeView data={treeData}/>
                </Stack>
            </Grid.Col>
            <Grid.Col span={9}>
                <Stack pl={25} pt={5}>
                    <Text>Ask Demeter anything using SQL queries...</Text>
                    <Textarea
                        leftSection={<IconTerminal style={{
                            position: 'absolute',
                            top: 7
                        }}/>}
                        radius="md"
                        size="md"
                        mt={15}
                        placeholder="Write a SQL query..."
                        styles={(theme) => ({
                            input: {
                                backgroundColor: 'black',
                                color: 'gray',
                                height: 200
                            },
                        })}
                        value={input}
                        onKeyDown={handleKeyDown}
                        onChange={e => setInput(e.target.value)}
                    />
                    {data && <UiTable data={data}/>}
                    {!data && !isLoading && <Text>Select a table and write a SQL query above</Text>}
                    {isLoading && <Center><Loader/></Center>}
                    {error && <Text c='red'>Please check your SQL query and try again...</Text>}
                </Stack>
            </Grid.Col>
        </Grid>
    );
};

export default LandingPage;
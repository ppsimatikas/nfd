import {Table} from "@mantine/core";
import React from "react";

export function UiTable({data}: { data: any[] }) {
    const columns = data.length ? Object.keys(data[0]) : []

    return (
        <Table.ScrollContainer minWidth={500} type="native">
            <Table border={1}>
                <Table.Thead>
                    <Table.Tr>
                        {columns.map((c: string) => <Table.Th>{c}</Table.Th>)}
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {
                        data.slice(0, 10).map((d: any, i) => (
                            <Table.Tr key={i}>
                                {columns.map((column: any) => <Table.Td align="left">{d[column]}</Table.Td>)}
                            </Table.Tr>
                        ))
                    }
                </Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}
import {createConfig, http, reconnect, readContract} from '@wagmi/core'

import {arbitrumSepolia} from '@wagmi/core/chains'
import {useQuery} from '@tanstack/react-query'

import artifacts from "../utils/domain.contract.json"

// TODO make envs
const DOMAIN_CONTRACT = "0xf7cde26bdebc450807d5381001d535f28b45ea78"
const TABLELAND_API = "https://testnets.tableland.network/api/v1"

export const wagmiConfig = createConfig({
    chains: [arbitrumSepolia],
    transports: {
        [arbitrumSepolia.id]: http('https://api.calibration.node.glif.io/rpc/v1')
    }
})

export function useGetSchemas() {
    return useQuery({
        queryKey: ['schemas'],
        queryFn: async () => {
            console.log('aaa');
            reconnect(wagmiConfig);
            try {
                const tables: any = await readContract(wagmiConfig, {
                    abi: artifacts.contractTypes.Domain.abi,
                    address: DOMAIN_CONTRACT,
                    functionName: 'name',
                })
                console.log(tables)
            } catch (e) {
                console.error(e)
            }

            


            //const query = `select * from ${tables.schema[1]}`
            //const response = await fetch(`${TABLELAND_API}/query?statement=${query}`)
            //console.log(await response.json())
        },
        staleTime: 60000 * 5, // 5 minutes
    })
}
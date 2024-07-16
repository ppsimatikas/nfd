import {createConfig, http, reconnect, readContract} from '@wagmi/core'

import {arbitrumSepolia, hardhat} from '@wagmi/core/chains'
import {useQuery} from '@tanstack/react-query'

import artifacts from "../utils/domain.contract.json"


export const wagmiConfig = createConfig({
    chains: [arbitrumSepolia, hardhat],
    transports: {
        [arbitrumSepolia.id]: http('https://api.calibration.node.glif.io/rpc/v1'),
        [hardhat.id]: http('http://localhost:8545')
    }
})

export function useGetSchemas() {
    return useQuery({
        queryKey: ['schemas'],
        queryFn: async () => {
            reconnect(wagmiConfig);
            const tables: any = await readContract(wagmiConfig, {
                abi: artifacts.contractTypes.Domain.abi,
                address: process.env.REACT_APP_DOMAIN_CONTRACT as `0x${string}`,
                functionName: 'tables',
            })
            console.log(tables)
            const query = `select * from ${tables[0].name}`
            
            const response = await fetch(`${process.env.REACT_APP_TABLELAND_API}/query?statement=${query}`)
            console.log(await response.json())


            


            
        },
        staleTime: 60000 * 5, // 5 minutes
    })
}

export async function registerSchema() {
    return true
}
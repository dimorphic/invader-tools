import { Contract, ContractInterface } from "ethers"
import { useWeb3React } from "@web3-react/core"
import { useMemo } from "react"

export function useContract(address?: string, ABI?: ContractInterface, withSigner = false): Contract | undefined {
	const { library, account } = useWeb3React()

	return useMemo(
		() =>
			!!address && !!ABI && !!library
				? new Contract(address, ABI, withSigner ? library.getSigner(account).connectUnchecked() : library)
				: undefined,
		[address, ABI, withSigner, library, account]
	)
}

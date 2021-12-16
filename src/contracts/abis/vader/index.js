module.exports = [{ 'inputs':[], 'stateMutability':'nonpayable', 'type':'constructor' }, { 'anonymous':false, 'inputs':[{ 'indexed':true, 'internalType':'address', 'name':'owner', 'type':'address' }, { 'indexed':true, 'internalType':'address', 'name':'spender', 'type':'address' }, { 'indexed':false, 'internalType':'uint256', 'name':'value', 'type':'uint256' }], 'name':'Approval', 'type':'event' }, { 'anonymous':false, 'inputs':[{ 'indexed':false, 'internalType':'uint256', 'name':'amount', 'type':'uint256' }, { 'indexed':false, 'internalType':'uint256', 'name':'lastEmission', 'type':'uint256' }], 'name':'Emission', 'type':'event' }, { 'anonymous':false, 'inputs':[{ 'indexed':false, 'internalType':'uint256', 'name':'previous', 'type':'uint256' }, { 'indexed':false, 'internalType':'uint256', 'name':'next', 'type':'uint256' }], 'name':'EmissionChanged', 'type':'event' }, { 'anonymous':false, 'inputs':[{ 'indexed':true, 'internalType':'address', 'name':'beneficiary', 'type':'address' }, { 'indexed':false, 'internalType':'uint256', 'name':'amount', 'type':'uint256' }], 'name':'GrantClaimed', 'type':'event' }, { 'anonymous':false, 'inputs':[{ 'indexed':false, 'internalType':'uint256', 'name':'previous', 'type':'uint256' }, { 'indexed':false, 'internalType':'uint256', 'name':'next', 'type':'uint256' }], 'name':'MaxSupplyChanged', 'type':'event' }, { 'anonymous':false, 'inputs':[{ 'indexed':true, 'internalType':'address', 'name':'previousOwner', 'type':'address' }, { 'indexed':true, 'internalType':'address', 'name':'newOwner', 'type':'address' }], 'name':'OwnershipTransferred', 'type':'event' }, { 'anonymous':false, 'inputs':[{ 'indexed':false, 'internalType':'address', 'name':'converter', 'type':'address' }, { 'indexed':false, 'internalType':'address', 'name':'vest', 'type':'address' }, { 'indexed':false, 'internalType':'address', 'name':'usdv', 'type':'address' }, { 'indexed':false, 'internalType':'address', 'name':'dao', 'type':'address' }], 'name':'ProtocolInitialized', 'type':'event' }, { 'anonymous':false, 'inputs':[{ 'indexed':true, 'internalType':'address', 'name':'from', 'type':'address' }, { 'indexed':true, 'internalType':'address', 'name':'to', 'type':'address' }, { 'indexed':false, 'internalType':'uint256', 'name':'value', 'type':'uint256' }], 'name':'Transfer', 'type':'event' }, { 'inputs':[{ 'internalType':'uint256', 'name':'_emissionCurve', 'type':'uint256' }], 'name':'adjustEmission', 'outputs':[], 'stateMutability':'nonpayable', 'type':'function' }, { 'inputs':[{ 'internalType':'uint256', 'name':'_maxSupply', 'type':'uint256' }], 'name':'adjustMaxSupply', 'outputs':[], 'stateMutability':'nonpayable', 'type':'function' }, { 'inputs':[{ 'internalType':'address', 'name':'owner', 'type':'address' }, { 'internalType':'address', 'name':'spender', 'type':'address' }], 'name':'allowance', 'outputs':[{ 'internalType':'uint256', 'name':'', 'type':'uint256' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[{ 'internalType':'address', 'name':'spender', 'type':'address' }, { 'internalType':'uint256', 'name':'amount', 'type':'uint256' }], 'name':'approve', 'outputs':[{ 'internalType':'bool', 'name':'', 'type':'bool' }], 'stateMutability':'nonpayable', 'type':'function' }, { 'inputs':[{ 'internalType':'address', 'name':'account', 'type':'address' }], 'name':'balanceOf', 'outputs':[{ 'internalType':'uint256', 'name':'', 'type':'uint256' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[], 'name':'calculateFee', 'outputs':[{ 'internalType':'uint256', 'name':'basisPoints', 'type':'uint256' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[{ 'internalType':'address', 'name':'beneficiary', 'type':'address' }, { 'internalType':'uint256', 'name':'amount', 'type':'uint256' }], 'name':'claimGrant', 'outputs':[], 'stateMutability':'nonpayable', 'type':'function' }, { 'inputs':[], 'name':'converter', 'outputs':[{ 'internalType':'contract IConverter', 'name':'', 'type':'address' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[], 'name':'decimals', 'outputs':[{ 'internalType':'uint8', 'name':'', 'type':'uint8' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[{ 'internalType':'address', 'name':'spender', 'type':'address' }, { 'internalType':'uint256', 'name':'subtractedValue', 'type':'uint256' }], 'name':'decreaseAllowance', 'outputs':[{ 'internalType':'bool', 'name':'', 'type':'bool' }], 'stateMutability':'nonpayable', 'type':'function' }, { 'inputs':[], 'name':'emissionCurve', 'outputs':[{ 'internalType':'uint256', 'name':'', 'type':'uint256' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[], 'name':'getCurrentEraEmission', 'outputs':[{ 'internalType':'uint256', 'name':'', 'type':'uint256' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[{ 'internalType':'uint256', 'name':'currentSupply', 'type':'uint256' }], 'name':'getEraEmission', 'outputs':[{ 'internalType':'uint256', 'name':'', 'type':'uint256' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[{ 'internalType':'address', 'name':'spender', 'type':'address' }, { 'internalType':'uint256', 'name':'addedValue', 'type':'uint256' }], 'name':'increaseAllowance', 'outputs':[{ 'internalType':'bool', 'name':'', 'type':'bool' }], 'stateMutability':'nonpayable', 'type':'function' }, { 'inputs':[], 'name':'lastEmission', 'outputs':[{ 'internalType':'uint256', 'name':'', 'type':'uint256' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[], 'name':'maxSupply', 'outputs':[{ 'internalType':'uint256', 'name':'', 'type':'uint256' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[], 'name':'name', 'outputs':[{ 'internalType':'string', 'name':'', 'type':'string' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[], 'name':'owner', 'outputs':[{ 'internalType':'address', 'name':'', 'type':'address' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[], 'name':'renounceOwnership', 'outputs':[], 'stateMutability':'nonpayable', 'type':'function' }, { 'inputs':[{ 'internalType':'contract IConverter', 'name':'_converter', 'type':'address' }, { 'internalType':'contract ILinearVesting', 'name':'_vest', 'type':'address' }, { 'internalType':'contract IUSDV', 'name':'_usdv', 'type':'address' }, { 'internalType':'address', 'name':'dao', 'type':'address' }], 'name':'setComponents', 'outputs':[], 'stateMutability':'nonpayable', 'type':'function' }, { 'inputs':[], 'name':'symbol', 'outputs':[{ 'internalType':'string', 'name':'', 'type':'string' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[], 'name':'syncEmissions', 'outputs':[], 'stateMutability':'nonpayable', 'type':'function' }, { 'inputs':[], 'name':'totalSupply', 'outputs':[{ 'internalType':'uint256', 'name':'', 'type':'uint256' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[{ 'internalType':'address', 'name':'recipient', 'type':'address' }, { 'internalType':'uint256', 'name':'amount', 'type':'uint256' }], 'name':'transfer', 'outputs':[{ 'internalType':'bool', 'name':'', 'type':'bool' }], 'stateMutability':'nonpayable', 'type':'function' }, { 'inputs':[{ 'internalType':'address', 'name':'sender', 'type':'address' }, { 'internalType':'address', 'name':'recipient', 'type':'address' }, { 'internalType':'uint256', 'name':'amount', 'type':'uint256' }], 'name':'transferFrom', 'outputs':[{ 'internalType':'bool', 'name':'', 'type':'bool' }], 'stateMutability':'nonpayable', 'type':'function' }, { 'inputs':[{ 'internalType':'address', 'name':'newOwner', 'type':'address' }], 'name':'transferOwnership', 'outputs':[], 'stateMutability':'nonpayable', 'type':'function' }, { 'inputs':[{ 'internalType':'address', 'name':'', 'type':'address' }], 'name':'untaxed', 'outputs':[{ 'internalType':'bool', 'name':'', 'type':'bool' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[], 'name':'usdv', 'outputs':[{ 'internalType':'contract IUSDV', 'name':'', 'type':'address' }], 'stateMutability':'view', 'type':'function' }, { 'inputs':[], 'name':'vest', 'outputs':[{ 'internalType':'contract ILinearVesting', 'name':'', 'type':'address' }], 'stateMutability':'view', 'type':'function' }]
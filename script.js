const votePubkey="AwSna46Utw2Wq4GusBmDLkFwXv8SmJumduA5Da1EH6kY"

async function loadValidator(){

const res=await fetch("https://api.mainnet-beta.solana.com",{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

jsonrpc:"2.0",

id:1,

method:"getVoteAccounts"

})

})

const data=await res.json()

const validator=data.result.current.find(v=>v.votePubkey===votePubkey)

if(!validator){

document.getElementById("valStatus").innerText="Not Found"

return

}

document.getElementById("valStatus").innerText="Active"

document.getElementById("valStake").innerText=

(validator.activatedStake/1000000000).toFixed(2)+" SOL"

document.getElementById("valCommission").innerText=

validator.commission+"%"

document.getElementById("valVote").innerText=

validator.lastVote

document.getElementById("valCredits").innerText=

validator.epochCredits.slice(-1)[0][1]

}

loadValidator()

function copyText(text){

navigator.clipboard.writeText(text)

}
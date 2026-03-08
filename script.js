const voteKey = "AwSna46Utw2Wq4GusBmDLkFwXv8SmJumduA5Da1EH6kY";

async function loadValidator(){

try{

const res = await fetch("https://rpc.mainnet.x1.xyz",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({
jsonrpc:"2.0",
id:1,
method:"getVoteAccounts"
})
});

const data = await res.json();

const validators = [
...data.result.current,
...data.result.delinquent
];

const val = validators.find(v => v.votePubkey === voteKey);

if(!val){
document.getElementById("valStatus").innerText="Not Found";
return;
}

document.getElementById("valStatus").innerText =
data.result.current.find(v=>v.votePubkey===voteKey) ? "Active" : "Delinquent";

document.getElementById("valStake").innerText =
(val.activatedStake / 1000000000).toFixed(2) + " XNT";

document.getElementById("valCommission").innerText =
val.commission + "%";

document.getElementById("valVote").innerText =
val.lastVote;

document.getElementById("valCredits").innerText =
val.epochCredits[val.epochCredits.length-1][1];

}catch(err){

console.log(err);

}

}

loadValidator();

/* refresh every 30 seconds */

setInterval(loadValidator,30000);

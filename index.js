var isExtensionInstalled = false;
var address = null;
var option = 0;

$(document).ready(function () {
    checkExtensionStatus()
    bindConnectButton()
})

function checkExtensionStatus() {
    if (window.empow) {
        isExtensionInstalled = true;
        addAlert('success', 'Empow Wallet Extension is installed')
    } else {
        addAlert('danger', 'You need install Empow Wallet Extension first')
    }
}

function bindConnectButton() {
    $(".btn-connect").click(async function () {
        if (!isExtensionInstalled) return addAlert('danger', 'Please install Empow Wallet Extension')
        addAlert('primary', 'Connecting...')
        try {
            address = await window.empow.enable()

            const balance = await window.empow.rpc.blockchain.getBalance(address)

            $(".alert-primary").remove()
            addAlert('success', `Connected and Address: ${address}<br>Balance: ${balance.balance} EM`)
            $("#connect").hide()

            showSendTransactionElements()
        } catch (error) {
            $(".alert-primary").remove()
            addAlert('danger', error)
        }
    })
}

function showSendTransactionElements() {
    $("#send-transaction").show()
    $("#all-functions").show()
    bindOnClickFunction()
    bindSummitButton()
}

// function bindSendTransactionButton() {
//     $(".btn-send").click(async function (e) {

//         e.preventDefault()

//         addAlert('primary', 'Sending...')

//         const contractName = $(".contract-name").val()
//         const functionName = $(".function-name").val()
//         let args = $(".args").val()

//         try {
//             args = JSON.parse(args)
//         } catch {
//             addAlert("danger", `Argument not correct. Example: ["em", "address1", "address2", "100", "memo"]`)
//             return;
//         }

//         const tx = window.empow.callABI(contractName, functionName, args)
//         tx.addApprove("*", "unlimited")
//         const handler = window.empow.signAndSend(tx)

//         handler.on("pending", (hash) => {
//             addAlert("warning", `transaction on pending: ${hash}`)
//         })

//         handler.on("failed", (error) => {
//             addAlert("danger", `transaction failed ${error}`)
//         })

//         handler.on("success", (res) => {
//             addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
//         })
//     })
// }

function addAlert(type, message) {

    let html = `<div class="alert alert-${type} fade show" role="alert"><strong>${message}</strong></div>`

    $(".container").prepend(html)
}

function bindOnClickFunction() {
    $(".transfer").click(async function (e) {
        option = 0;
        toggleOption()
    })

    $(".pledgegas").click(async function (e) {
        option = 1;
        toggleOption()
    })

    $(".unpledgegas").click(async function (e) {
        option = 2;
        toggleOption()
    })

    $(".sellram").click(async function (e) {
        option = 3;
        toggleOption()
    })

    $(".buyram").click(async function (e) {
        option = 4;
        toggleOption()
    })

    $(".stake").click(async function (e) {
        option = 5;
        toggleOption()
    })

    $(".withdrawstake").click(async function (e) {
        option = 6;
        toggleOption()
    })

    $(".unstake").click(async function (e) {
        option = 7;
        toggleOption()
    })

    $(".withdrawstakeall").click(async function (e) {
        option = 8;
        toggleOption()
    })

    $(".producerregister").click(async function (e) {
        option = 9;
        toggleOption()
    })

    $(".producerupdate").click(async function (e) {
        option = 10;
        toggleOption()
    })

    $(".producerlogin").click(async function (e) {
        option = 11;
        toggleOption()
    })

    $(".producerlogout").click(async function (e) {
        option = 12;
        toggleOption()
    })

    $(".producerwithdraw").click(async function (e) {
        option = 13;
        toggleOption()
    })

    $(".voteforproducer").click(async function (e) {
        option = 14;
        toggleOption()
    })

    $(".unvoteforproducer").click(async function (e) {
        option = 15;
        toggleOption()
    })
}

function toggleOption() {
    $("#pledgegas").hide()
    $("#unpledgegas").hide()
    $("#buyram").hide()
    $("#transfer").hide()
    $("#sellram").hide()

    $("#stake").hide()
    $("#withdrawstake").hide()
    $("#unstake").hide()
    $("#withdrawstakeall").hide()
    
    $("#producerregister").hide()
    $("#producerupdate").hide()
    $("#producerlogin").hide()
    $("#producerlogout").hide()
    $("#producerwithdraw").hide()
    $("#voteforproducer").hide()
    $("#unvoteforproducer").hide()

    if (option === 0) {
        $("#transfer").show()
    }

    if (option === 1) {
        $("#pledgegas").show()
    }

    if (option === 2) {
        $("#unpledgegas").show()
    }

    if (option === 3) {
        $("#sellram").show()
    }

    if (option === 4) {
        $("#buyram").show()
    }

    if (option === 5) {
        $("#stake").show()
    }

    if (option === 6) {
        $("#withdrawstake").show()
    }

    if (option === 7) {
        $("#unstake").show()
    }

    if (option === 8) {
        $("#withdrawstakeall").show()
    }

    if (option === 9) {
        $("#producerregister").show()
    }

    if (option === 10) {
        $("#producerupdate").show()
    }

    if (option === 11) {
        $("#producerlogin").show()
    }

    if (option === 12) {
        $("#producerlogout").show()
    }

    if (option === 13) {
        $("#producerwithdraw").show()
    }

    if (option === 14) {
        $("#voteforproducer").show()
    }

    if (option === 15) {
        $("#unvoteforproducer").show()
    }
}

function bindSummitButton() {
    $(".btn-send").click(async function (e) {
        if (option === 0) {
            bindSendTransactionButton(e)
        }

        if (option === 1) {
            bindPledgeGasButton(e)
        }

        if (option === 2) {
            bindUnpledgeGasButton(e)
        }

        if (option === 3) {
            bindSellRamButton(e)
        }

        if (option === 4) {
            bindBuyRamButton(e)
        }

        if (option === 5) {
            bindStakeButton(e)
        }

        if (option === 6) {
            bindWithdrawStakeButton(e)
        }

        if (option === 7) {
            bindUnstakeButton(e)
        }

        if (option === 8) {
            bindWithdrawAllStakeButton(e)
        }

        if (option === 9) {
            bindProducerRegisterButton(e)
        }

        if (option === 10) {
            bindProducerUpdateButton(e)
        }

        if (option === 11) {
            bindProducerLoginButton(e)
        }

        if (option === 12) {
            bindProducerLogoutButton(e)
        }

        if (option === 13) {
            bindProducerWithdrawButton(e)
        }

        if (option === 14) {
            bindVoteForProducerButton(e)
        }

        if (option === 15) {
            bindUnVoteForProducerButton(e)
        }
    })
}

function bindSendTransactionButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const to = $("#transfer .to").val()
    const value = $("#transfer .amount").val()
    const memo = $("#transfer .memo").val()

    const tx = window.empow.callABI("token.empow", "transfer", ["em", address, to, value, memo])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}

function bindPledgeGasButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const to = $("#transfer .to").val()
    const value = $("#transfer .amount").val()

    const tx = window.empow.callABI("gas.empow", "pledge", [address, to, value])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}

function bindUnpledgeGasButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const value = $("#unpledgegas .amount").val()

    const tx = window.empow.callABI("gas.empow", "unpledge", [address, address, value])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}

function bindSellRamButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const value = $("#sellram .amount").val()

    const tx = window.empow.callABI("ram.empow", "sell", [address, address, value])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}

function bindBuyRamButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const to = $("#buyram .to").val()
    const value = $("#buyram .amount").val()

    const tx = window.empow.callABI("ram.empow", "buy", [address, to, value])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}

function bindStakeButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const value = $("#stake .amount").val()

    const tx = window.empow.callABI("stake.empow", "stake", [address, value])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}

function bindWithdrawStakeButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const packageID = parseInt($("#withdrawstake .packageID").val())

    const tx = window.empow.callABI("stake.empow", "withdraw", [address, packageID])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}

function bindUnstakeButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const packageID = parseInt($("#unstake .packageID").val())

    const tx = window.empow.callABI("stake.empow", "unstake", [address, packageID])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}

function bindWithdrawAllStakeButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const tx = window.empow.callABI("stake.empow", "withdrawAll", [address])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}

function bindProducerRegisterButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const networkPublicKey = $("#producerregister .producerregister").val()
    const location = $("#producerregister .location").val()
    const url = $("#producerregister .url").val()
    const networkID = $("#producerregister .networkID").val()

    const tx = window.empow.callABI("vote_producer.empow", "applyRegister", [address, networkPublicKey, location, url, networkID])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}

function bindProducerUpdateButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const networkPublicKey = $("#producerupdate .producerregister").val()
    const location = $("#producerupdate .location").val()
    const url = $("#producerupdate .url").val()
    const networkID = $("#producerupdate .networkID").val()

    const tx = window.empow.callABI("vote_producer.empow", "updateProducer", [address, networkPublicKey, location, url, networkID])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}

function bindProducerLoginButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const tx = window.empow.callABI("vote_producer.empow", "logInProducer", [address])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}

function bindProducerLogoutButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const tx = window.empow.callABI("vote_producer.empow", "logOutProducer", [address])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}

function bindProducerWithdrawButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const tx = window.empow.callABI("vote_producer.empow", "candidateWithdraw", [address])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}

function bindVoteForProducerButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const producerAddress = $("#voteforproducer .producerAddress").val()
    const voteAmount = $("#voteforproducer .voteAmount").val()

    const tx = window.empow.callABI("vote_producer.empow", "vote", [address, producerAddress, voteAmount])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}

function bindUnVoteForProducerButton(e) {
    e.preventDefault()

    addAlert('primary', 'Sending...')

    const producerAddress = $("#unvoteforproducer .producerAddress").val()
    const voteAmount = $("#unvoteforproducer .voteAmount").val()

    const tx = window.empow.callABI("vote_producer.empow", "unvote", [address, producerAddress, voteAmount])

    tx.addApprove("*", "unlimited")

    const handler = window.empow.signAndSend(tx)

    handler.on("pending", (hash) => {
        addAlert("warning", `transaction on pending: ${hash}`)
    })

    handler.on("failed", (error) => {
        addAlert("danger", `transaction failed ${error}`)
    })

    handler.on("success", (res) => {
        addAlert("success", `transaction success <br><pre>${JSON.stringify(res, null, 2)}<pre>`)
    })
}
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
var isExtensionInstalled = false;
var address = null;

$(document).ready(function () {
    checkExtensionStatus()
    bindConnectButton()
})

function checkExtensionStatus() {
    if(window.empow) {
        isExtensionInstalled = true;
        addAlert('success', 'Empow Wallet Extension is installed')
    } else {
        addAlert('danger', 'You need install Empow Wallet Extension first')
    }
}

function bindConnectButton () {
    $(".btn-connect").click(async function () {
        if(!isExtensionInstalled) return addAlert('danger', 'Please install Empow Wallet Extension')
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

function showSendTransactionElements () {
    $("#send-transaction").show()
    bindSendTransactionButton()
}

function bindSendTransactionButton () {
    $(".btn-send").click(async function (e) {

        e.preventDefault()

        addAlert('primary', 'Sending...')

        const contractName = $(".contract-name").val()
        const functionName = $(".function-name").val()
        let args = $(".args").val()

        try {
            args = JSON.parse(args)
        } catch {
            addAlert("danger", `Argument not correct. Example: ["em", "address1", "address2", "100", "memo"]`)
            return;
        }

        const tx = window.empow.callABI(contractName, functionName, args)
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
    })
}

function addAlert(type, message) {

    let html = `<div class="alert alert-${type} fade show" role="alert"><strong>${message}</strong></div>`

    $(".container").prepend(html)
}
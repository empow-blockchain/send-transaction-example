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
    $("#all-functions").show()
    $("#send-transaction").show()
    bindOnClickFunction()
    bindFunctionButton()
    bindSummitButton()
}

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

    $(".withdrawblockreward").click(async function (e) {
        option = 16;
        toggleOption()
    })

    $(".socialpost").click(async function (e) {
        option = 17;

        axios.get(`https://ipinfo.io/json`)
            .then(res => {
                $("#socialpost .country").val(res.data.country)
                $("#socialpost .city").val(res.data.city)
            })
            .catch(error => {
                console.log(error)
            })

        toggleOption()
    })

    $(".sociallike").click(async function (e) {
        option = 18;
        toggleOption()
    })

    $(".socialcomment").click(async function (e) {
        option = 19;
        toggleOption()
    })

    $(".socialreport").click(async function (e) {
        option = 20;
        toggleOption()
    })

    $(".socialwithdrawpost").click(async function (e) {
        option = 21;
        toggleOption()
    })

    $(".createtoken").click(async function (e) {
        option = 22;
        toggleOption()
    })

    $(".issuetoken").click(async function (e) {
        option = 23;
        toggleOption()
    })

    $(".transfertoken").click(async function (e) {
        option = 24;
        toggleOption()
    })

    $(".setcode").click(async function (e) {
        option = 25;
        toggleOption()
    })

    $(".updatecode").click(async function (e) {
        option = 26;
        toggleOption()
    })

    $(".socialupdateprofile").click(async function (e) {
        option = 27;
        toggleOption()
    })

    $(".socialfollow").click(async function (e) {
        option = 28;
        toggleOption()
    })

    $(".socialunfollow").click(async function (e) {
        option = 29;
        toggleOption()
    })

    $(".socialshare").click(async function (e) {
        option = 30;
        toggleOption()
    })

    $(".buynormalusername").click(async function (e) {
        option = 31;
        toggleOption()
    })

    $(".buypremiumusername").click(async function (e) {
        option = 32;
        toggleOption()
    })

    $(".selectusername").click(async function (e) {
        option = 33;
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

    $("#withdrawblockreward").hide()
    $("#socialpost").hide()
    $("#sociallike").hide()
    $("#socialcomment").hide()
    $("#socialreport").hide()
    $("#socialwithdrawpost").hide()

    $("#createtoken").hide()
    $("#issuetoken").hide()
    $("#transfertoken").hide()

    $("#setcode").hide()
    $("#updatecode").hide()

    $("#socialupdateprofile").hide()
    $("#socialfollow").hide()
    $("#socialunfollow").hide()

    $("#socialshare").hide()

    $("#buynormalusername").hide()
    $("#buypremiumusername").hide()
    $("#selectusername").hide()

    // $("#send-transaction").hide()

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

    if (option === 16) {
        $("#withdrawblockreward").show()
    }

    if (option === 17) {
        $("#socialpost").show()
    }

    if (option === 18) {
        $("#sociallike").show()
    }

    if (option === 19) {
        $("#socialcomment").show()
    }

    if (option === 20) {
        $("#socialreport").show()
    }

    if (option === 21) {
        $("#socialwithdrawpost").show()
    }

    if (option === 22) {
        $("#createtoken").show()
    }

    if (option === 23) {
        $("#issuetoken").show()
    }

    if (option === 24) {
        $("#transfertoken").show()
    }

    if (option === 25) {
        $("#setcode").show()
    }

    if (option === 26) {
        $("#updatecode").show()
    }

    if (option === 27) {
        $("#socialupdateprofile").show()
    }

    if (option === 28) {
        $("#socialfollow").show()
    }

    if (option === 29) {
        $("#socialunfollow").show()
    }

    if (option === 30) {
        $("#socialshare").show()
    }

    if (option === 31) {
        $("#buynormalusername").show()
    }

    if (option === 32) {
        $("#buypremiumusername").show()
    }

    if (option === 33) {
        $("#selectusername").show()
    }
}

function bindFunctionButton() {
    $(".function").click(async function (e) {
        e.preventDefault()
        $("#send-transaction").show()

        if (option === 0) {
            const to = $("#transfer .to").val()
            const value = $("#transfer .amount").val()
            const memo = $("#transfer .memo").val()

            $("#send-transaction .contract-name").val("token.empow")
            $("#send-transaction .function-name").val("transfer")
            $("#send-transaction .args").val(`["em", "${address}", "${to}", "${value}", "${memo}"]`)
        }

        if (option === 1) {
            const to = $("#pledgegas .to").val()
            const value = $("#pledgegas .amount").val()
            $("#send-transaction .contract-name").val("gas.empow")
            $("#send-transaction .function-name").val("pledge")
            $("#send-transaction .args").val(`["${address}", "${to}", "${value}"]`)
        }

        if (option === 2) {
            const value = $("#unpledgegas .amount").val()
            $("#send-transaction .contract-name").val("gas.empow")
            $("#send-transaction .function-name").val("unpledge")
            $("#send-transaction .args").val(`["${address}", "${address}", "${value}"]`)
        }

        if (option === 3) {
            const value = $("#sellram .amount").val()
            $("#send-transaction .contract-name").val("ram.empow")
            $("#send-transaction .function-name").val("sell")
            $("#send-transaction .args").val(`["${address}", "${address}", ${value}]`)
        }

        if (option === 4) {
            const to = $("#buyram .to").val()
            const value = $("#buyram .amount").val()
            $("#send-transaction .contract-name").val("ram.empow")
            $("#send-transaction .function-name").val("buy")
            $("#send-transaction .args").val(`["${address}", "${to}", ${value}]`)
        }

        if (option === 5) {
            const value = $("#stake .amount").val()
            $("#send-transaction .contract-name").val("stake.empow")
            $("#send-transaction .function-name").val("stake")
            $("#send-transaction .args").val(`["${address}", "${value}"]`)
        }

        if (option === 6) {
            const packageID = parseInt($("#withdrawstake .packageID").val())
            $("#send-transaction .contract-name").val("stake.empow")
            $("#send-transaction .function-name").val("withdraw")
            $("#send-transaction .args").val(`["${address}", ${packageID}]`)
        }

        if (option === 7) {
            const packageID = parseInt($("#unstake .packageID").val())
            $("#send-transaction .contract-name").val("stake.empow")
            $("#send-transaction .function-name").val("unstake")
            $("#send-transaction .args").val(`["${address}", ${packageID}]`)
        }

        if (option === 8) {
            $("#send-transaction .contract-name").val("stake.empow")
            $("#send-transaction .function-name").val("withdrawAll")
            $("#send-transaction .args").val(`["${address}"]`)
        }

        if (option === 9) {
            const networkPublicKey = $("#producerregister .networkPublicKey").val()
            const location = $("#producerregister .location").val()
            const url = $("#producerregister .url").val()
            const networkID = $("#producerregister .networkID").val()
            $("#send-transaction .contract-name").val("vote_producer.empow")
            $("#send-transaction .function-name").val("applyRegister")
            $("#send-transaction .args").val(`["${address}", "${networkPublicKey}", "${location}", "${url}", "${networkID}", true]`)
        }

        if (option === 10) {
            const networkPublicKey = $("#producerupdate .producerregister").val()
            const location = $("#producerupdate .location").val()
            const url = $("#producerupdate .url").val()
            const networkID = $("#producerupdate .networkID").val()
            $("#send-transaction .contract-name").val("vote_producer.empow")
            $("#send-transaction .function-name").val("updateProducer")
            $("#send-transaction .args").val(`["${address}", "${networkPublicKey}", "${location}", "${url}", "${networkID}"]`)
        }

        if (option === 11) {
            $("#send-transaction .contract-name").val("vote_producer.empow")
            $("#send-transaction .function-name").val("logInProducer")
            $("#send-transaction .args").val(`["${address}"]`)
        }

        if (option === 12) {
            $("#send-transaction .contract-name").val("vote_producer.empow")
            $("#send-transaction .function-name").val("logOutProducer")
            $("#send-transaction .args").val(`["${address}"]`)
        }

        if (option === 13) {
            $("#send-transaction .contract-name").val("vote_producer.empow")
            $("#send-transaction .function-name").val("candidateWithdraw")
            $("#send-transaction .args").val(`["${address}"]`)
        }

        if (option === 14) {
            const producerAddress = $("#voteforproducer .producerAddress").val()
            const voteAmount = $("#voteforproducer .voteAmount").val()
            $("#send-transaction .contract-name").val("vote_producer.empow")
            $("#send-transaction .function-name").val("vote")
            $("#send-transaction .args").val(`["${address}", "${producerAddress}", "${voteAmount}"]`)
        }

        if (option === 15) {
            const producerAddress = $("#unvoteforproducer .producerAddress").val()
            const voteAmount = $("#unvoteforproducer .voteAmount").val()
            $("#send-transaction .contract-name").val("vote_producer.empow")
            $("#send-transaction .function-name").val("unvote")
            $("#send-transaction .args").val(`["${address}", "${producerAddress}", "${voteAmount}"]`)
        }

        if (option === 16) {
            const amount = $("#withdrawblockreward .amount").val()

            $("#send-transaction .contract-name").val("bonus.empow")
            $("#send-transaction .function-name").val("exchangeEMPOW")
            $("#send-transaction .args").val(`["${address}", "${amount}"]`)
        }

        if (option === 17) {
            const title = $("#socialpost .title").val()
            const data = $("#socialpost .data").val()
            const country = $("#socialpost .country").val()
            const city = $("#socialpost .city").val()
            var type = ''
            var checkbox = document.getElementsByName("socialpost");
            for (var i = 0; i < checkbox.length; i++) {
                if (checkbox[i].checked === true) {
                    type = checkbox[i].value;
                }
            }

            var tagContent = $("#socialpost .tag").val();
            tagContent = tagContent.split(",")

            var tag = "["
            for (let j = 0; j < tagContent.length; j++) {
                tag += `"${tagContent[j].trim()}",`
            }
            tag = tag.substring(0, tag.length - 1)
            tag += "]"

            $("#send-transaction .contract-name").val("social.empow")
            $("#send-transaction .function-name").val("post")
            $("#send-transaction .args").val(`["${address}", "${title}", {type: ${type},data: ${data},country: ${country}, city: ${city}}, ${tag}]`)
        }

        if (option === 18) {
            const postID = $("#sociallike .postID").val()

            $("#send-transaction .contract-name").val("social.empow")
            $("#send-transaction .function-name").val("like")
            $("#send-transaction .args").val(`["${address}", "${postID}"]`)
        }

        if (option === 19) {
            const postID = $("#socialcomment .postID").val()
            const parentId = $("#socialcomment .parentId").val()
            const content = $("#socialcomment .content").val()
            var type = ''
            var checkbox = document.getElementsByName("socialcomment");
            for (var i = 0; i < checkbox.length; i++) {
                if (checkbox[i].checked === true) {
                    type = checkbox[i].value;
                }
            }

            $("#send-transaction .contract-name").val("social.empow")
            $("#send-transaction .function-name").val("comment")
            $("#send-transaction .args").val(`["${address}", "${postID}", ${type}, ${parentId}, ${content}]`)
        }

        if (option === 20) {
            const postID = $("#socialreport .postID").val()
            const reportTag = $("#socialreport .reportTag").val()

            $("#send-transaction .contract-name").val("social.empow")
            $("#send-transaction .function-name").val("report")
            $("#send-transaction .args").val(`["${address}", "${postID}", "${reportTag}"]`)
        }

        if (option === 21) {
            const postID = $("#socialwithdrawpost .postID").val()

            $("#send-transaction .contract-name").val("social.empow")
            $("#send-transaction .function-name").val("likeWithdraw")
            $("#send-transaction .args").val(`["${postID}"]`)
        }

        if (option === 22) {
            const symbol = $("#createtoken .symbol").val()
            const totalSupply = $("#createtoken .totalSupply").val()
            const fullname = $("#createtoken .fullname").val()

            var canTransfer = document.getElementsByName("canTransfer");
            var onlyIssuerCanTransfer = document.getElementsByName("onlyIssuerCanTransfer");

            $("#send-transaction .contract-name").val("token.empow")
            $("#send-transaction .function-name").val("create")
            $("#send-transaction .args").val(`["${symbol}", "${address}", ${totalSupply}, {fullname: ${fullname}, canTransfer: ${canTransfer[0].checked}, onlyIssuerCanTransfer: ${onlyIssuerCanTransfer[0].checked}}]`)
        }

        if (option === 23) {
            const symbol = $("#issuetoken .symbol").val()
            const issueToAddress = $("#issuetoken .issueToAddress").val()
            const amount = $("#issuetoken .amount").val()

            $("#send-transaction .contract-name").val("token.empow")
            $("#send-transaction .function-name").val("issue")
            $("#send-transaction .args").val(`["${symbol}", "${issueToAddress}", "${amount}"]`)
        }

        if (option === 24) {
            const symbol = $("#transfertoken .symbol").val()
            const to = $("#transfertoken .to").val()
            const amount = $("#transfertoken .amount").val()
            const memo = $("#transfertoken .memo").val()

            $("#send-transaction .contract-name").val("token.empow")
            $("#send-transaction .function-name").val("transfer")
            $("#send-transaction .args").val(`["${symbol}", "${address}", "${to}", "${amount}", "${memo}"]`)
        }

        if (option === 25) {
            const code = $("#setcode .code").val()

            $("#send-transaction .contract-name").val("system.empow")
            $("#send-transaction .function-name").val("setCode")
            $("#send-transaction .args").val(`["${code}"]`)
        }

        if (option === 26) {
            const code = $("#updatecode .code").val()
            const contractName = $("#updatecode .contractName").val()

            $("#send-transaction .contract-name").val("system.empow")
            $("#send-transaction .function-name").val("updateCode")
            $("#send-transaction .args").val(`["${code}", "${contractName}"]`)
        }

        if (option === 27) {
            const firstName = $("#socialupdateprofile .firstName").val()
            const lastName = $("#socialupdateprofile .lastName").val()
            const age = $("#socialupdateprofile .age").val()
            const job = $("#socialupdateprofile .job").val()
            const birthday = $("#socialupdateprofile .birthday").val()

            $("#send-transaction .contract-name").val("social.empow")
            $("#send-transaction .function-name").val("updateProfile")
            $("#send-transaction .args").val(`["${address}", {firstName: ${firstName}, lastName: ${lastName}, age: ${age}, job: ${job}, birthday: ${birthday}}]`)
        }

        if (option === 28) {
            const targetAddress = $("#socialfollow .targetAddress").val()

            $("#send-transaction .contract-name").val("social.empow")
            $("#send-transaction .function-name").val("follow")
            $("#send-transaction .args").val(`["${address}", "${targetAddress}"]`)
        }

        if (option === 29) {
            const targetAddress = $("#socialunfollow .targetAddress").val()

            $("#send-transaction .contract-name").val("social.empow")
            $("#send-transaction .function-name").val("unfollow")
            $("#send-transaction .args").val(`["${address}", "${targetAddress}"]`)
        }

        if (option === 30) {
            const postId = $("#socialunfollow .postId").val()
            const title = $("#socialunfollow .title").val()

            $("#send-transaction .contract-name").val("social.empow")
            $("#send-transaction .function-name").val("share")
            $("#send-transaction .args").val(`["${address}", "${postId}", "${title}"]`)
        }

        if (option === 31) {
            const username = $("#buynormalusername .username").val()

            $("#send-transaction .contract-name").val("auth.empow")
            $("#send-transaction .function-name").val("addNormalUsername")
            $("#send-transaction .args").val(`["${address}", "${username}"]`)
        }

        if (option === 32) {
            const username = $("#buypremiumusername .username").val()

            $("#send-transaction .contract-name").val("auth.empow")
            $("#send-transaction .function-name").val("addPremiumUsername")
            $("#send-transaction .args").val(`["${address}", "${username}"]`)
        }

        if (option === 33) {
            const username = $("#selectusername .username").val()

            $("#send-transaction .contract-name").val("auth.empow")
            $("#send-transaction .function-name").val("selectUsername")
            $("#send-transaction .args").val(`["${username}"]`)
        }
    })
}

function bindSummitButton() {
    $(".btn-send").click(async function (e) {
        e.preventDefault()
        addAlert('primary', 'Sending...')

        const contract = $(".contract-name").val()
        const functionName = $(".function-name").val()
        const args = $(".args").val()

        const tx = window.empow.callABI(contract, functionName, JSON.parse(args))

        action(tx);
    })
}

function bindSendTransactionButton() {
    const to = $("#transfer .to").val()
    const value = $("#transfer .amount").val()
    const memo = $("#transfer .memo").val()

    const tx = window.empow.callABI("token.empow", "transfer", ["em", address, to, value, memo])

    action(tx);
}

function bindPledgeGasButton() {
    const to = $("#pledgegas .to").val()
    const value = $("#pledgegas .amount").val()

    const tx = window.empow.callABI("gas.empow", "pledge", [address, to, value])

    action(tx);
}

function bindUnpledgeGasButton() {
    const value = $("#unpledgegas .amount").val()

    const tx = window.empow.callABI("gas.empow", "unpledge", [address, address, value])

    action(tx);
}

function bindSellRamButton() {
    const value = $("#sellram .amount").val()

    const tx = window.empow.callABI("ram.empow", "sell", [address, address, value])

    action(tx);
}

function bindBuyRamButton() {
    const to = $("#buyram .to").val()
    const value = $("#buyram .amount").val()

    const tx = window.empow.callABI("ram.empow", "buy", [address, to, value])

    action(tx);
}

function bindStakeButton() {
    const value = $("#stake .amount").val()

    const tx = window.empow.callABI("stake.empow", "stake", [address, value])

    action(tx);
}

function bindWithdrawStakeButton() {
    const packageID = parseInt($("#withdrawstake .packageID").val())

    const tx = window.empow.callABI("stake.empow", "withdraw", [address, packageID])

    action(tx);
}

function bindUnstakeButton() {
    const packageID = parseInt($("#unstake .packageID").val())

    const tx = window.empow.callABI("stake.empow", "unstake", [address, packageID])

    action(tx);
}

function bindWithdrawAllStakeButton() {
    const tx = window.empow.callABI("stake.empow", "withdrawAll", [address])

    action(tx);
}

function bindProducerRegisterButton() {
    const networkPublicKey = $("#producerregister .networkPublicKey").val()
    const location = $("#producerregister .location").val()
    const url = $("#producerregister .url").val()
    const networkID = $("#producerregister .networkID").val()

    const tx = window.empow.callABI("vote_producer.empow", "applyRegister", [address, networkPublicKey, location, url, networkID, true])

    action(tx);
}

function bindProducerUpdateButton() {
    const networkPublicKey = $("#producerupdate .producerregister").val()
    const location = $("#producerupdate .location").val()
    const url = $("#producerupdate .url").val()
    const networkID = $("#producerupdate .networkID").val()

    const tx = window.empow.callABI("vote_producer.empow", "updateProducer", [address, networkPublicKey, location, url, networkID])

    action(tx);
}

function bindProducerLoginButton() {
    const tx = window.empow.callABI("vote_producer.empow", "logInProducer", [address])

    action(tx);
}

function bindProducerLogoutButton() {
    const tx = window.empow.callABI("vote_producer.empow", "logOutProducer", [address])

    action(tx);
}

function bindProducerWithdrawButton() {
    const tx = window.empow.callABI("vote_producer.empow", "candidateWithdraw", [address])

    action(tx);
}

function bindVoteForProducerButton() {
    const producerAddress = $("#voteforproducer .producerAddress").val()
    const voteAmount = $("#voteforproducer .voteAmount").val()

    const tx = window.empow.callABI("vote_producer.empow", "vote", [address, producerAddress, voteAmount])

    action(tx);
}

function bindUnVoteForProducerButton(e) {
    const producerAddress = $("#unvoteforproducer .producerAddress").val()
    const voteAmount = $("#unvoteforproducer .voteAmount").val()

    const tx = window.empow.callABI("vote_producer.empow", "unvote", [address, producerAddress, voteAmount])

    action(tx);
}

function bindWithdrawBlockRewardButton() {
    const amount = $("#withdrawblockreward .amount").val()

    const tx = window.empow.callABI("bonus.empow", "exchangeEMPOW", [address, amount])

    action(tx);
}

function bindSocialPostButton() {
    const title = $("#socialpost .title").val()
    const data = $("#socialpost .data").val()
    const country = $("#socialpost .country").val()
    const city = $("#socialpost .city").val()
    var type = ''
    var checkbox = document.getElementsByName("socialpost");
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked === true) {
            type = checkbox[i].value;
        }
    }
    const content = {
        type: type,
        data: data,
        country: country,
        city: city
    }

    var tagContent = $("#socialpost .tag").val();
    tagContent = tagContent.split(",")

    var tag = []
    for (let j = 0; j < tagContent.length; j++) {
        tag.push(tagContent[j].trim())
    }
    const tx = window.empow.callABI("social.empow", "post", [address, title, content, tag])

    action(tx);
}

function bindSocialLikeButton() {
    const postID = $("#sociallike .postID").val()

    const tx = window.empow.callABI("social.empow", "like", [address, postID])

    action(tx);
}

function bindSocialCommentButton() {
    const postID = $("#socialcomment .postID").val()
    const parentId = $("#socialcomment .parentId").val()
    const content = $("#socialcomment .content").val()

    var type = ''
    var checkbox = document.getElementsByName("socialcomment");
    for (var i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked === true) {
            type = checkbox[i].value;
        }
    }

    const tx = window.empow.callABI("social.empow", "comment", [address, postID, type, parentId, content])

    action(tx);
}

function bindSocialReportButton() {
    const postID = $("#socialreport .postID").val()
    const reportTag = $("#socialreport .reportTag").val()

    const tx = window.empow.callABI("social.empow", "report", [address, postID, reportTag])

    action(tx);
}

function bindSocialWithdrawPostButton() {
    const postID = $("#socialwithdrawpost .postID").val()

    const tx = window.empow.callABI("social.empow", "likeWithdraw", [postID])

    action(tx);
}

function bindCreateTokenButton() {
    const symbol = $("#createtoken .symbol").val()
    const totalSupply = $("#createtoken .totalSupply").val()
    const fullname = $("#createtoken .fullname").val()

    var canTransfer = document.getElementsByName("canTransfer");
    var onlyIssuerCanTransfer = document.getElementsByName("onlyIssuerCanTransfer");

    var config = {
        fullname: fullname,
        canTransfer: canTransfer[0].checked,
        onlyIssuerCanTransfer: onlyIssuerCanTransfer[0].checked
    }

    const tx = window.empow.callABI("token.empow", "create", [symbol, address, parseInt(totalSupply), config])

    action(tx);
}

function bindIssueTokenButton() {
    const symbol = $("#issuetoken .symbol").val()
    const issueToAddress = $("#issuetoken .issueToAddress").val()
    const amount = $("#issuetoken .amount").val()

    const tx = window.empow.callABI("token.empow", "issue", [symbol, issueToAddress, amount])

    action(tx);
}

function bindTransferTokenButton() {
    const symbol = $("#transfertoken .symbol").val()
    const to = $("#transfertoken .to").val()
    const amount = $("#transfertoken .amount").val()
    const memo = $("#transfertoken .memo").val()

    const tx = window.empow.callABI("token.empow", "transfer", [symbol, address, to, amount, memo])

    action(tx);
}

function bindSetCodeButton() {
    const code = $("#setcode .code").val()

    const tx = window.empow.callABI("system.empow", "setCode", [code])

    action(tx);
}

function bindUpdateCodeButton() {
    const code = $("#updatecode .code").val()
    const contractName = $("#updatecode .contractName").val()

    const tx = window.empow.callABI("system.empow", "updateCode", [code, contractName])

    action(tx);
}

function bindSocialUpdateProfileButton() {
    const firstName = $("#socialupdateprofile .firstName").val()
    const lastName = $("#socialupdateprofile .lastName").val()
    const age = $("#socialupdateprofile .age").val()
    const job = $("#socialupdateprofile .job").val()
    const birthday = $("#socialupdateprofile .birthday").val()

    var info = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        job: job,
        birthday: birthday
    }

    const tx = window.empow.callABI("social.empow", "updateProfile", [address, info])

    action(tx);
}

function bindSocialFollowButton() {
    const targetAddress = $("#socialfollow .targetAddress").val()

    const tx = window.empow.callABI("social.empow", "follow", [address, targetAddress])

    action(tx);
}

function bindSocialUnfollowButton() {
    const targetAddress = $("#socialunfollow .targetAddress").val()

    const tx = window.empow.callABI("social.empow", "unfollow", [address, targetAddress])

    action(tx);
}

function bindSocialShareButton() {
    const postId = $("#socialshare .postId").val()
    const title = $("#socialshare .title").val()

    const tx = window.empow.callABI("social.empow", "share", [address, postId, title])

    action(tx);
}

function bindBuyNormalUsernameButton() {
    const username = $("#buynormalusername .username").val()

    const tx = window.empow.callABI("auth.empow", "addNormalUsername", [address, username])

    action(tx);
}

function bindBuyPremiumUsernameButton() {
    const username = $("#buypremiumusername .username").val()

    const tx = window.empow.callABI("auth.empow", "addPremiumUsername", [address, username])

    action(tx);
}

function bindSelectUsernameButton() {
    const username = $("#selectusername .username").val()

    const tx = window.empow.callABI("auth.empow", "selectUsername", [username])

    action(tx);
}

function action(tx) {
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
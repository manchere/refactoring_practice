function statement (invoice, plays) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Statement for ${invoice.customer}\n`;

    const format = new Intl.NumberFormat("en-US", {
        style : "currency", currency : "USD",
        minimumFractionDigits: 2 
    }).format;

    for (let perf of invoice.performances) {
        const play = plays[perf.playID];
        let thisAmount = 0;

        let thisAmount = amountFor(perf, play)
        //ajoute des credits de volume
        volumeCredits += Math.max(perf.audience - 30, 0);
        //ajoute un credit par groupe de cinq spectateurs assisant a une comedie
        if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

        //imprime la ligne de cette commande
        result += `${play.name}: ${format(thisAmount / 100)} (${perf.audience}), seats)\n`;
        totalAmount += thisAmount
    }
    result += `Amount owed is ${format(totatAmount / 100)}\n`;
    result += `You earned ${volumeCredits} credits\n`;
    return result;
}

function amountFor(perf, play) {
    let thisAmount = 0;
    switch (play.type) {
        case "tragedy":
            thisAmount = 40000;
            if (perf.audience > 30) {
                thisAmount += 1000 * (perf.audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if (perf.audience > 20) {
                thisAmount += 1000 + 500 * (perf.audience - 20);
            }
            break;
        default:
            throw new Error(`Unknown type : ${play.type}`);
    }
}

//When you have to add a feature to a program, but the code is not structured conveniently, first modify the program so
//that the addition of the feature is easily done, then add the feature.

statement('Play.json', 'Invoices.json');
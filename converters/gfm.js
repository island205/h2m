
var CommonMark = require('./commonmark');
var Gfm = Object.create(CommonMark);

// Fenced Code Blocks
Gfm['pre'] = function (node) {
    return `\n\`\`\`\n${node.md}\n\`\`\`\n`;
};

var isHandleTheadChar = false;
var isTh = false;
var trCount = 0;
var thCount = 0;

// Tables
Gfm['table'] = function (node) {
    var theadChar = '';
    if (!isHandleTheadChar) {
        theadChar = getTeadChar() + '\n';
    }
    if (!isTh) {
        resetTable();
        return '';
    }
    resetTable();
    return `\n${node.md}\n${theadChar}`;
};

Gfm['tr'] = function (node) {
    var trStr = '';
    trCount++;

    trStr = `\n|${node.md}`;

    if (!isHandleTheadChar && trCount == 2) {
        var theadChar = getTeadChar();
        isHandleTheadChar = true;
        return `\n${theadChar}${trStr}`;
    } else {
        return `${trStr}`;
    }
};
Gfm['th'] = function (node) {
    isTh = true;
    thCount++;
    return `${node.md}|`;
};
Gfm['td'] = function (node) {
    isTh = true;
    if (trCount == 0) {
        thCount++;
    }
    var md = replaceBr(node.md);
    return `${md}|`;
};

function resetTable() {
    isTr = false;
    isTh = false;
    thCount = 0;
    trCount = 0;
    isHandleTheadChar = false;
}

function getTeadChar() {
    var theadChar = '|';
    for (var i = thCount; i > 0; i--) {
        theadChar += '--------|';
    }
    return theadChar;
}

function replaceBr(content) {
    return content.replace(/(<br>)|(<br\/>)|(\n)|(\r\n)/g, '');
}

module.exports = Gfm;

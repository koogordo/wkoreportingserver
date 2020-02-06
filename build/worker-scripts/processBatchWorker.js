"use strict";
var workerpool = require('workerpool');
var PouchDB = require('pouchdb');
var pouchCollate = require('pouchdb-collate');
var familiesDB = new PouchDB("https://admin:wK0mI55ghBU9pp@hfatracking.net/couchdb/families");
function createInsertVisitDtoWithoutSession(visit, familiesDB) {
    var insertDto;
    var visitOs;
    if (visit.form.status && visit.form.status.length > 0) {
        var openStatus = visit.form.status.find(function (stat) { return stat.value === 'open'; });
        if (openStatus) {
            visitOs = openStatus.username;
        }
        else {
            visitOs = '';
        }
    }
    else {
        visitOs = '';
    }
    var visitDateQG = visit.form.contents.find(function (q) {
        return q.key === 'Visit Date';
    });
    var visitDate = visitDateQG ? visitDateQG.value : 'Invalid date';
    var clientKey = pouchCollate.parseIndexableString(decodeURI(visit.form.client));
    return familiesDB
        .get(clientKey[0])
        .then(function (family) {
        var clientFullName = family[clientKey[1]][clientKey[2]].clientFName +
            ' ' +
            family[clientKey[1]][clientKey[2]].clientLName;
        var legacyClientID;
        if (family.idMap && family.idMap.length > 0) {
            var idMap = family.idMap.find(function (map) {
                return map.newId === visit.form.client;
            });
            if (idMap) {
                legacyClientID = idMap.oldId;
            }
            else {
                legacyClientID = null;
            }
        }
        else {
            legacyClientID = null;
        }
        insertDto = {
            visitID: visit._id,
            visitDate: visitDate,
            visitType: visit.form.name,
            visitOs: visitOs,
            clientFullName: clientFullName,
            clientID: visit.form.client,
            familyID: clientKey[0],
            legacyClientID: legacyClientID,
        };
        return insertDto;
    })
        .catch(function (e) { return e; });
}
function generateSQLQuestionRows(visit) {
    var sqlRows = parseQuestionsDFS(visit.form, visit._id, [], []);
    return sqlRows;
    // visit should be expanded
}
function generateSQLSubQuestionRows(questions) {
    var qToSubQRels = [];
    var _loop_1 = function (i) {
        var idx = JSON.parse(questions[i].formIndexJSON);
        var questionIndexStubs = pullQuestionsFromIndex(idx);
        if (questionIndexStubs && questionIndexStubs.length > 1) {
            var parentQuestionIndexStub_1 = questionIndexStubs[questionIndexStubs.length - 2];
            var parentQuestionIndex = questions.findIndex(function (row) {
                return row.questionKey === parentQuestionIndexStub_1.key;
            });
            if (parentQuestionIndex > -1) {
                questions[i].isSubQuestionFlg = true;
                questions[parentQuestionIndex].hasSubQuestionFlg = true;
                if (questions[i].questionKey === 'Reason') {
                    questions[i].questionKey +=
                        '-' +
                            questions[parentQuestionIndex].questionKey;
                }
                qToSubQRels.push({
                    parentVisitVisitID: questions[parentQuestionIndex].visitVisitID,
                    parentQuestionKey: questions[parentQuestionIndex].questionKey,
                    subQuestionVisitVisitID: questions[i].visitVisitID,
                    subQuestionQuestionKey: questions[i].questionKey,
                });
            }
        }
    };
    for (var i = 0; i < questions.length; i++) {
        _loop_1(i);
    }
    return {
        qs: questions,
        subqs: qToSubQRels,
    };
}
function parseQuestionsDFS(formComponent, visitID, questionRows, index) {
    index = JSON.parse(JSON.stringify(index));
    if (formComponent.tabs && formComponent.tabs.length > 0) {
        for (var i = 0; i < formComponent.tabs.length; i++) {
            index.push({ tabs: i });
            parseQuestionsDFS(formComponent.tabs[i], visitID, questionRows, index);
            if (i !== formComponent.tabs.length - 1 &&
                formComponent.tabs.length > 1 &&
                formComponent.tabs.length > 0) {
                index.pop();
            }
        }
    }
    else if (formComponent.sections &&
        formComponent.sections.length > 0) {
        for (var i = 0; i < formComponent.sections.length; i++) {
            index.push({ sections: i });
            parseQuestionsDFS(formComponent.sections[i], visitID, questionRows, index);
            if (i !== formComponent.sections.length - 1 &&
                formComponent.sections.length > 1 &&
                formComponent.sections.length > 0) {
                index.pop();
            }
        }
    }
    else if ((formComponent.rows && formComponent.rows.length > 0) ||
        (formComponent.options && formComponent.options.length > 0)) {
        if (formComponent.key && formComponent.type) {
            // form component is question
            if (formComponent.type === 'question-array') {
                for (var i = 0; i < formComponent.input.length; i++) {
                    index.push({ input: i });
                    parseQuestionsDFS(formComponent.input[i], visitID, questionRows, index);
                    if (i !== formComponent.input.length - 1 &&
                        formComponent.input.length > 1 &&
                        formComponent.input.length > 0) {
                        index.pop();
                    }
                }
            }
            if (formComponent.options) {
                for (var i = 0; i < formComponent.options.length; i++) {
                    if (formComponent.options[i].rows.length > 0) {
                        // only track this option in the index if we know that it has children
                        // for the recursive call if it doesn't have children then there is no need to index it
                        index.push({ options: i });
                    }
                    parseQuestionsDFS(formComponent.options[i], visitID, questionRows, index);
                    if (i !== formComponent.length - 1 &&
                        formComponent.length > 1 &&
                        formComponent.options[i].rows.length > 0) {
                        index.pop();
                    }
                }
            }
            // is a question group
            if (formComponent.type === 'question-group') {
                for (var i = 0; i < formComponent.rows.length; i++) {
                    index.push({ rows: i });
                    parseQuestionsDFS(formComponent.rows[i], visitID, questionRows, index);
                    if (i !== formComponent.rows.length - 1 &&
                        formComponent.rows.length > 1) {
                        index.pop();
                    }
                }
            }
        }
        else {
            // the form component is a question with options
            for (var i = 0; i < formComponent.rows.length; i++) {
                index.push({ rows: i });
                parseQuestionsDFS(formComponent.rows[i], visitID, questionRows, index);
                if (i !== formComponent.rows.length - 1 &&
                    formComponent.rows.length > 1) {
                    index.pop();
                }
            }
        }
    }
    else if (formComponent.columns && formComponent.columns.length > 0) {
        for (var i = 0; i < formComponent.columns.length; i++) {
            index.push({ columns: i });
            parseQuestionsDFS(formComponent.columns[i], visitID, questionRows, index);
            if (i !== formComponent.columns.length - 1 &&
                formComponent.columns.length > 1) {
                index.pop();
            }
        }
    }
    else if (formComponent.questions &&
        formComponent.questions.length > 0) {
        for (var i = 0; i < formComponent.questions.length; i++) {
            index.push({
                questions: i,
                key: formComponent.questions[i].key,
            });
            questionRows.push(parseQuestion(visitID, index, formComponent.questions[i]));
            // if (
            //     !formComponent.rows &&
            //     formComponent.questions[i].type !== 'question-array' &&
            //     !formComponent.questions[i].options
            // ) {
            //     console.log('resetting index');
            //     FormUtil.parseQuestionsDFS(
            //         formComponent.questions[i],
            //         formIndex,
            //         []
            //     );
            // }
            parseQuestionsDFS(formComponent.questions[i], visitID, questionRows, index);
            if (i !== formComponent.questions.length - 1 &&
                formComponent.questions.length > 1) {
                index.pop();
            }
        }
    }
    return questionRows;
}
function correctScoreTooHighQuestion(doc) {
    var hitAssesmentScore;
    var depAssesmentScore;
    if (doc.form.name === 'Adult Visit') {
        for (var i = doc.form.contents.length - 1; i >= 0; i--) {
            if (doc.form.contents[i].key === 'HITS Assessment Score') {
                hitAssesmentScore = doc.form.contents[i].value;
            }
            if (doc.form.contents[i].key ===
                'Depression Assessment Score') {
                depAssesmentScore = doc.form.contents[i].value;
            }
            if (doc.form.contents[i].key === 'Score too high' ||
                doc.form.contents[i].key ===
                    'Depression Score too high' ||
                doc.form.contents[i].key === 'HITS Score too high') {
                doc.form.contents.splice(i, 1);
            }
        }
        hitAssesmentScore =
            hitAssesmentScore === '' ? 0 : hitAssesmentScore;
        depAssesmentScore =
            depAssesmentScore === '' ? 0 : depAssesmentScore;
        doc.form.contents.push({
            key: 'HITS Score too high',
            value: hitAssesmentScore >= 10 ? 'Yes' : 'No',
            notes: [],
            usePreviousValue: false,
        });
        doc.form.contents.push({
            key: 'Depression Score too high',
            value: depAssesmentScore >= 13 ? 'Yes' : 'No',
            notes: [],
            usePreviousValue: false,
        });
        return doc;
    }
    else {
        return doc;
    }
}
function parseQuestion(visitID, index, question) {
    switch (question.type) {
        case 'question-array': {
            return {
                visitVisitID: visitID,
                questionKey: question.key,
                questionAnswer: 'ISQ',
                questionType: question.type,
                formIndexJSON: JSON.stringify(index),
                questionJSON: JSON.stringify(question),
                inputJSON: JSON.stringify(question.input),
                isSubQuestionFlg: false,
                hasSubQuestionFlg: false,
            };
        }
        case 'question-group': {
            return {
                visitVisitID: visitID,
                questionKey: question.key,
                questionAnswer: 'ISQ',
                questionType: question.type,
                formIndexJSON: JSON.stringify(index),
                questionJSON: JSON.stringify(question),
                inputJSON: '',
                isSubQuestionFlg: false,
                hasSubQuestionFlg: false,
            };
        }
        case 'checkboxes': {
            var inpStr = '';
            for (var i = 0; i < question.input.length; i++) {
                if (question.input[i]) {
                    inpStr = inpStr + question.options[i].value;
                    if (i < question.input.length - 1 && i !== 0) {
                        inpStr = inpStr + '|';
                    }
                }
            }
            question.input = inpStr;
            return {
                visitVisitID: visitID,
                questionKey: question.key,
                questionAnswer: question.input,
                questionType: question.type,
                formIndexJSON: JSON.stringify(index),
                questionJSON: JSON.stringify(question),
                inputJSON: '',
                isSubQuestionFlg: false,
                hasSubQuestionFlg: false,
            };
        }
        default: {
            return {
                visitVisitID: visitID,
                questionKey: question.key,
                questionAnswer: question.input,
                questionType: question.type,
                formIndexJSON: JSON.stringify(index),
                questionJSON: JSON.stringify(question),
                inputJSON: '',
                isSubQuestionFlg: false,
                hasSubQuestionFlg: false,
            };
        }
    }
}
function indexFormPartChildren(formPartChildren, key, index) {
    for (var childIndex in formPartChildren) {
        var tempIndex = index;
        tempIndex[tempIndex.length - 1].index = childIndex;
        var temp = indexQuestionGroup(formPartChildren[childIndex], key, tempIndex);
        if (temp) {
            return temp;
        }
    }
    return null;
}
function indexQuestionGroup(fgValue, key, indexc) {
    if (indexc === void 0) { indexc = []; }
    var index = JSON.parse(JSON.stringify(indexc));
    if (fgValue.key === key) {
        return index;
    }
    if (fgValue.tabs) {
        index.push({ type: 'tab' });
        return indexFormPartChildren(fgValue.tabs, key, index);
    }
    else if (fgValue.sections) {
        index.push({ type: 'section' });
        return indexFormPartChildren(fgValue.sections, key, index);
    }
    else if (fgValue.rows && fgValue.type !== 'question-array') {
        index.push({ type: 'row' });
        return indexFormPartChildren(fgValue.rows, key, index);
    }
    else if (fgValue.input && fgValue.type === 'question-array') {
        index.push({ type: 'input' });
        return indexFormPartChildren(fgValue.input, key, index);
        // return this.indexFormPartChildren(fgValue.input[0].rows, key, index);
    }
    else if (fgValue.columns) {
        index.push({ type: 'column' });
        return indexFormPartChildren(fgValue.columns, key, index);
    }
    else if (fgValue.options) {
        index.push({ type: 'option' });
        return indexFormPartChildren(fgValue.options, key, index);
    }
    else if (fgValue.questions) {
        index.push({ type: 'question' });
        return indexFormPartChildren(fgValue.questions, key, index);
    }
    else {
        return null;
    }
}
function findFormPartByIndex(fgValue, indexc) {
    var index = JSON.parse(JSON.stringify(indexc));
    var itype = index[0].type;
    if (itype === 'tab') {
        var tabIndex = index.splice(0, 1);
        if (index.length === 0) {
            return fgValue.questions[tabIndex[0].index];
        }
        else {
            return findFormPartByIndex(fgValue.tabs[tabIndex[0].index], index);
        }
    }
    else if (itype === 'section') {
        var sectIndex = index.splice(0, 1);
        if (index.length === 0) {
            return fgValue.questions[sectIndex[0].index];
        }
        else {
            return findFormPartByIndex(fgValue.sections[sectIndex[0].index], index);
        }
    }
    else if (itype === 'input') {
        var inputIndex = index.splice(0, 1);
        var rowIndex = index.splice(0, 1);
        if (index.length === 0) {
            return fgValue.questions[inputIndex[0].index];
        }
        else {
            return findFormPartByIndex(fgValue.input[inputIndex[0].index].rows[rowIndex[0].index], index);
        }
    }
    else if (itype === 'row') {
        var rowIndex = index.splice(0, 1);
        if (index.length === 0) {
            return fgValue.questions[rowIndex[0].index];
        }
        else {
            return findFormPartByIndex(fgValue.rows[rowIndex[0].index], index);
        }
    }
    else if (itype === 'option') {
        var optIndex = index.splice(0, 1);
        if (index.length === 0) {
            return fgValue.questions[optIndex[0].index];
        }
        else {
            return findFormPartByIndex(fgValue.options[optIndex[0].index], index);
        }
    }
    else if (itype === 'column') {
        var colIndex = index.splice(0, 1);
        if (index.length === 0) {
            return fgValue.questions[colIndex[0].index];
        }
        else {
            return findFormPartByIndex(fgValue.columns[colIndex[0].index], index);
        }
    }
    else if (itype === 'question') {
        var queIndex = index.splice(0, 1);
        if (index.length === 0) {
            return fgValue.questions[queIndex[0].index];
        }
        else {
            return findFormPartByIndex(fgValue.questions[queIndex[0].index], index);
        }
    }
    else {
        return null;
    }
}
function expand(templateFormDoc, compressedForm) {
    var formCopy = JSON.parse(JSON.stringify(templateFormDoc));
    for (var prop in formCopy.form) {
        if (prop !== 'tabs') {
            formCopy.form[prop] = compressedForm.form[prop];
        }
    }
    for (var _i = 0, _a = compressedForm.form.contents; _i < _a.length; _i++) {
        var question = _a[_i];
        var index = indexQuestionGroup(formCopy.form, question.key);
        var formPart = findFormPartByIndex(formCopy.form, index);
        if (question.key === 'Income') {
            var income = question.value.split(' ');
            if (income[0] === 'yearly') {
                formPart.indices.yearly = income[1];
            }
            else if (income[0] === 'monthly') {
                formPart.indices.monthly = income[1];
            }
            else if (income[0] === 'weekly') {
                formPart.indices.weekly = income[1];
            }
        }
        else {
            formPart.input = question.value;
        }
        formPart.notes = question.notes;
        formPart.usePreviousValue = question.usePreviousValue;
    }
    formCopy._id = compressedForm._id;
    formCopy._rev = compressedForm._rev;
    return formCopy;
}
function cleanBatch(docs) {
    return docs
        .filter(function (doc) {
        return !doc._deleted;
    })
        .filter(function (doc) {
        if (!doc.form) {
            return false;
        }
        var visitDateQG = doc.form.contents.find(function (q) {
            return q.key === 'Visit Date';
        });
        if (!visitDateQG) {
            return false;
        }
        return visitDateQG.value > '2015-01-01';
    }).map(function (doc) {
        return correctScoreTooHighQuestion(doc);
    });
}
function pullQuestionsFromIndex(index) {
    return index.filter(function (idx) {
        return idx.key;
    });
}
function expandBatch(batch, templateMap) {
    return batch.map(function (doc) {
        if (doc.form && doc.form.tabs) {
            return doc;
        }
        return expand(templateMap.get(doc.form.name), doc);
    });
}
function createVisits(batch) {
    return batch.map(function (visitDoc) {
        return createInsertVisitDtoWithoutSession(visitDoc, familiesDB)
            .then(function (dtos) {
            return dtos;
        })
            .catch(function (e) {
            return e;
        });
    });
}
function qsAndSubQs(expandedBatch) {
    return expandedBatch.map(function (visitDoc) {
        return generateSQLSubQuestionRows(generateSQLQuestionRows(visitDoc));
    });
}
function processBatch(docs, templateDocs) {
    // let map = JSON.parse(templateMap);
    // console.log(map['Adult Visit'])
    var templateMap = new Map();
    templateDocs.forEach(function (doc) {
        if (!templateMap.has(doc.form.name)) {
            templateMap.set(doc.form.name, doc);
        }
    });
    var batch;
    var expandedBatch;
    batch = cleanBatch(docs);
    if (batch.length > 0) {
        expandedBatch = expandBatch(batch, templateMap);
        var visitPromises = createVisits(batch);
        var qssubqs_1 = qsAndSubQs(expandedBatch);
        return Promise.all(visitPromises).then(function (visitRows) {
            // LET main thread know we are done and return results;
            return {
                visits: visitRows,
                qssubqs: qssubqs_1
            };
        });
    }
}
workerpool.worker({
    processBatch: processBatch
});
//# sourceMappingURL=processBatchWorker.js.map
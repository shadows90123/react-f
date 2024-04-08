import _ from "lodash";

import { router_locale } from "../router_locale";

//////////////////////////////////////////////
///                 Docs
//////////////////////////////////////////////

export const getCurrentDocs = (_docs, role) => {
    let reqDocs = {};
    let hisDocs = {};
    _.keys(_docs).map((key) => {
        const d = _docs[key];
        const state = d.approved[role].state;

        if (state === "submitted") {
            reqDocs = { ...reqDocs, [key]: d };
        }
        if (state !== "submitted" && state !== "unsubmitted") {
            hisDocs = { ...hisDocs, [key]: d };
        }
    });

    return { reqDocs, hisDocs };
};

export const getSubsetArray = (arr, start, end) => {
    if (!Array.isArray(arr)) {
        throw new Error("Input is not an array.");
    }

    const _start = start - 1;
    const _end = end - 1;

    if (_start < 0 || _start > _end) {
        throw new Error("Invalid start or end indices.");
    }

    if (_end >= arr.length) {
        return arr.slice(start - 1, arr.length + 1);
    }

    // Use Array.slice to get the subset array
    return arr.slice(_start, _end + 1);
};

export const sortDocByDate = (docArr, docObj, role, type) => {
    // type = des / asc
    const sortByDate = [];

    _.map(docArr, (item, index) => {
        if (index + 1 < docArr.length) {
            const nextItem = index + 1;
            const _date1 = new Date(docObj[item].approved[role].updated_at);
            const _date2 = new Date(
                docObj[docArr[nextItem]].approved[role].updated_at
            );

            if (_.indexOf(sortByDate, item) === -1) {
                sortByDate.push(item);
            }

            if (type === "asc") {
                if (_date1 > _date2) {
                    sortByDate.unshift(docArr[nextItem]);
                } else {
                    sortByDate.push(docArr[nextItem]);
                }
            } else if (type === "des") {
                if (_date1 < _date2) {
                    sortByDate.unshift(docArr[nextItem]);
                } else {
                    sortByDate.push(docArr[nextItem]);
                }
            }
        }
    });

    if (_.isEmpty(sortByDate)) {
        return docArr;
    }

    return sortByDate;
};

//////////////////////////////////////////////
///             String Parser
//////////////////////////////////////////////

export const getPageType = (str) => {
    const regexPattern =
        /project_(?<project>\d+)\/document_(?<document>\d+(?:_\d+)?)/;
    const matches = str.match(regexPattern);
    if (matches) {
        const { project, document } = matches.groups;
        return { project, document };
    } else {
        console.log("No match found.");
        return { project: null, document: null };
    }
};

export const getMainPathText = (path, type) => {
    for (const i in router_locale[type]) {
        if (router_locale[type][i].path === `project_${path}`) {
            return router_locale[type][i].text;
        }
    }
    return "";
};

export const getSubPathText = (mainPath, subPath, type) => {
    for (const i in router_locale[type]) {
        if (router_locale[type][i].path === `project_${mainPath}`) {
            for (const j in router_locale[type][i]["children"]) {
                if (
                    router_locale[type][i]["children"][j].path ===
                    `document_${subPath}`
                ) {
                    return router_locale[type][i]["children"][j].text;
                }
            }
        }
    }
    return "";
};

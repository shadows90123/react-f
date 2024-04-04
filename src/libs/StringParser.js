import { router_locale } from "../router_locale";

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

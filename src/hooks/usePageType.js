import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const getPageType = (str) => {
    // const regexPattern =
    //     /(?:\/project_|\/exam_)(?<project>\d+)\/document_(?<document>\d+(?:_\d+)?)/;

    // const regexPattern =
    //     /^\/(?<role>\w+)\/project_(?<project>\d+)\/document_(?<document>[\d_]+)$/;

    const regexPattern =
        /^\/(?<role>\w+)\/(project_|exam_)(?<project>\d+)\/document_(?<document>[\d_]+)$/;

    const matches = str.match(regexPattern);

    if (matches) {
        const { role, project, document } = matches.groups;

        return { role, project, document };
    } else {
        return { role: null, project: null, document: null };
    }
};

export function usePageType() {
    let location = useLocation();
    const [data, setData] = useState({});

    useEffect(() => {
        setData(getPageType(location.pathname));
    }, [location.pathname]);

    return [data];
}

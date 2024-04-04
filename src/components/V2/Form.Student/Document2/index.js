import { useState, useEffect } from "react";

import CreateButton from "./CreateButton";
import EditButton from "./EditButton";
import DownloadButton from "../DownloadButton";
import ApproveButton from "../ApproveButton";
import DeleteButton from "../DeleteButton";

export default function Document2({
    option,
    user,
    docMeta,
    config,
    onReloadPage,
}) {
    const [_option, setOption] = useState({});
    const [_user, setUser] = useState({});
    const [_docMeta, setDocMeta] = useState(null);
    const [_config, setConfig] = useState({});

    useEffect(() => {
        setOption(option);
        setUser(user);
        setDocMeta(docMeta);
        setConfig(config);
    }, [option, user, docMeta, config]);

    return (
        <>
            <CreateButton
                disabled={_option?.canCreate ?? false}
                user={_user}
                config={config}
                onReloadPage={onReloadPage}
            />

            <EditButton
                disabled={_option?.canEdit ?? false}
                user={_user}
                docMeta={_docMeta}
                onReloadPage={onReloadPage}
            />

            <DeleteButton
                disabled={_option?.canDelete ?? false}
                docMeta={_docMeta}
                onReloadPage={onReloadPage}
            />

            <ApproveButton
                disabled={_option?.canApprove ?? false}
                docMeta={_docMeta}
                config={_config}
                onReloadPage={onReloadPage}
            />

            <DownloadButton
                disabled={_option?.canDownload ?? false}
                docMeta={_docMeta}
            />
        </>
    );
}

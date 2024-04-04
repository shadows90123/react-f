import createDoc1 from "./GenerateDoc1";
import createDoc2 from "./GenerateDoc2";
import createDoc3 from "./GenerateDoc3";
import createDoc4 from "./GenerateDoc4";

const getImageFromUrl = function ({ url, form, fileName }, callback) {
    var img = new Image(),
        data,
        ret = {
            data: null,
            pending: true,
        };
    img.onError = function () {
        throw new Error('Cannot load image: "' + url + '"');
    };

    img.crossOrigin = "anonymous";
    img.onload = function () {
        var canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        // canvas.width = img.width;
        // canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        // Grab the image as a jpeg encoded in base64, but only the data
        data = canvas
            .toDataURL("image/png")
            .slice("data:image/png;base64,".length);
        // Convert the data to binary form
        data = atob(data);
        document.body.removeChild(canvas);
        ret["data"] = data;
        ret["pending"] = false;
        // console.log("data", data);

        if (typeof callback === "function") {
            callback({ imgData: data, data: form, fileName });
        }
    };
    img.src = url;
    return ret;
};

export default function MainDocGen({ data, sigUrl, fileName }) {
    const docType = data.doc_type;
    const signatured = sigUrl;
    const form = data.doc_form;
    let _created;

    if (docType.startsWith("1")) {
        _created = createDoc1;
    } else if (docType.startsWith("2")) {
        _created = createDoc2;
    } else if (docType.startsWith("3")) {
        _created = createDoc3;
    } else if (docType.startsWith("4")) {
        _created = createDoc4;
    }

    getImageFromUrl(
        {
            url: signatured,
            form,
            fileName,
        },
        _created
    );
}

export function dataURIFromBytes(file) {
    const base64 = btoa(
        file.data.data.map((d) => String.fromCharCode(d)).join("")
    );
    return `data:${file.contentType};base64,${base64}`;
}

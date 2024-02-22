export function saveBinaryFile(text, filename) {
	// // Convert text data to binary
	// const binaryData = textToBinary(text);

	// // Convert binary data to ArrayBuffer
	// const buffer = new ArrayBuffer(binaryData.length);
	// const view = new Uint8Array(buffer);
	// for (let i = 0; i < binaryData.length; i++) {
	// 	view[i] = binaryData.charCodeAt(i);
	// }

	// Create a Blob from the ArrayBuffer
	const blob = new Blob([text], { type: "application/octet-stream" });

	console.log(text);

	// Create a temporary link element
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = filename;

	// Trigger the download
	link.click();

	// Clean up the temporary link
	URL.revokeObjectURL(link.href);
}

export function saveTextFile(text, filename) {
	const blob = new Blob([text], { type: "text/plain" });

	// Create a temporary link element
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = filename;

	// Trigger the download
	link.click();

	// Clean up the temporary link
	URL.revokeObjectURL(link.href);
}

function textToBinary(text) {
	let binary = "";
	for (let i = 0; i < text.length; i++) {
		const charCode = text.charCodeAt(i).toString(2);
		binary += "0".repeat(8 - charCode.length) + charCode; // Zero-pad to ensure 8-bit representation
	}
	return binary;
}

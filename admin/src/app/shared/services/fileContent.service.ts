import ApiClient from "./api-client/api-client";

const FILES_ENDPOINT = '/fileContent';

/*export const getFileContent = async (fileId: string, fileType: string): Promise<Blob | null> => {
    let mimeType;
    if (fileType === 'pdf') {
        mimeType = 'application/pdf';
    } else if (fileType === 'docx' || fileType === 'doc') {
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    }

    if (mimeType) {
        return ApiClient.get(`${FILES_ENDPOINT}/${fileId}`, { responseType: 'arraybuffer' })
            .then(response => new Blob([response.data], { type: mimeType }));
    } else {
        return null;
    }
}*/

//za txt samo
export const getFileContent = async (fileId: string ): Promise<Blob | null> => {
    return ApiClient.get(`${FILES_ENDPOINT}/${fileId}`)
        .then(response => new Blob([response.data], {}))

}



/*export const getFileContent = async (fileId: string): Promise<Uint8Array | null> => {
    try {
        const response = await ApiClient.get(`${FILES_ENDPOINT}/${fileId}`, { responseType: 'arraybuffer' });
        const arrayBuffer = response.data;
        const uint8Array = new Uint8Array(arrayBuffer);
        return uint8Array;
    } catch (error) {
        console.error('Error fetching file content:', error);
        return null;
    }
};*/

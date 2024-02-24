import config from "../../../config";

// @params { bugId: string } - bug id
// @returns { bugComments: [] } - array of comments
// @throws { error } - error message


const getBugsComments = async (params: { bugId: string}) => {
    try {
        let response = await fetch(config.backendUrl + '/api/comments/bug/' + params.bugId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("jwt")?.toString() || '')
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// @params { user: string, bug: string, text: string, parentComment?: string } - user id, bug id, comment text, parent comment id

const createComment = async (params: { user:string, bug: string, text: string, parentComment?:string }) => {
    try {
        let response = await fetch(config.backendUrl + '/api/comments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("jwt")?.toString() || '')
            },
            body: JSON.stringify({ ...params })
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        return err;
    }
}

const deleteComment = async (params: { commentId: string }) => {
    try {
        let response = await fetch(config.backendUrl + '/api/comments/' + params.commentId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("jwt")?.toString() || '')
            }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        return err;
    }
}

export { getBugsComments, createComment, deleteComment };
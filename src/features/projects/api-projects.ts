import config from "../../config";

const getProjects = async () => {
    try {
        let response = await fetch(config.backendUrl + '/api/projects/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("jwt")?.toString() || '')
            }
        });

        if (response.status === 401) {
            return { error: "Unauthorized" };
        };

        if (response.status >= 400) {
            return { error: "Something went wrong" };
        };

        return await response.json();
    } catch (err) {
        console.error(err);
        return err;
    }
}


//ProjectID refers to either the id of the project or details/projectName
const getProject = async (params: { projectId: string }) => {
    try {
        let response = await fetch(config.backendUrl + '/api/projects/' + params.projectId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("jwt")?.toString() || '')
            }
        });
        if (response.status >= 400) {
            throw new Error('Something went wrong');
        }
        return await response.json();
    } catch (err) {
        console.error(err);
        return err;
    }
}

const createProject = async (project: any) => {
    try {
        let response = await fetch(config.backendUrl + '/api/projects/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("jwt")?.toString() || '')
            },
            body: JSON.stringify(project)
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        return err;
    }
}

const updateProject = async (params: { projectId: string, project: any }) => {
    try {
        let response = await fetch(config.backendUrl + '/api/projects/' + params.projectId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem("jwt")?.toString() || '')
            },
            body: JSON.stringify(params.project)
        });
        let data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        };
        return data;
    } catch (err) {
        console.error(err);
        return err;
    }
}

const deleteProject = async (params: { projectId: string }) => {
    try {
        let response = await fetch(config.backendUrl + '/api/projects/' + params.projectId, {
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

export { getProjects, getProject, createProject, updateProject, deleteProject };
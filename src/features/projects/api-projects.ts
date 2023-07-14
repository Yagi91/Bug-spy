import config from "../../config";

const getProjects = async () => {
    try {
        let response = await fetch(config.backendUrl + '/api/projects/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
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

const getProject = async (params: { projectId: string }) => {
    try {
        let response = await fetch(process.env.REACT_APP_BackEndUrl + '/api/projects/' + params.projectId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        return err;
    }
}

const createProject = async (params: { project: any }) => {
    try {
        let response = await fetch(process.env.REACT_APP_BackEndUrl + '/api/projects/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            },
            body: params.project
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        return err;
    }
}

const updateProject = async (params: { projectId: string, project: any }) => {
    try {
        let response = await fetch(process.env.REACT_APP_BackEndUrl + '/api/projects/' + params.projectId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            },
            body: params.project
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        return err;
    }
}

const deleteProject = async (params: { projectId: string }) => {
    try {
        let response = await fetch(process.env.REACT_APP_BackEndUrl + '/api/projects/' + params.projectId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
            }
        });
        return await response.json();
    } catch (err) {
        console.error(err);
        return err;
    }
}

export { getProjects, getProject, createProject, updateProject, deleteProject };
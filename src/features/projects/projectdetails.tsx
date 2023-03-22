import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
    name: string;
    id?: string;
}

interface _ProjectDetails {
    name: string;
    description: string;
    admin: string;
    progress: string;
    created: string;
    updated: string;
}

interface _ProjectMembers {
    name: string;
    email: string;
    role: string;
}

interface _ProjectBugs {
    name: string;
    id: string;
    description: string;
    priority: string;
    status: string;
    created: string;
    updated: string;
}

const dummyDetails: _ProjectDetails = {
    name: "Project Name",
    description: "Sample Project Description",
    admin: "Mary",
    progress: "Ongoing",
    created: "2020-10-10",
    updated: "2020-10-10",
};

const dummyMembers: _ProjectMembers[] = [
    {
        name: "Mary",
        email: "mary@workexample.com",
        role: "Admin",
    },
    {
        name: "John",
        email: "john@workexample.com",
        role: "Developer",
    },
    {
        name: "Bob",
        email: "bob@workexample.com",
        role: "Developer",
    },
    {
        name: "Jane",
        email: "jane@workexample.com",
        role: "Developer",
    },];

const dummyBugs: _ProjectBugs[] = [
    {
        name: "Bug 1",
        description: "Sample Bug Description",
        priority: "High",
        status: "Ongoing",
        created: "2020-10-10",
        updated: "2020-10-10",
        id: "1",
    },
    {
        name: "Bug 2",
        id: "2",
        description: "Sample Bug Description",
        priority: "Medium",
        status: "Ongoing",
        created: "2020-10-10",
        updated: "2020-10-10",
    },
]


export default function ProjectDetails({ name, id }: Props) {
    const [projectDetails, setProjectDetails] = React.useState<_ProjectDetails>(dummyDetails);
    const [projectMembers, setProjectMembers] = React.useState<_ProjectMembers[]>(dummyMembers);
    const [projectBugs, setProjectBugs] = React.useState<_ProjectBugs[]>(dummyBugs);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [showMembers, setShowMembers] = React.useState<boolean>(false);

    const navigate = useNavigate();
    //fetch project details from database

    const getProjectDetails = async function ({ id }: { id?: string }): Promise<_ProjectDetails> {
        //fetch project details from database
        // const response = await fetch(`http://localhost:5000/api/projects/${id}`);
        // const data = await response.json();
        // return data;
        const data = new Promise<typeof dummyDetails>((resolve, reject) => { setTimeout(() => resolve(dummyDetails), 1000) });
        return data;
    }

    //fetch project members from database

    const getProjectMembers = async function ({ id }: { id?: string }): Promise<_ProjectMembers[]> {
        //fetch project members from database
        // const response = await fetch(`http://localhost:5000/api/projects/${id}`);
        // const data = await response.json();
        // return data;
        const data = new Promise<typeof dummyMembers>((resolve, reject) => { setTimeout(() => resolve(dummyMembers), 1000) });
        return data;
    }
    //fetch project bugs from database

    const getProjectBugs = async function ({ id }: { id?: string }): Promise<_ProjectBugs[]> {
        //fetch project bugs from database
        // const response = await fetch(`http://localhost:5000/api/projects/${id}`);
        // const data = await response.json();
        // return data;
        const data = new Promise<typeof dummyBugs>((resolve, reject) => { setTimeout(() => resolve(dummyBugs), 1000) });
        return data;
    }

    useEffect(() => {
        getProjectDetails({ id }).then((data) => setProjectDetails(data));
        getProjectMembers({ id }).then((data) => setProjectMembers(data));
        getProjectBugs({ id }).then((data) => setProjectBugs(data));
    })

    const deleteProject = async function (): Promise<void> {
        //delete project from database
        // const response = await fetch(`http://localhost:5000/api/projects/${id}`);
        // const data = await response.json();
        // return data;
        const data = new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                //fetch project details from database and delete
                //navigate to previous page which is projects page using react router
                console.log("Project Deleted");
                navigate(-1);
                resolve();
            }, 1000)
        });
        return data;
    }

    const deleteMember = async function (e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        //delete member from database
        // const response = await fetch(`http://localhost:5000/api/projects/${id}`);
        // const data = await response.json();
        // return data;
        e.preventDefault()
        const email = e.currentTarget.value;

        const data = new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                //fetch project members from database and delete
                setProjectMembers(projectMembers.filter((member) => member.email !== email));
                console.log("%d Member Deleted", email);
                resolve();
            }, 1000)
        });
        return data;
    }

    return (
        <div>
            <head>
                <title>Project Details</title>
                <h2>{projectDetails.name}</h2>
                <p>{projectDetails.description}</p>
                <p>{projectDetails.admin}</p>
                <p>{projectDetails.progress}</p>
                <p>{projectDetails.created}</p>
                <p>{projectDetails.updated}</p>
                <div>
                    <button>Edit</button>
                    <button onClick={deleteProject} >Delete</button>
                </div>
            </head>
            <div>
                <div>
                    <h3>Project Members</h3>
                    <p>Invite new Member</p>
                    <p onClick={() => setShowMembers(!showMembers)}>List Members</p>
                    {
                        showMembers && (
                            <ul>
                                {
                                    projectMembers.map((member): JSX.Element => {
                                        return (
                                            <li key={member.email}>
                                                <h4>{member.name}</h4>
                                                <p>{member.email}</p>
                                                <p>{member.role}</p>
                                                <button value={member.email} onClick={deleteMember} >Remove</button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        )
                    }

                </div>
                <div>
                    <h3>Project Bugs</h3>
                    <button>Report new Bug</button>
                    <ul>
                        {
                            projectBugs.map((bug): JSX.Element => {
                                return (
                                    <li key={bug.id}>
                                        <h4>{bug.name}</h4>
                                        <p>{bug.description}</p>
                                        <p>{bug.priority}</p>
                                        <p>{bug.status}</p>
                                        <p>{bug.created}</p>
                                        <p>{bug.updated}</p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
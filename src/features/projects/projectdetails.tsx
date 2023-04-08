import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectProjectSummary, selectProjectMembers, selectProjectBugs, selectLoading, selectError, getProjectDetails } from './projectDetailSlice';

interface Props {
    name: string;
    id?: string;
}


export default function ProjectDetails({ name, id }: Props) {
    const [showMembers, setShowMembers] = React.useState<boolean>(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const projectSummary = useAppSelector(selectProjectSummary);
    const projectMembers = useAppSelector(selectProjectMembers);
    const projectBugs = useAppSelector(selectProjectBugs);
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    useEffect(() => {
        dispatch(getProjectDetails(id as string));
    }, [dispatch, id])

    const deleteProject = async function (): Promise<void> {
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
        e.preventDefault()
        const email = e.currentTarget.value;

        const data = new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                //fetch project members from database and delete
                // dispatch(setProjectMembers(projectMembers.filter((member) => member.email !== email)));
                console.log("%d Member Deleted", email);
                resolve();
            }, 1000)
        });
        return data;
    }

    return (
        <div>
            <header>
                <title>Project Details</title>
                {
                    loading ? <p>Loading...</p> : (
                        error ? <p>{error}</p> : projectSummary && (
                            <>
                                <h2>{projectSummary.name}</h2>
                                <p>{projectSummary.description}</p>
                                <p>{projectSummary.admin}</p>
                                <p>{projectSummary.progress}</p>
                                <p>{projectSummary.created}</p>
                                <p>{projectSummary.updated}</p>
                            </>
                        )
                    )
                }
                <div>
                    <button>Edit</button>
                    <button onClick={deleteProject} >Delete</button>
                </div>
            </header>
            <div>
                <div>
                    <h3>Project Members</h3>
                    <button>Invite new Member</button>
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
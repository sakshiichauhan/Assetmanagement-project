import React, { useState } from 'react';

import { Button } from './ui/button';
import { Pen } from 'lucide-react';
import { useSelector } from 'react-redux';


const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth); // Ensure user object is properly fetched from Redux

    // Ensure user and user.profile are defined before rendering employee info
    const employee = user?.profile?.employee;

    return (
        <div>
          
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="font-medium text-xl">{user?.fullname}</h1>
                            <p>{user?.profile?.bio || "No bio available"}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline">
                        <Pen />
                    </Button>
                </div>
                <div className="my-5">
                    {employee && (
                        <>
                            <div className="flex items-center gap-3 my-2">
                                <span className="font-medium">Employee ID:</span>
                                <span>{employee?.employeeId}</span>
                            </div>
                            <div className="flex items-center gap-3 my-2">
                                <span className="font-medium">Department:</span>
                                <span>{employee?.department}</span>
                            </div>
                            <div className="flex items-center gap-3 my-2">
                                <span className="font-medium">Job Title:</span>
                                <span>{employee?.jobTitle}</span>
                            </div>
                            <div className="flex items-center gap-3 my-2">
                                <span className="font-medium">Email:</span>
                                <span>{employee?.email}</span>
                            </div>
                            <div className="flex items-center gap-3 my-2">
                                <span className="font-medium">Phone:</span>
                                <span>{employee?.phoneNumber}</span>
                            </div>
                        </>
                    )}
                </div>
            </div>

            
        </div>
    );
};

export default Profile;

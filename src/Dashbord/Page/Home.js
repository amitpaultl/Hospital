import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table } from 'react-bootstrap';
import { toast } from 'react-hot-toast';
import Load from './Load';
import { Link } from 'react-router-dom';

const Home = () => {
    // react query data fatch
    const url = `http://localhost:5000/getpresent`;
    const { data: patient, isLoading,refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const res = await fetch(url, {


                })
                const data = await res.json();
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    })

    // Delete
    const deleteHandel = (id) => {
        fetch(`http://localhost:5000/getpresent/${id}`, {
            method: 'DELETE',
            headers: {
            }
        })
            .then(res => res.json())
            .then(data => {
                toast.success(data.message)

                refetch()
            })
    }

    // Edit
    const updateHandel = (id) =>{
        
    }

    // loading
    if(isLoading){
        return <Load></Load>
    }
    console.log(patient);

    return (
        <div className='container'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact Details</th>
                        <th>Address</th>
                        <th>Pin Code</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        patient?.data?.map(pat => <tr key={pat._id}>
                            <td>{pat?.name}</td>
                            <td>{pat?.contact}</td>
                            <td>{pat?.address}</td>
                            <td>{pat?.pincode}</td>
                            <td><Link to={`/update/${pat?._id}`}  className='Update'>Update</Link></td>
                            <td><button onClick={() => deleteHandel(pat?._id)} className='Delete'>Delete</button></td>
                        </tr>)
                    }


                </tbody>
            </Table>
        </div>
    );
};

export default Home;
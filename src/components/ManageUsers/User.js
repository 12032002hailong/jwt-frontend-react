import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { deleteUser, fetchAllUser } from '../../services/apiService';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete';
const User = (props) => {

    const [listUser, setlistUser] = useState([]);
    const [currentPage, setcurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(2);
    const [totalPages, settotalPages] = useState(0);
    const [dataModal, setDataModal] = useState({});

    const [show, setShow] = useState(false);


    const handleShow = () => setShow(true);


    useEffect(() => {
        fetchUser();
    }, [currentPage]);

    const fetchUser = async () => {
        let res = await fetchAllUser(currentPage, currentLimit);
        if (res && res.data && res.data.EC === 0) {
            settotalPages(res.data.DT.totalPages);
            setlistUser(res.data.DT.users);
        }
    }

    const handleClose = () => {
        setDataModal({});
        setShow(false)
    };

    const handlePageClick = async (event) => {
        setcurrentPage(+event.selected + 1);

    }

    const handleDeleteUser = async (user) => {
        setShow(true);
        setDataModal(user)

    }

    const confirmDeleteUser = async () => {
        let res = await deleteUser(dataModal);
        if (res && res.EC === 0) {
            toast.success(res.data.EM);
            await fetchUser();
            setShow(false);
        } else {
            toast.error(res.data.EM)
        }
    }

    return (
        <>
            <div className='container'>
                <div className='manage-users-container'>
                    <div className='user-header'>
                        <div className='title'>
                            <h3>Table Users</h3>
                        </div>
                        <div className='actions'>
                            <button className='btn btn-success'>Refesh</button>
                            <button className='btn btn-primary'>Add new user</button>
                        </div>
                    </div>
                    <div className='user-body'>
                        <table className='table table-bordered table-hover'>
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Enail</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listUser && listUser.length > 0 ?
                                    <>
                                        {listUser.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <button className='btn btn-warning mx-3'>Edit</button>
                                                        <button className='btn btn-danger'
                                                            onClick={() => handleDeleteUser(item)}
                                                        >Delete</button>
                                                    </td>

                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr>
                                            <td>Not found User</td>
                                        </tr>
                                    </>
                                }
                            </tbody>
                        </table>
                    </div>
                    {totalPages > 0 &&
                        <div className='user-footer'>
                            <ReactPaginate
                                previousLabel="Previous"
                                nextLabel="Next"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                pageCount={totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName="pagination"
                                activeClassName="active"
                            // forcePage={pageOffset}
                            />
                        </div>
                    }
                </div>
            </div>

            <ModalDelete
                show={show}
                setShow={setShow}
                handleClose={handleClose}
                handleShow={handleShow}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
        </>
    )
}

export default User

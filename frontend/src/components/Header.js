import React from 'react';
import { Link } from 'react-router-dom'

function Header({ is_authenticated, logout, user }) {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="favicon.ico" alt="" width="30" height="24"
                        className="d-inline-block align-text-top" />
                    TODO
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" to="categories">Категории</Link>
                        </li>

                        {is_authenticated()
                            ?
                            <>
                                <li className="nav-item">
                                    <span className="nav-link disabled"> {user.username} </span>
                                </li>
                                <li className="nav-item">
                                    <button className='btn' onClick={() => logout()}>Выйти</button>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" to='/login'>Войти</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" to='/registration'>Зарегистрироваться</Link>
                                </li>
                            </>}
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Header